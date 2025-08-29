package com.example.products.services;


import com.example.products.dto.ProductDTO;
import com.example.products.dto.ProductRequestDTO;
import com.example.products.dto.ProductResponseDTO;
import com.example.products.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;


public interface ProductService {

    Page<Product> filterProductsByName(String name, Pageable pageable);

    Page<Product> filterProductsByCategory(String category, Pageable pageable);

    ProductResponseDTO getProductById(Long id);
    ProductResponseDTO createProduct(ProductRequestDTO dto);

    ProductResponseDTO updateProductPrice(Long id, Double price);

    // Method to update product stock or details
    Product updateProduct(Long productId, Product updatedProduct);

    // Method to delete a product by ID
    void deleteProduct(Long productId);

    // Method for data stewards to approve a product
    void approveProduct(Long productId);

    // Method for data stewards to reject a product
    void rejectProduct(Long productId);

    // Method to get all approved products
    List<Product> getApprovedProducts();

    // Method to get all approved products
    List<Product> getPendingProducts();
}