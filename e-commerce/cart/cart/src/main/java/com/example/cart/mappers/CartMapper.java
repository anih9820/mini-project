package com.example.cart.mappers;

import com.example.cart.dtos.CartRequestDTO;
import com.example.cart.dtos.CartResponseDTO;
import com.example.cart.models.CartItem;
import org.springframework.stereotype.Component;

@Component
public class CartMapper {

    public CartItem toEntity(CartRequestDTO dto) {
        if (dto == null) return null;

        return CartItem.builder()
                .userId(dto.getUserId())
                .productId(dto.getProductId())
                .quantity(dto.getQuantity())
                .build();
    }

    public CartResponseDTO toDTO(CartItem entity) {
        if (entity == null) return null;

        return CartResponseDTO.builder()
                .id(entity.getId())
                .userId(entity.getUserId())
                .productId(entity.getProductId())
                .quantity(entity.getQuantity())
                .price(entity.getPrice())
                .build();
    }

    public void updateEntityFromDTO(CartRequestDTO dto, CartItem entity) {
        if (dto == null || entity == null) return;

        entity.setQuantity(dto.getQuantity());
    }
}

