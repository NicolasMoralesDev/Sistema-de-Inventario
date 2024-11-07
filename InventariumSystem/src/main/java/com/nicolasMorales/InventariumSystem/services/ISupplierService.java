package com.nicolasMorales.InventariumSystem.services;

import com.nicolasMorales.InventariumSystem.entity.Supplier;
import com.nicolasMorales.InventariumSystem.exceptions.BussinesException;

import java.util.List;
import java.util.UUID;
import java.util.concurrent.ExecutionException;

/**
 *  @author Nicolas Morales.
 *  Interfaz para los servicios de Proveedores.
 */
public interface ISupplierService {

    /**
     * Registra un nuevo proveedor.
     *
     * @param nuevo {@link Supplier}
     * @throws BussinesException Error
     */
    void createSupplier(Supplier nuevo) throws BussinesException, ExecutionException;

    /**
     * Borra un proveedor por su id.
     *
     * @param id {@link UUID}
     * @throws BussinesException Error
     */
    String deleteSupplier(UUID id);

    /**
     * Edita un proveedor.
     *
     * @param edit {@link Supplier}
     * @throws RuntimeException Error
     * @throws BussinesException Error
     */
    void modifySupplier(Supplier edit) throws BussinesException, RuntimeException;

    /**
     * Obtiene todos los proveedores.
     *
     * @throws BussinesException Error
     */
    List<Supplier> getSuppliers() throws BussinesException, RuntimeException;

    /**
     * Obtiene un proveedor por su id.
     *
     * @param id {@link UUID}
     * @throws BussinesException Error
     */
    Supplier getSupplierById(UUID id) throws BussinesException;

    /**
     * Borra masivamente proveedores.
     *
     * @param ids {@link List <UUID>}
     * @throws BussinesException Error
     */
    void deleteSuppliers(List<UUID> ids) throws BussinesException;
}
