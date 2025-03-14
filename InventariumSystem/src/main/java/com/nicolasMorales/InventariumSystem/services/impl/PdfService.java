package com.nicolasMorales.InventariumSystem.services.impl;

import com.itextpdf.io.font.FontConstants;
import com.itextpdf.kernel.color.Color;
import com.itextpdf.kernel.font.PdfFont;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.itextpdf.kernel.geom.PageSize;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.property.TextAlignment;
import com.itextpdf.layout.property.UnitValue;
import com.nicolasMorales.InventariumSystem.controllers.categorias.ControllerCategory;
import com.nicolasMorales.InventariumSystem.dto.ProductDTO;
import com.nicolasMorales.InventariumSystem.services.IPdfService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

@Service
public class PdfService implements IPdfService {

    private static Logger logger = LoggerFactory.getLogger(ControllerCategory.class);

    /**
     * @see IPdfService#generatePdfProductos(List)
     */
    @Override
    public ByteArrayOutputStream generatePdfProductos(List<ProductDTO> productos) throws IOException  {

        logger.info("Generando reporte PDF de mercaderia...");

        // Creación del documento PDF
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        PdfWriter pdf = new PdfWriter(byteArrayOutputStream);
        PdfDocument pdfDocument = new PdfDocument(pdf);

        Document document = new Document(pdfDocument, PageSize.A4.rotate());

        document.setMargins(20, 20, 20, 20);
        Table table = new Table(new float[]{4, 1, 3, 4, 3, 3, 3});
        table.setWidth(UnitValue.createPercentValue(100));
        PdfFont font = PdfFontFactory.createFont(FontConstants.HELVETICA_BOLD);
        Paragraph titulo = new Paragraph("Reporte de Mercaderia").setTextAlignment(TextAlignment.CENTER).setFont(font);

        table.addCell(new Paragraph("Codigo").setTextAlignment(TextAlignment.CENTER).setBackgroundColor(Color.LIGHT_GRAY));
        table.addCell(new Paragraph("Nombre").setTextAlignment(TextAlignment.CENTER).setBackgroundColor(Color.LIGHT_GRAY));
        table.addCell(new Paragraph("Descripcion").setTextAlignment(TextAlignment.CENTER).setBackgroundColor(Color.LIGHT_GRAY));
        table.addCell(new Paragraph("Categoria").setTextAlignment(TextAlignment.CENTER).setBackgroundColor(Color.LIGHT_GRAY));
        table.addCell(new Paragraph("Marca").setTextAlignment(TextAlignment.CENTER).setBackgroundColor(Color.LIGHT_GRAY));
        table.addCell(new Paragraph("Precio").setTextAlignment(TextAlignment.CENTER).setBackgroundColor(Color.LIGHT_GRAY));
        table.addCell(new Paragraph("Stock").setTextAlignment(TextAlignment.CENTER).setBackgroundColor(Color.LIGHT_GRAY));

        // Extrae la informaciondel Array para ser agregada a la tabla.
        for (ProductDTO producto : productos) {
            table.addCell(new Paragraph(String.valueOf(producto.getCodigo())).setTextAlignment(TextAlignment.CENTER));
            table.addCell(String.valueOf(producto.getNombre())); // Nombre
            table.addCell(String.valueOf(producto.getDescripcion())); // Descripcion
            table.addCell(String.valueOf(producto.getCategoria().getTitulo())); // Categoria
            table.addCell(String.valueOf(producto.getMarca())); // Marca
            table.addCell( new Paragraph(String.valueOf(" $ "+producto.getPrecio())).setTextAlignment(TextAlignment.CENTER)); // Precio
            table.addCell( new Paragraph(String.valueOf(producto.getCant())).setTextAlignment(TextAlignment.CENTER)); // Stock
        }
        document.add(titulo);
        document.add(table);
        document.close();
        return byteArrayOutputStream;
    }
}