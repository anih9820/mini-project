import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import './Header.css';
import 'font-awesome/css/font-awesome.min.css';
import { useSelector } from 'react-redux';
import styles from "../../styles/header.module.css"

const Header = ({ categories, onCategorySelect, selectedCategory, onSearch, currentPage }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [productCategories, setProductCategories] = useState(null);

  useEffect(() => {
    
    const token = localStorage.getItem('accessToken');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    setProductCategories(categories?.data);
  }, [categories])

  const cartItems = useSelector((state) => state.cart.items);
  const cartItemCount = cartItems ? cartItems.length : 0;

  const handleSearch = (event) => {
    event.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
  };

  return (
    <header className={styles.header}>
      {currentPage !== "productDescription" && onSearch && (
        <div className={styles.searchContainer}>
          <form onSubmit={handleSearch}>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products..."
              aria-label="Search products"
              className={styles.searchInput}
            />
            <button type="submit" className={styles.searchButton} aria-label="Search">
              <i className="fas fa-search"></i>
            </button>
          </form>
        </div>
      )}

      <nav className={styles.navContainer}>
        {currentPage !== "productDescription" && productCategories && (
          <div className={styles.categoryButtons}>
            {productCategories?.map((category) => (
              <button
                onClick={() => onCategorySelect && onCategorySelect(category.categoryName)}
                key={category.categoryId}
                className={`${styles.categoryBtn} ${selectedCategory === category.categoryName ? styles.active : ''}`}
                aria-label={category.categoryName}
              >
                {category.categoryName}
              </button>
            ))}
          </div>
        )}
        {isLoggedIn && (
          <div className={styles.cartContainer}>
            <Link to="/cart" aria-label="Cart">
              <i className={`fas fa-shopping-cart ${styles.cartIcon}`}></i>
              {cartItemCount > 0 && (
                <span className={styles.cartItemCount}>{cartItemCount}</span>
              )}
            </Link>
          </div>
        )}

        <div className={styles.authButtons}>
          {!isLoggedIn ? (
            <>
              <button className={styles.loginBtn} aria-label="Login">
                <a href="/" className={`${styles.loginLink} ${styles.iconWhite}`}>
                  <i className="fas fa-user"></i> Login
                </a>
              </button>
              <button className={styles.signupBtn} aria-label="Sign up">
                <a href="/signup" className={`${styles.signupLink} ${styles.iconWhite}`}>
                  <i className="fas fa-user-plus"></i> Sign Up
                </a>
              </button>
            </>
          ) : (
            <button className={styles.loginBtn} aria-label="Logout" onClick={handleLogout}>
              <a href="/product" className={styles.signupLink}>
                <i className="fas fa-sign-out-alt"></i> Logout
              </a>
            </button>
          )}
        </div>
      </nav>
    </header>

  );
};

export default Header;
