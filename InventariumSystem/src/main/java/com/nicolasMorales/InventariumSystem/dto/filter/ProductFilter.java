package com.nicolasMorales.InventariumSystem.dto.filter;


/**
 * @author Nicolas Morales.
 * DTO para filtrar productos.
 */
public record ProductFilter(String marca, String nombre, Double precio, String categoria,
                            Double codigo) {
}
