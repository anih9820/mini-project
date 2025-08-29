package com.example.cart.service;

import com.example.cart.dtos.CartRequestDTO;
import com.example.cart.dtos.CartResponseDTO;

import java.util.List;

public interface CartService {

    CartResponseDTO addToCart(CartRequestDTO request);

    List<CartResponseDTO> getCartItemsByUserId(Long userId);

    CartResponseDTO updateCartItem(Long cartItemId, CartRequestDTO request);

    void removeCartItem(Long cartItemId);

    void clearCartForUser(Long userId);
}
