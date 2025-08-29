package com.example.products.dto;

import com.example.products.model.ProductStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class ProductResponseDTO {
    private Long id;
    private String name;
    private String category;
    private Double price;
    private String description;
    private Integer stock;
    private ProductStatus status;
    private String image;
    private String supplierName;
}
