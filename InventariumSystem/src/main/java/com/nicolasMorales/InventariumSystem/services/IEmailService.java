package com.nicolasMorales.InventariumSystem.services;

import com.nicolasMorales.InventariumSystem.dto.EmailBodyDTO;

public interface IEmailService {

    boolean sendEmail (EmailBodyDTO emailBody);
}
