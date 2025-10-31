import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import log from "loglevel";

import {
  removeItemLocally,
  clearCartState,
  incrementQuantitySlice,
  updateCartItemInBackend,
} from "../../store/cartSlice";

import { clearCartByUserId } from "../../services/order-service";
import Header from "../../components/header/header";
import LoadingScreen from "../../components/loading-screen/loadingScreen";
import style from "../../styles/cartPage.module.css";
import { setUser } from "../../store/authSlice";
import { ACTIVE_TAB } from "../../constants/constants";

import "./CartPage.css";

const CartPage = () => {
  const items = useSelector((state) => state.cart.items);
  const status = useSelector((state) => state.cart.status);
  const userId = useSelector((state) => state.auth.userId);

  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("cart");
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  // ✅ Centralized error handler
  const handleError = (message, err) => {
    log.error(message, err);
    setError("Something went wrong. Please try again later.");
  };

  const calculateTotal = () => {
    if (!Array.isArray(items)) return "0.00";
    return items
      .reduce(
        (total, item) => total + (item?.quantity || 0) * (item?.price || 0),
        0
      )
      .toFixed(2);
  };

const incrementQuantity = (item) => {
  try {
    // Build a full payload including required fields
    const updatedPayload = {
      userId, // from Redux
      productId: item.productId || item.id, // backend needs this
      quantity: item.quantity + 1,
      price: item.price,
    };

    dispatch(incrementQuantitySlice(item));
    dispatch(
      updateCartItemInBackend({
        cartItemId: item.id,
        updatedItem: updatedPayload,
      })
    );
  } catch (err) {
    handleError("Error incrementing item quantity:", err);
  }
};

const decrementQuantity = (item) => {
  try {
    if (item.quantity > 1) {
      const updatedPayload = {
        userId,
        productId: item.productId || item.id,
        quantity: item.quantity - 1,
        price: item.price,
      };

      dispatch(removeItemLocally(item.id));
      dispatch(
        updateCartItemInBackend({
          cartItemId: item.id,
          updatedItem: updatedPayload,
        })
      );
    }
  } catch (err) {
    handleError("Error decrementing item quantity:", err);
  }
};


  const removeItemFromCart = (id) => {
    try {
      dispatch(removeItemLocally(id));
    } catch (err) {
      handleError("Error removing item from cart:", err);
    }
  };

  const handlePlaceOrder = async () => {
    try {
      setLoading(true);
      dispatch(clearCartState());
      await clearCartByUserId(userId);
      dispatch(setUser({ userId, cartId: "mock-order-id" }));
    } catch (err) {
      handleError("Error placing order:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleClearCart = async () => {
    try {
      dispatch(clearCartState());
      await clearCartByUserId(userId);
    } catch (err) {
      handleError("Error clearing cart:", err);
    }
  };

  const handleTabChange = (tab) => setActiveTab(tab);

  // 🧩 Defensive guard — ensure items is always iterable
  if (!Array.isArray(items)) {
    log.error("Cart items state is invalid:", items);
    return <div className={style.errorBox}>Cart failed to load.</div>;
  }

  if (status === "loading" || loading) return <LoadingScreen />;

  return (
    <>
      <Header categories={[]} currentPage="productDescription" />

      <div className={style.cartPage}>
        <div className={style.container}>
          <h1 className={style.title}>Your Cart</h1>

          {error && <div className={style.errorMsg}>{error}</div>}

          <div className={style.tabs}>
            <button
              className={`${style.tabBtn} ${
                activeTab === ACTIVE_TAB.cart ? style.active : ""
              }`}
              onClick={() => handleTabChange("cart")}
            >
              Shopping Cart
            </button>
          </div>

          {activeTab === ACTIVE_TAB.cart && (
            <div className={style.cartContainer}>
              <div className={style.leftColumn}>
                {items.length === 0 ? (
                  <div className={style.emptyCart}>Your cart is empty</div>
                ) : (
                  <div className={style.cartItems}>
                    {items.map((item, index) => {
                      if (!item) {
                        log.warn(
                          "Skipping undefined cart item at index:",
                          index
                        );
                        return null;
                      }

                      const safeName = item.name || "Unnamed Product";
                      const safeImage =
                        item.imageUrl ||
                        "https://via.placeholder.com/150?text=No+Image";
                      const safePrice = item.price ?? 0;
                      const safeQty = item.quantity ?? 0;

                      return (
                        <div
                          key={item.productId || index}
                          className={style.cartItem}
                        >
                          <img
                            src={safeImage}
                            alt={safeName}
                            className={style.itemImage}
                          />
                          <div className={style.itemDetails}>
                            <h2 className={style.itemName}>{safeName}</h2>
                            <p className={style.itemPrice}>${safePrice}</p>
                          </div>
                          <div className={style.itemActions}>
                            <button
                              onClick={() => decrementQuantity(item)}
                              className={style.quantityBtn}
                            >
                              <FiMinus />
                            </button>
                            <span className={style.quantity}>{safeQty}</span>
                            <button
                              onClick={() => incrementQuantity(item)}
                              className={style.quantityBtn}
                            >
                              <FiPlus />
                            </button>
                            <button
                              onClick={() => removeItemFromCart(item.productId)}
                              className={style.removeBtn}
                            >
                              <FiTrash2 />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className={style.rightColumn}>
                <div className={style.summaryBox}>
                  <div className={style.summaryRow}>
                    <span className={style.summaryLabel}>Total</span>
                    <span className={style.summaryValue}>
                      ${calculateTotal()}
                    </span>
                  </div>
                  <button
                    onClick={handlePlaceOrder}
                    className={style.orderBtn}
                    disabled={items.length === 0}
                  >
                    Place Order
                  </button>
                  <button
                    onClick={handleClearCart}
                    className={style.clearCartBtn}
                    disabled={items.length === 0}
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartPage;
