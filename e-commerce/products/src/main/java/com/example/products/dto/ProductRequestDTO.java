package com.example.products.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class ProductRequestDTO {
    @NotBlank
    private String name;

    @NotBlank
    private String category;

    @NotNull
    @Positive
    private Double price;

    private String description;

    @NotNull
    @Positive
    private Integer stock;

    private String image;

    private String supplierName;
}
