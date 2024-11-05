package com.nicolasMorales.InventariumSystem.repository;

import com.nicolasMorales.InventariumSystem.dto.filter.IncomeFilter;
import com.nicolasMorales.InventariumSystem.dto.filter.ProductFilter;
import com.nicolasMorales.InventariumSystem.entity.Income;
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
public class IngresosRepositoryCriteria {

    private final EntityManager em;

    public IngresosRepositoryCriteria(EntityManager em) {
        this.em = em;
    }

    public List<Income> findIngresosByFilter(IncomeFilter filtro) {

        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<Income> cr = cb.createQuery(Income.class);

        try {

            Root<Income> root = cr.from(Income.class);
            List<Predicate> predicates = new ArrayList<>();

            predicates.add(cb.equal(root.get("borrado"), false));
            cr.select(root).where(predicates.toArray(new Predicate[0]));

            return em.createQuery(cr).getResultList();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return em.createQuery(cr).getResultList();
    }
}
