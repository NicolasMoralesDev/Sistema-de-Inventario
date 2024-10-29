package com.nicolasMorales.InventariumSystem.repository;

import com.nicolasMorales.InventariumSystem.dto.filter.ProductFilter;
import com.nicolasMorales.InventariumSystem.entity.Product;
import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class ProductRepositoryCriteria {

    private final EntityManager em;

    public ProductRepositoryCriteria(EntityManager em) {
        this.em = em;
    }

    public List<Product> findProductByNombre(ProductFilter filtro) {

        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<Product> cr = cb.createQuery(Product.class);

        try {

           Root<Product> root = cr.from(Product.class);
           List<Predicate> predicates = new ArrayList<>();

            if (filtro.nombre() != null && !filtro.nombre().isEmpty()) {
               predicates.add(cb.like(root.get("nombre"), "%" + filtro.nombre() + "%"));
            }
            if (filtro.marca() != null && !filtro.marca().isEmpty()) {
                predicates.add(cb.like(root.get("marca"), "%" + filtro.marca() + "%"));
            }
            if (filtro.codigo() != null) {
                predicates.add(cb.equal(root.get("codigo"),  filtro.codigo()));
            }
           predicates.add(cb.equal(root.get("borrado"), false));
           cr.select(root).where(predicates.toArray(new Predicate[0]));

           return em.createQuery(cr).getResultList();

       } catch (Exception e) {
            e.printStackTrace();
        }
        return  em.createQuery(cr).getResultList();
    }
}
