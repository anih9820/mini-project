import React, { useState, useEffect } from "react";
import "./product-card.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItemLocally } from "../../store/cartSlice";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Button } from "antd";
import style from "../../styles/productCard.module.css";
import { addToCart } from "../../services/order-service";
import log from "loglevel";
import { placeholder_image } from "../../constants/constants";

function Card({ productId, name, description, price, imageUrl, supplierId }) {
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  }, []);

  const handleAddToCart = async () => {
    try {
      const payload = {
        productId,
        name,
        imageUrl,
        supplierId,
        quantity: 1,
        quantityPrice: price,
      };

      // Update backend
      await addToCart(payload);

      // Update Redux
      dispatch(
        addItemLocally({
          id: productId,
          name,
          imageUrl,
          supplierId,
          price,
          quantity: 1,
        })
      );
    } catch (error) {
      log.error("Error adding item to cart:", error);
    }
  };

  return (
    <div className={style.productCard}>
      <h5 className={style.productTitle}>{name}</h5>

      <Link key={productId} to={`/${productId}`}>
        <img
          src={imageUrl || placeholder_image}
          alt="Product"
          className={style.productImage}
        />
      </Link>

      <div className={style.productDetails}>
        <p className={style.productDescription}>{description}</p>
        <div className={style.productPrice}>
          <div className={style.priceLeft}>Price : ${price}</div>
          <div className={style.priceRight}>
            <Button
              onClick={handleAddToCart}
              disabled={!isLoggedIn}
              type="primary"
              icon={<ShoppingCartOutlined />}
              className={style.customCartButton}
            />
          </div>
        </div>
        <button disabled={!isLoggedIn} className={style.buyBtn}></button>
      </div>
    </div>
  );
}

export default Card;
