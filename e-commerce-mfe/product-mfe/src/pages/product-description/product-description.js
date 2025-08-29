import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import "./product-description.css";
import Header from "../../components/header/header";
import { getProductById } from "../../services/product-service";
import LoadingScreen from "../../components/loading-screen/loadingScreen";
import { useDispatch } from "react-redux";
import { addItemLocally } from "../../store/cartSlice";
import style from "../../styles/productDescription.module.css";
import { error_image } from "../../constants/constants";

const ProductDescription = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { productId } = useParams();
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addItemLocally({
        id: productId,
        name: product.name,
        price: product.price,
        imageUrl: product.image, // backend field is "image"
        quantity: 1,
      })
    );
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("accessToken"));
  }, []);

  const fetchProductById = async (id) => {
    try {
      const response = await getProductById(id);
      setProduct(response);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { id: 1, name: "Snacks" },
    { id: 2, name: "Beverages" },
    { id: 3, name: "Dairy" },
    { id: 4, name: "Fruits" },
    { id: 5, name: "Vegetables" },
  ];

  useEffect(() => {
    fetchProductById(productId);
  }, [productId]);

  if (loading) return <LoadingScreen />;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>No product found.</div>;

  return (
    <>
      <Header categories={categories} currentPage="productDescription" />
      <div className={style.container}>
        <div className={style.productGrid}>
          <div className={style.imageContainer}>
            <img
              src={product?.image}
              alt={product?.name}
              className={style.productImage}
              onError={(e) => {
                e.target.src = error_image;
              }}
            />
          </div>
          <div className={style.detailsContainer}>
            <div>
              <h1 className={style.productName}>{product?.name}</h1>
              <p className={style.category}>{product?.category}</p>
            </div>

            <div className={style.description}>
              <p>{product?.description}</p>
            </div>

            <div className={style.priceSection}>
              <div>
                <p className={style.price}>
                  ${Number(product?.price || 0).toFixed(2)}
                </p>
                <p className={style.shipping}>Free shipping worldwide</p>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={!isLoggedIn}
                className={style.addToCart}
              >
                <span>Add to Cart</span>
              </button>
            </div>

            <div className={style.supplier}>
              <i className={`fa fa-truck ${style.truckIcon}`}></i>
              <div>
                <p className={style.supplierLabel}>Supplier</p>
                <p className={style.supplierName}>{product?.supplierName}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDescription;
