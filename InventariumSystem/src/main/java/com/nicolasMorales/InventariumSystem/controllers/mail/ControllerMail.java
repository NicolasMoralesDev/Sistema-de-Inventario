package com.nicolasMorales.InventariumSystem.controllers.mail;

import com.nicolasMorales.InventariumSystem.dto.EmailBodyDTO;
import com.nicolasMorales.InventariumSystem.dto.IncomeDTO;
import com.nicolasMorales.InventariumSystem.services.IEmailService;
import com.nicolasMorales.InventariumSystem.services.IIncomeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;

/**
 * @author Nicolas Morales.
 * Controladores para envio de correos.
 */
@RestController
@RequestMapping("/api/v1/mail")
@PreAuthorize("permitAll()")
@CrossOrigin(origins = "*")
public class ControllerMail {

    private static Logger logger = LoggerFactory.getLogger(ControllerMail.class);

    @Autowired
    private IEmailService emailService;

    /**
     * Controllador para enviar correos.
     * @param mail Recibe los datos a enviar.
     * @return ResponseEntity Devuelve esta entidad con el codigo de estado y un mensaje.
     */
    @PostMapping(value = "/send")
    public ResponseEntity<?> sendMail(@RequestBody EmailBodyDTO mail){
        HashMap<String, String> response = new HashMap<>();

        try {
            emailService.sendEmail(mail);
            response.put("msg", "Correo enviado correctamente!");
            return ResponseEntity.ok().body(response);

        } catch (Exception e){
            logger.error(e.getMessage());
            response.put("error", e.getMessage());
            return  ResponseEntity.badRequest().body("Error "+ response);
        }
    }
}
