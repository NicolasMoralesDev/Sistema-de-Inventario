package com.nicolasMorales.InventariumSystem.services.impl;

import com.nicolasMorales.InventariumSystem.controllers.categorias.ControllerCategory;
import com.nicolasMorales.InventariumSystem.dto.ProductDTO;
import com.nicolasMorales.InventariumSystem.dto.filter.ProductFilter;
import com.nicolasMorales.InventariumSystem.entity.Product;
import com.nicolasMorales.InventariumSystem.exceptions.BussinesException;
import com.nicolasMorales.InventariumSystem.mapper.ProductsMapper;
import com.nicolasMorales.InventariumSystem.repository.IProductRepository;
import com.nicolasMorales.InventariumSystem.repository.impl.ProductRepositoryImpl;
import com.nicolasMorales.InventariumSystem.services.IProductService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

/**
 *  @author Nicolas Morales.
 *  Implementacion de IProductoService.
 *  Para la servicios de Productos.
 */
@Service
public class ProductService implements IProductService {

    private static Logger logger = LoggerFactory.getLogger(ControllerCategory.class);

    @Autowired
    private IProductRepository productRepo;

    @Autowired
    private ProductsMapper productMapper;

    @Autowired
    private PdfService pdfService;

    @Autowired
    private ProductRepositoryImpl productRepository;

    private final Path fileStorageLocation = Paths.get("pdf-storage").toAbsolutePath().normalize();

    /**
     * Metodo para registrar un Producto.
     * @param nuevo Recibe el nuevo producto a registrar.
     */
    @Transactional
    @Override
    public void createProduct(Product nuevo) throws BussinesException {
        try {
            logger.info("Registrando nuevo producto...");
            Product producto = productRepo.findByCodigo(nuevo.getCodigo());
            if ( producto == null) {
                productRepo.save(nuevo);
            } else if (producto.getCodigo() == nuevo.getCodigo()){
                producto.setCant(nuevo.getCant()+producto.getCant());
                productRepo.save(producto);
            }
        } catch ( Exception  e) {
            throw new BussinesException("Error, No se pudo cargar el producto: " + nuevo.getNombre());
        }
    }

    /**
     * Metodo para registrar un Producto y descontarlo durante los egresos.
     * @param nuevo Recibe el nuevo producto a registrar.
     */
    @Transactional
    @Override
    public void createProductExpense(Product nuevo) throws BussinesException {
        try {
            logger.info("Registrando nuevo producto en ingreso...");
            Product producto = productRepo.findByCodigo(nuevo.getCodigo());
            if ( producto == null) {
                throw new BussinesException("Error, No se pudo cargar el producto: " + nuevo.getNombre());
            } else if (producto.getCodigo() == nuevo.getCodigo()){
                producto.setCant(producto.getCant()-nuevo.getCant());
                productRepo.save(producto);
            }
        } catch ( Exception  e) {
            throw new BussinesException("Error, No se pudo cargar el producto: " + nuevo.getNombre());
        }
    }

    /**
     * Metodo para registrar masivaente productos.
     * @param products Recibe los nuevos productos a registrar.
     */
    @Override
    @Transactional
    public List<Long> createBulkProducts(List<Product> products) throws BussinesException {

        List<Long> listProducts = new ArrayList<>();
        for (Product product : products ){
            try {
                logger.info("Registrando productos...");
                this.createProduct(product);
                listProducts.add(product.getCodigo());
            } catch (BussinesException e){
                throw new BussinesException("Error, No se pudo cargar el producto: " + product.getNombre());
            }
        }
        return listProducts;
    }

    /**
     * Metodo para registrar masivaente productos con egresos.
     * @param products Recibe los nuevos productos a registrar.
     */
    @Override
    @Transactional
    public List<Long> createExpenseProducts(List<Product> products) throws BussinesException {

        List<Long> listProducts = new ArrayList<>();
        for (Product product : products ){
            try {
                logger.info("Descontando stock de productos...");
                this.createProductExpense(product);
                listProducts.add(product.getCodigo());
            } catch (BussinesException e){
                throw new BussinesException("Error, No se pudo cargar el producto: " + product.getNombre());
            }
        }
        return listProducts;
    }

