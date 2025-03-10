package com.nicolasMorales.InventariumSystem.utils;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.nicolasMorales.InventariumSystem.entity.UserSec;
import com.nicolasMorales.InventariumSystem.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;
import java.util.Date;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * @author Nicolas Morales
 * Clase con utlidades para JWT.
 */
@Component
public class JwtUtils {

    @Autowired
    private IUserRepository userRepository;

    private String privateKey = "PRIVATE_KEY\t277effd5d9ce22ef4040b687e374929a8cdf57ea136f9c0a067f4060992a60ff";

    private String userGenerator = "ADMIN_INVENTARIO";

    public String createToken(Authentication authentication) {

        Algorithm algorithm = Algorithm.HMAC256(privateKey);
        String username = authentication.getPrincipal().toString();
        Optional <UserSec> user = userRepository.findUserEntityByUsername(username);

        String authorities = authentication.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        String jwtToken = JWT.create()
                .withIssuer(this.userGenerator)
                .withSubject(username)
                .withClaim("nombreCompleto", user.get().getNombreCompleto())
                .withClaim("authorities", authorities)
                .withIssuedAt(new Date())
                .withExpiresAt(new Date(System.currentTimeMillis() + 1800000))
                .withJWTId(UUID.randomUUID().toString())
                .withNotBefore(new Date(System.currentTimeMillis()))
                .sign(algorithm);

        return jwtToken;

    }

    public DecodedJWT validateToken (String token ) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(privateKey);
            JWTVerifier verifer = JWT.require(algorithm)
                    .withIssuer(this.userGenerator)
                    .build();

            DecodedJWT decodedJWT = verifer.verify(token);
            return  decodedJWT;

        } catch (JWTVerificationException e) {
            throw new JWTVerificationException("Token invalido, No autorizado");
        }
    }

    public String extractUsername (DecodedJWT decodedJWT) {
        return decodedJWT.getSubject().toString();
    }

    public String getSpecificClain (DecodedJWT decodedJWT, String clainName) {
        return decodedJWT.getClaim(clainName).toString();
    }

    public Map<String, Claim> returnAllClains (DecodedJWT decodedJWT) {
        return decodedJWT.getClaims();
    }

}