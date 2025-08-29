package com.example.products.dto;

import com.example.products.model.ProductStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class ProductDTO {

    private Long id;

    @NotBlank(message = "Product name must not be empty")
    private String name;

    @Size(max = 200, message = "Description cannot exceed 200 characters")
    private String description;

    @NotNull(message = "Price cannot be null")
    @Positive(message = "Price must be a positive value")
    private Double price;

    @NotNull(message = "Stock cannot be null")
    @Positive(message = "Stock must be a positive value")
    private Integer stock;

    @NotBlank(message = "Category cannot be empty")
    private String category;

    @NotNull(message = "Status cannot be null")
    private ProductStatus status;

    private String image;

    @NotNull
    private String supplierName;

}
