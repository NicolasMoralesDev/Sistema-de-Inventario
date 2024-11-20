package com.nicolasMorales.InventariumSystem.services.impl;

import com.nicolasMorales.InventariumSystem.dto.EmailBodyDTO;
import com.nicolasMorales.InventariumSystem.services.IEmailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class EmailService implements IEmailService {

    private static final Logger LOGGER = LoggerFactory.getLogger(EmailService.class);
    private final Path folderPath = Paths.get("pdf-storage").toAbsolutePath().normalize();

    @Autowired
    private JavaMailSender sender;

    @Override
    public boolean sendEmail(EmailBodyDTO emailBody) throws MessagingException {
        LOGGER.info("EmailBody: {}", emailBody.toString());
        MimeMessage message = sender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        return sendEmailTool(helper, message, emailBody);
    }

    @Override
    public boolean sendEmail(EmailBodyDTO emailBody, ByteArrayOutputStream baos) throws MessagingException, IOException {

        File folder = new File(String.valueOf(folderPath));
        if (!folder.exists()) {
            folder.mkdirs();
        }

        // Construir la ruta completa del archivo
        File file = new File(folder, "reporte.pdf");
        FileOutputStream fos = new FileOutputStream(file);
        baos.writeTo(fos);
        fos.close();

        MimeMessage message = sender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.addAttachment(file.getName(),
                file);

        boolean isEnviado =  sendEmailTool(helper, message, emailBody);
        if (isEnviado) {
            file.delete();
        }
        return isEnviado;
    }

    private boolean sendEmailTool(MimeMessageHelper helper, MimeMessage message, EmailBodyDTO emailBody) {
        boolean send = false;
        try {
            helper.setTo(emailBody.mail());
            helper.setText(emailBody.content(), true);
            helper.setSubject(emailBody.subject());
            sender.send(message);
            send = true;
            LOGGER.info("Mail enviado!");
        } catch (MessagingException e) {
            LOGGER.error("Hubo un error al enviar el mail: {}", e);
        }
        return send;
    }
}