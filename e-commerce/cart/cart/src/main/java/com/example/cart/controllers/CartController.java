package com.example.cart.controllers;

import com.example.cart.dtos.CartRequestDTO;
import com.example.cart.dtos.CartResponseDTO;
import com.example.cart.service.CartService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/cart")
@RequiredArgsConstructor
public class CartController extends AbstractController {

    private final CartService cartService;

    /**
     * Add a product to the user's cart.
     */
    @PostMapping
    @Operation(summary = "Add item to cart")
    public ResponseEntity<CartResponseDTO> addToCart(@Valid @RequestBody CartRequestDTO request) {
        return createdResponse(cartService.addToCart(request));
    }

    /**
     * Get all items in a specific user's cart.
     */
    @GetMapping("/{userId}")
    @Operation(summary = "Get all cart items for a user")
    public ResponseEntity<List<CartResponseDTO>> getCartItems(@PathVariable("userId") String userId) {
        return successResponse(cartService.getCartItemsByUserId(userId));
    }

    /**
     * Update a cart item's quantity.
     */
    @PutMapping("/{cartItemId}")
    @Operation(summary = "Update quantity of an item in the cart")
    public ResponseEntity<CartResponseDTO> updateCartItem(
            @PathVariable Long cartItemId,
            @Valid @RequestBody CartRequestDTO request
    ) {
        return successResponse(cartService.updateCartItem(cartItemId, request));
    }

    /**
     * Delete a single cart item by ID.
     */
    @DeleteMapping("/{cartItemId}")
    @Operation(summary = "Remove item from cart")
    public ResponseEntity<Void> deleteCartItem(@PathVariable Long cartItemId) {
        cartService.removeCartItem(cartItemId);
        return noContent();
    }

    /**
     * Clear the entire cart for a user.
     */
    @DeleteMapping("/user/{userId}")
    @Operation(summary = "Clear all items from a user's cart")
    public ResponseEntity<Void> clearUserCart(@PathVariable String userId) {
        cartService.clearCartForUser(userId);
        return noContent();
    }
}
