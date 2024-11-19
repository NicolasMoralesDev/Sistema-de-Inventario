package com.nicolasMorales.InventariumSystem.dto;

/**
 * @author Nicolas Morales.
 * DTO para recibir la informacion a enviar por correo.
 */
public record EmailBodyDTO(String content, String mail, String subject) {
}
