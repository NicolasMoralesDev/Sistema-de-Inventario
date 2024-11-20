package com.nicolasMorales.InventariumSystem.services;

import com.nicolasMorales.InventariumSystem.dto.EmailBodyDTO;
import jakarta.mail.MessagingException;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

public interface IEmailService {

    boolean sendEmail(EmailBodyDTO emailBody) throws MessagingException;

    boolean sendEmail(EmailBodyDTO emailBody, ByteArrayOutputStream baos) throws MessagingException, IOException;

}
