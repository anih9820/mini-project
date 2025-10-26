package com.example.cart.service.impl;

import com.example.cart.common.ErrorMessages;
import com.example.cart.dtos.CartRequestDTO;
import com.example.cart.dtos.CartResponseDTO;
import com.example.cart.exceptions.CartException;
import com.example.cart.mappers.CartMapper;
import com.example.cart.models.CartItem;
import com.example.cart.repositories.CartRepository;
import com.example.cart.service.CartService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

    private static final Logger LOGGER = LoggerFactory.getLogger(CartServiceImpl.class);

    private final CartRepository cartRepository;
    private final CartMapper cartMapper;

    /**
     * Add a new item to the user's cart.
     */
    @Override
    public CartResponseDTO addToCart(CartRequestDTO request) {
        try {
            CartItem item = cartMapper.toEntity(request);
            item.setPrice(0.0); // Placeholder until integrated with product service
            CartItem saved = cartRepository.save(item);
            return cartMapper.toDTO(saved);
        } catch (Exception e) {
            LOGGER.error("Failed to add item to cart", e);
            throw new CartException(HttpStatus.INTERNAL_SERVER_ERROR, ErrorMessages.FAILED_TO_ADD_CART_ITEM);
        }
    }

    /**
     * Retrieve all items in the user's cart.
     */
    @Override
    public List<CartResponseDTO> getCartItemsByUserId(String userId) {
        try {
            List<CartItem> items = cartRepository.findByUserId(userId);
            return items.stream()
                    .map(cartMapper::toDTO)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            LOGGER.error("Failed to fetch cart items for user: {}", userId, e);
            throw new CartException(HttpStatus.INTERNAL_SERVER_ERROR, ErrorMessages.FAILED_TO_FETCH_CART_ITEMS);
        }
    }

    /**
     * Update the quantity of a specific cart item.
     */
    @Override
    public CartResponseDTO updateCartItem(Long cartItemId, CartRequestDTO request) {
        try {
            CartItem existing = cartRepository.findById(cartItemId)
                    .orElseThrow(() -> new CartException(HttpStatus.NOT_FOUND, ErrorMessages.CART_ITEM_NOT_FOUND));

            cartMapper.updateEntityFromDTO(request, existing);
            CartItem updated = cartRepository.save(existing);
            return cartMapper.toDTO(updated);
        } catch (CartException e) {
            throw e;
        } catch (Exception e) {
            LOGGER.error("Failed to update cart item: {}", cartItemId, e);
            throw new CartException(HttpStatus.INTERNAL_SERVER_ERROR, ErrorMessages.FAILED_TO_UPDATE_CART_ITEM);
        }
    }

    /**
     * Remove a specific cart item by ID.
     */
    @Override
    public void removeCartItem(Long cartItemId) {
        try {
            if (!cartRepository.existsById(cartItemId)) {
                throw new CartException(HttpStatus.NOT_FOUND, ErrorMessages.CART_ITEM_NOT_FOUND);
            }
            cartRepository.deleteById(cartItemId);
        } catch (Exception e) {
            LOGGER.error("Failed to remove cart item: {}", cartItemId, e);
            throw new CartException(HttpStatus.INTERNAL_SERVER_ERROR, ErrorMessages.FAILED_TO_REMOVE_CART_ITEM);
        }
    }

    /**
     * Clear all items from a specific user's cart.
     */
    @Override
    public void clearCartForUser(String userId) {
        try {
            List<CartItem> items = cartRepository.findByUserId(userId);
            cartRepository.deleteAll(items);
        } catch (Exception e) {
            LOGGER.error("Failed to clear cart for user: {}", userId, e);
            throw new CartException(HttpStatus.INTERNAL_SERVER_ERROR, ErrorMessages.FAILED_TO_CLEAR_CART);
        }
    }
}
