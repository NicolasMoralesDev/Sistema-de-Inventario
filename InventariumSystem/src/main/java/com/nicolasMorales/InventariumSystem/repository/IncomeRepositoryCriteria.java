package com.nicolasMorales.InventariumSystem.repository;

import com.nicolasMorales.InventariumSystem.dto.filter.RecordFilter;
import com.nicolasMorales.InventariumSystem.entity.Income;
import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.*;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Component
public class IncomeRepositoryCriteria {

    private final EntityManager em;

    public IncomeRepositoryCriteria(EntityManager em) {
        this.em = em;
    }

    public List<Income> findIngresosByFilter(RecordFilter filtro) {

        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<Income> cr = cb.createQuery(Income.class);

        try {

            Root<Income> root = cr.from(Income.class);
            List<Predicate> predicates = new ArrayList<>();
              root.fetch("supplier", JoinType.LEFT);
              root.fetch("userRegister", JoinType.LEFT);

            if (filtro.proveedor() != null) {
                predicates.add(cb.equal(root.get("supplier").get("nombre"), filtro.proveedor()));
            }
            if (filtro.usuario() != null) {
                predicates.add(cb.equal(root.get("userRegister").get("nombreCompleto"), filtro.usuario()));
            }
            if (filtro.fecha() != null) {
                LocalDate fechaFiltro = filtro.fecha().toLocalDate(); // Convertimos a LocalDate para eliminar la hora
                predicates.add(cb.equal(cb.function("DATE", LocalDate.class, root.get("dateIncome")), fechaFiltro));
            }
            cr.select(root).where(predicates.toArray(new Predicate[0]));

            return em.createQuery(cr).getResultList();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return em.createQuery(cr).getResultList();
    }
}
