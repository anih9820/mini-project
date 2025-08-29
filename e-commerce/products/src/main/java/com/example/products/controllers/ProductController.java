package com.example.products.controllers;

import com.example.products.dto.ProductRequestDTO;
import com.example.products.dto.ProductResponseDTO;
import com.example.products.model.Product;
import com.example.products.services.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/products")
@RequiredArgsConstructor
public class ProductController extends AbstractController {

    private final ProductService productService;

    // Filter products by name
    @GetMapping("/name")
    public ResponseEntity<Page<Product>> filterProductsByName(@RequestParam String name) {
        Pageable pageable = PageRequest.of(0, 10);
        Page<Product> products = productService.filterProductsByName(name, pageable);
        return respond(HttpStatus.OK, products);
    }

    // Filter products by category
    @GetMapping("/category")
    public ResponseEntity<Page<Product>> filterProductsByCategory(@RequestParam String category) {
        Pageable pageable = PageRequest.of(0, 10);
        Page<Product> products = productService.filterProductsByCategory(category, pageable);
        return respond(HttpStatus.OK, products);
    }

    // Get product by ID
    @GetMapping("/{id}")
    public ResponseEntity<ProductResponseDTO> getProductById(@PathVariable Long id) {
        ProductResponseDTO product = productService.getProductById(id);
        return respond(HttpStatus.OK, product);
    }

    // Add new product
    @PostMapping
    public ResponseEntity<ProductResponseDTO> addProduct(@Valid @RequestBody ProductRequestDTO dto) {
        ProductResponseDTO createdProduct = productService.createProduct(dto);
        return respond(HttpStatus.CREATED, createdProduct);
    }

    // Update product
    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product updatedProduct) {
        Product product = productService.updateProduct(id, updatedProduct);
        if (product == null) {
            return respond(HttpStatus.NO_CONTENT, null);
        }
        return respond(HttpStatus.OK, product);
    }

    // Delete product
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return respond(HttpStatus.NO_CONTENT, null);
    }

    // Approve product
    @PutMapping("/{id}/approve")
    public ResponseEntity<Void> approveProduct(@PathVariable Long id) {
        productService.approveProduct(id);
        return respond(HttpStatus.NO_CONTENT, null);
    }

    // Reject product
    @PutMapping("/{id}/reject")
    public ResponseEntity<Void> rejectProduct(@PathVariable Long id) {
        productService.rejectProduct(id);
        return respond(HttpStatus.NO_CONTENT, null);
    }

    // Get approved products
    @GetMapping("/approved")
    public ResponseEntity<List<Product>> getApprovedProducts() {
        List<Product> products = productService.getApprovedProducts();
        return respond(HttpStatus.OK, products);
    }

    // Get pending products
    @GetMapping("/pending")
    public ResponseEntity<List<Product>> getPendingProducts() {
        List<Product> products = productService.getPendingProducts();
        return respond(HttpStatus.OK, products);
    }

    // Update only the price (PATCH)
    @PatchMapping("/{id}/price")
    public ResponseEntity<ProductResponseDTO> updateProductPrice(@PathVariable Long id, @RequestParam Double price) {
        ProductResponseDTO updated = productService.updateProductPrice(id, price);
        return respond(HttpStatus.OK, updated);
    }
}
