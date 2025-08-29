import React, { useEffect, useState } from "react";
import "./product-home.css";
import Card from "../../components/product-card/product-card";
import Header from "../../components/header/header";
import {
  getAllProducts,
  getAllCategories,
} from "../../services/product-service";
import LoadingScreen from "../../components/loading-screen/loadingScreen";
import { Link } from "react-router-dom";
import style from "../../styles/productHome.module.css";
import log from "loglevel";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(8);
  const [totalPages, setTotalPages] = useState(1);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const allProducts = await getAllProducts();

      let filtered = allProducts;

      if (selectedCategory) {
        filtered = filtered.filter(
          (product) => product.categoryId === selectedCategory
        );
      }

      if (searchQuery) {
        filtered = filtered.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      const start = currentPage * pageSize;
      const paginated = filtered.slice(start, start + pageSize);

      setProducts(paginated);
      setTotalPages(Math.ceil(filtered.length / pageSize));
    } catch (err) {
      log.error("Error fetching products:", err);
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  // const fetchCategories = async () => {
  //   try {
  //     const data = await getAllCategories();
  //     setCategories(data);
  //   } catch (err) {
  //     log.error("Error fetching categories:", err.message);
  //     setCategories([]);
  //   }
  // };

  // useEffect(() => {
  //   fetchCategories();
  // }, []);

  useEffect(() => {
    fetchProducts();
  }, [currentPage, selectedCategory, searchQuery]);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
    setCurrentPage(0);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(0);
  };

  const handlePageChange = (direction) => {
    if (direction === "next" && currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "prev" && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) return <LoadingScreen />;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Header
        categories={categories}
        onCategorySelect={handleCategorySelect}
        selectedCategory={selectedCategory}
        onSearch={handleSearch}
        currentPage="home"
      />

      <div className={style.productContainer}>
        {products.map((product) => (
          <Card
            key={product.id}
            productId={product.id}
            name={product.name}
            description={product.description}
            price={product.price} 
            imageUrl={product.image}
            supplierId={product.supplierId}
          />
        ))}
      </div>

      <div className={style.pagination}>
        <button
          onClick={() => handlePageChange("prev")}
          disabled={currentPage === 0 || loading}
        >
          Previous
        </button>
        <span>
          Page {currentPage + 1} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange("next")}
          disabled={currentPage === totalPages - 1 || loading}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default Home;