    /**
     * Metodo para eliminar un producto.
     * @param id Recibe el id del producto.
     */
    @Override
    @Transactional
    public void deleteProduct(UUID id) throws BussinesException{
        try {
            logger.info("Borrando producto con id: {}", id);
            productRepo.deleteById(id);
            Product producto = this.getProductsById(id);

            if (producto == null) {
                throw new BussinesException("Error");
            }
            producto.setBorrado(true);
        } catch (Exception e){
            throw new BussinesException(e.getMessage());
        }
    }

    /**
     * Metodo para eliminar masivaente productos.
     * @param ids Recibe una lista con los ids de los productos.
     */
    @Override
    @Transactional
    @Modifying
    public void deleteProducts(List <UUID> ids) throws BussinesException{
        Product producto;
        try {
            logger.info("Borrando productos...");
            for (UUID id : ids){
                producto = productRepo.findById(id).orElse(null);
                if (producto == null) {
                    throw new BussinesException("El ID del producto es invaido!");
                }
                producto.setBorrado(true);
            }
        } catch (BussinesException e){
            throw new BussinesException("Error "+ e);
        }
    }

    /**
     * Metodo para obtener los productos paginados.
     */
    @Override
    public List <Product> getProducts(ProductFilter filtro) throws BussinesException{
        try {
            logger.info("Obteniendo productos...");
            List <Product> listProducts = productRepository.findProductByNombre(filtro);
            if (listProducts.isEmpty()) {
                throw new BussinesException("No se encontraron Productos cargados!!");
            }
            return listProducts;
        } catch (BussinesException e) {
            throw new BussinesException(e.getMessage());
        }
    }

    /**
     * Metodo para obtener un producto por id.
     * @param id Recibe el id del producto.
     */
    @Override
    public Product getProductsById(UUID id) throws BussinesException {
        try {
            logger.info("Obteniendo producto con id: {}", id);
            Product producto = productRepo.findById(id).orElse(null);
            if (producto == null) {
                throw new BussinesException("El ID: "+ id + "es invalido.");
            }
            return producto;
        } catch (BussinesException e) {
            throw new BussinesException(e.getMessage());
        }
    }

    /**
     * Metodo para editar un producto.
     * @param edit Recibe el producto a editar.
     */
    @Override
    public void modifyProduct(Product edit) throws BussinesException {
        try {
            logger.info("Editando producto...");
            productRepo.save(edit);
        } catch (Exception e){
            throw new BussinesException("Se ha producido un error");
        }
    }

    /**
     * Metodo para obtener un producto por su codigo de barras.
     * @param code Recibe el codigo de barras del producto.
     */
    @Override
    public ProductDTO getProductsByCode(long code) throws BussinesException {
        try {
            logger.info("Obteniendo producto por su codigo de barras: {}", code);
            Product product = productRepo.findByCodigo(code);
            if (product != null) {
                return productMapper.productaProductDTO(product);
            } else {
                throw new BussinesException("No se encontro ningun producto asociado al codigo: " + code);
            }
        } catch (BussinesException e) {
            throw new BussinesException("Error " + e.getMessage());
        }
    }

    /**
     * Metodo para obtener un producto por su codigo de barras para reornar registros.
     * @param code Recibe el codigo de barras del producto.
     */
    public ProductDTO getProductByCodeReg(long code) throws BussinesException {
        try {
            Product product = productRepo.getProductoByCodeReg(code);
            if (product != null) {
                return productMapper.productaProductDTO(product);
            } else {
                throw new BussinesException("No se encontro ningun producto asociado al codigo: " + code);
            }
        } catch (BussinesException e) {
            throw new BussinesException("Error " + e.getMessage());
        }
    }

    @Override
    public Map<String, String> downloadPDF(List<UUID> productosIds) throws BussinesException {
        try {
            List<ProductDTO> productList = new ArrayList<>();
            Map<String, String> response = new HashMap<>();

            for (UUID productID : productosIds) {
                productList.add(productMapper.productaProductDTO(this.getProductsById(productID)));
            }

            ByteArrayOutputStream pdfContent = pdfService.generatePdfProductos(productList);
            String fileName = "informacion_productos-" + UUID.randomUUID() + ".pdf";
            Path targetLocation = this.fileStorageLocation.resolve(fileName);
            Files.write(targetLocation, pdfContent.toByteArray());
            String fileDownloadUri = "http://localhost:8080" + "/api/v1/pdf/download/"+ fileName;

            response.put("url", fileDownloadUri);

            return response;
        } catch (BussinesException e) {
            throw new BussinesException(e.getMessage());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
