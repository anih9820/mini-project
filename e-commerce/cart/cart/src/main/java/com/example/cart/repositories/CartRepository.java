package com.example.cart.repositories;

import com.example.cart.models.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartRepository extends JpaRepository<CartItem, Long> {

    List<CartItem> findByUserId(String userId);

    void deleteByUserIdAndProductId(String userId, Long productId);
}
