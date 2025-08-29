package com.example.products.repositories;

import com.example.products.model.Product;
import com.example.products.model.ProductStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    // Find products by name (case-insensitive search)
    Page<Product> findByNameContainingIgnoreCase(String name, Pageable pageable);

    // Find products by category (case-insensitive search)
    Page<Product> findByCategoryIgnoreCase(String category , Pageable pageable);

    // Find approved products
    List<Product> findByStatus(ProductStatus status);
}
