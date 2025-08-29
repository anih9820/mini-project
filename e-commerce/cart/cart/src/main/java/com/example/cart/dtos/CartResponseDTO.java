package com.example.cart.dtos;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartResponseDTO {

    private Long id;
    private Long userId;
    private Long productId;
    private Integer quantity;
    private Double price;
}

