package com.example.products.services.Implementation;

import com.example.products.dto.ProductRequestDTO;
import com.example.products.dto.ProductResponseDTO;
import com.example.products.exceptions.ProductNotFoundException;
import com.example.products.exceptions.ProductOperationException;
import com.example.products.model.Product;
import com.example.products.model.ProductStatus;
import com.example.products.repositories.ProductRepository;
import com.example.products.services.ProductService;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductServiceImpl implements ProductService {

    private static final Logger log = LoggerFactory.getLogger(ProductServiceImpl.class);

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ModelMapper modelMapper;

    // Filter the product by name
    @Override
    public Page<Product> filterProductsByName(String name, Pageable pageable) {
        try {
            return productRepository.findByNameContainingIgnoreCase(name, pageable);
        } catch (Exception e) {
            log.error("Error searching products by name '{}': {}", name, e.getMessage());
            throw new ProductOperationException("Error occurred while searching for products.");
        }
    }

    // Filter product by category
    @Override
    public Page<Product> filterProductsByCategory(String category, Pageable pageable) {
        try {
            return productRepository.findByCategoryIgnoreCase(category, pageable);
        } catch (Exception e) {
            log.error("Error filtering products by category '{}': {}", category, e.getMessage());
            throw new ProductOperationException("Error occurred while filtering products.");
        }
    }

    // Get product by ID
    @Override
    public ProductResponseDTO getProductById(Long id) {
        try {
            Product product = productRepository.findById(id)
                    .orElseThrow(() -> new ProductNotFoundException("Product not found with ID: " + id));
            return modelMapper.map(product, ProductResponseDTO.class);
        } catch (Exception e) {
            log.error("Error retrieving product ID {}: {}", id, e.getMessage());
            throw new ProductOperationException("Failed to retrieve product details.");
        }
    }

    // Create product
    @Override
    public ProductResponseDTO createProduct(ProductRequestDTO dto) {
        try {
            Product product = modelMapper.map(dto, Product.class);
            product.setStatus(ProductStatus.PENDING); // vendor-created -> PENDING
            Product saved = productRepository.save(product);
            return modelMapper.map(saved, ProductResponseDTO.class);
        } catch (Exception e) {
            log.error("Error while adding product: {}", e.getMessage());
            throw new ProductOperationException("Failed to add product.");
        }
    }

    // Update product price
    @Override
    public ProductResponseDTO updateProductPrice(Long id, Double price) {
        try {
            Product product = productRepository.findById(id)
                    .orElseThrow(() -> new ProductNotFoundException("Product not found with ID: " + id));
            product.setPrice(price);
            Product updated = productRepository.save(product);
            return modelMapper.map(updated, ProductResponseDTO.class);
        } catch (Exception e) {
            log.error("Error updating price for product ID {}: {}", id, e.getMessage());
            throw new ProductOperationException("Failed to update price.");
        }
    }

    // Update product
    @Override
    public Product updateProduct(Long productId, Product updatedProduct) {
        try {
            Optional<Product> existingProductOpt = productRepository.findById(productId);
            if (existingProductOpt.isPresent()) {
                Product existingProduct = existingProductOpt.get();

                if (updatedProduct.getName() != null) {
                    existingProduct.setName(updatedProduct.getName());
                }
                if (updatedProduct.getDescription() != null) {
                    existingProduct.setDescription(updatedProduct.getDescription());
                }
                if (updatedProduct.getPrice() != null) {
                    existingProduct.setPrice(updatedProduct.getPrice());
                }
                if (updatedProduct.getStock() != null) {
                    existingProduct.setStock(updatedProduct.getStock());
                }
                if (updatedProduct.getCategory() != null) {
                    existingProduct.setCategory(updatedProduct.getCategory());
                }
                if (updatedProduct.getImage() != null) {
                    existingProduct.setImage(updatedProduct.getImage());
                }
                if (updatedProduct.getSupplierName() != null) {
                    existingProduct.setSupplierName(updatedProduct.getSupplierName());
                }

                return productRepository.save(existingProduct);
            }
            throw new ProductNotFoundException("Product with ID " + productId + " not found");
        } catch (Exception e) {
            log.error("Error updating product ID {}: {}", productId, e.getMessage());
            throw new ProductOperationException("Failed to update product.");
        }
    }

    // Delete product
    @Override
    public void deleteProduct(Long productId) {
        try {
            if (!productRepository.existsById(productId)) {
                throw new ProductNotFoundException("Product with ID " + productId + " not found");
            }
            productRepository.deleteById(productId);
        } catch (Exception e) {
            log.error("Error deleting product ID {}: {}", productId, e.getMessage());
            throw new ProductOperationException("Failed to delete product.");
        }
    }

    // Approve product
    @Override
    public void approveProduct(Long productId) {
        try {
            Product product = productRepository.findById(productId)
                    .orElseThrow(() -> new ProductNotFoundException("Product with ID " + productId + " not found"));
            product.setStatus(ProductStatus.APPROVED);
            productRepository.save(product);
        } catch (Exception e) {
            log.error("Error approving product ID {}: {}", productId, e.getMessage());
            throw new ProductOperationException("Failed to approve product.");
        }
    }

    // Reject product
    @Override
    public void rejectProduct(Long productId) {
        try {
            Product product = productRepository.findById(productId)
                    .orElseThrow(() -> new ProductNotFoundException("Product with ID " + productId + " not found"));
            product.setStatus(ProductStatus.REJECTED);
            productRepository.save(product);
        } catch (Exception e) {
            log.error("Error rejecting product ID {}: {}", productId, e.getMessage());
            throw new ProductOperationException("Failed to reject product.");
        }
    }

    // Get approved products
    @Override
    public List<Product> getApprovedProducts() {
        try {
            return productRepository.findByStatus(ProductStatus.APPROVED);
        } catch (Exception e) {
            log.error("Error retrieving approved products: {}", e.getMessage());
            throw new ProductOperationException("Failed to retrieve approved products.");
        }
    }

    // Get pending products
    @Override
    public List<Product> getPendingProducts() {
        try {
            return productRepository.findByStatus(ProductStatus.PENDING);
        } catch (Exception e) {
            log.error("Error retrieving pending products: {}", e.getMessage());
            throw new ProductOperationException("Failed to retrieve pending products.");
        }
    }
}
