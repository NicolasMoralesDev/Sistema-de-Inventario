package com.nicolasMorales.InventariumSystem.dto.filter;


import java.util.Date;

/**
 * @author Nicolas Morales.
 * DTO para filtrar ingresos.
 */
public record IncomeFilter(Date fecha, String usuario, String provedor) {
}
