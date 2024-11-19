package com.nicolasMorales.InventariumSystem.repository;

import com.nicolasMorales.InventariumSystem.dto.filter.RecordFilter;
import com.nicolasMorales.InventariumSystem.entity.Expense;
import com.nicolasMorales.InventariumSystem.entity.Income;
import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.*;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Component
public class ExpenseRepositoryCriteria {

    private final EntityManager em;

    public ExpenseRepositoryCriteria(EntityManager em) {
        this.em = em;
    }

    public List<Expense> findEgresosByFilter(RecordFilter filtro) {

        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<Expense> cr = cb.createQuery(Expense.class);

        try {

            Root<Expense> root = cr.from(Expense.class);
            List<Predicate> predicates = new ArrayList<>();
            root.fetch("userRegister", JoinType.LEFT);

            if (filtro.usuario() != null) {
                predicates.add(cb.equal(root.get("userRegister").get("nombreCompleto"), filtro.usuario()));
            }
            if (filtro.fecha() != null) {
                LocalDate fechaFiltro = filtro.fecha().toLocalDate(); // Convertimos a LocalDate para eliminar la hora
                predicates.add(cb.equal(cb.function("DATE", LocalDate.class, root.get("dateExpense")), fechaFiltro));
            }
            cr.select(root).where(predicates.toArray(new Predicate[0]));

            return em.createQuery(cr).getResultList();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return em.createQuery(cr).getResultList();
    }
}
