import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";

import {
  addItemLocally,
  removeItemLocally,
  clearCartState,
  incrementQuantitySlice,
  updateCartItemInBackend,
} from "../../store/cartSlice";

import { clearCartByUserId } from "../../services/order-service";

import "./CartPage.css";
import Header from "../../components/header/header";
import LoadingScreen from "../../components/loading-screen/loadingScreen";
import style from "../../styles/cartPage.module.css";
import { setUser } from "../../store/authSlice";
import { ACTIVE_TAB } from "../../constants/constants";

const CartPage = () => {
  const items = useSelector((state) => state.cart.items);
  const status = useSelector((state) => state.cart.status);
  const userId = useSelector((state) => state.auth.userId);

  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("cart");
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const calculateTotal = () => {
    return items
      .reduce((total, item) => total + item.quantity * (item.price || 0), 0)
      .toFixed(2);
  };

  const incrementQuantity = (item) => {
    dispatch(incrementQuantitySlice(item));
    dispatch(
      updateCartItemInBackend({ cartItemId: item.productId, updatedItem: item })
    );
  };

  const decrementQuantity = (item) => {
    if (item.quantity > 1) {
      dispatch(removeItemLocally(item.productId));
      dispatch(
        updateCartItemInBackend({
          cartItemId: item.productId,
          updatedItem: { ...item, quantity: item.quantity - 1 },
        })
      );
    }
  };

  const removeItemFromCart = (id) => {
    dispatch(removeItemLocally(id));
  };

  const handlePlaceOrder = async () => {
    try {
      setLoading(true);
      dispatch(clearCartState());
      await clearCartByUserId(userId);
      dispatch(setUser({ userId, cartId: "mock-order-id" }));
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClearCart = () => {
    dispatch(clearCartState());
    clearCartByUserId(userId);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  if (status === "loading" || loading) return <LoadingScreen />;

  return (
    <>
      <Header categories={[]} currentPage="productDescription" />

      <div className={style.cartPage}>
        <div className={style.container}>
          <h1 className={style.title}>Your Cart</h1>

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
                    {items.map((item) => (
                      <div key={item.productId} className={style.cartItem}>
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className={style.itemImage}
                        />
                        <div className={style.itemDetails}>
                          <h2 className={style.itemName}>{item.name}</h2>
                          <p className={style.itemPrice}>${item.price}</p>
                        </div>
                        <div className={style.itemActions}>
                          <button
                            onClick={() => decrementQuantity(item)}
                            className={style.quantityBtn}
                          >
                            <FiMinus />
                          </button>
                          <span className={style.quantity}>
                            {item.quantity}
                          </span>
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
                    ))}
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
