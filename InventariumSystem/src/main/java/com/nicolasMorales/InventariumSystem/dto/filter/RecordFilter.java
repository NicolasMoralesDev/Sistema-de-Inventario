package com.nicolasMorales.InventariumSystem.dto.filter;


import java.time.LocalDateTime;

/**
 * @author Nicolas Morales.
 * DTO para filtrar ingresos.
 */
public record RecordFilter(LocalDateTime fecha, String usuario, String proveedor) {
}
