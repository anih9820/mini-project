import React, { useState, useEffect } from "react";
import Sidebar from "../../components/siderbar/Siderbar";
import DashboardHeader from "../../components/dashboard-header/DashboardHeader";
import ProductsTable from "../../components/products-table/ProductsTable";
import ProductForm from "../../components/products-form/ProductForm";
import {
  getAllProducts,
  submitChangeRequests,
  createProduct,
} from "../../services/product-service";
import "./SellerDashboard.css";
import LoadingScreen from "../../../../product-mfe/src/components/loading-screen/loadingScreen";
import { Button } from "antd";

const SellerDashboard = () => {
  const [activeTab, setActiveTab] = useState("products");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editProduct, setEditProduct] = useState(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [creatingProduct, setCreatingProduct] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getAllProducts(page, 5);
        setProducts(data.content);
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [page]);

  const handleEditProduct = (product) => setEditProduct(product);

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter((p) => p.productId !== productId));
  };

  const handleUpdateProduct = async (e) => {
    const updatedProduct = {
      productDescription: e.productDescription,
      imageUrl: e.imageUrl,
      stock: e.stock,
      price: e.price,
      name: e.name,
      categoryName: e.categoryName,
    };

    try {
      setLoading(true);
      let response;
      if (creatingProduct) {
        response = await createProduct(updatedProduct);
        setCreatingProduct(false);
      } else {
        response = await submitChangeRequests(
          updatedProduct,
          editProduct.productId
        );
      }

      setProducts((prev) =>
        prev.map((p) =>
          p.productId === editProduct.productId ? { ...p, ...response } : p
        )
      );
      setEditProduct(null);
    } catch (error) {
      console.error("Error updating product:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

  if (loading) return <LoadingScreen />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container">
      <Sidebar
        className="sidebar"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <div className="main-content">
        {activeTab === "products" ? (
          <>
            <DashboardHeader title="Products" />
            {editProduct ? (
              <ProductForm
                editProduct={editProduct}
                setEditProduct={setEditProduct}
                handleUpdateProduct={handleUpdateProduct}
              />
            ) : (
              <>
                <div className="add-button">
                  <Button
                    type="primary"
                    onClick={() => {
                      setEditProduct({
                        productId: "",
                        name: "",
                        description: "",
                        price: 0,
                        stock: 0,
                      });
                      setCreatingProduct(true);
                    }}
                  >
                    + Add Product
                  </Button>
                </div>
                <ProductsTable
                  products={products}
                  handleEditProduct={handleEditProduct}
                  handleDeleteProduct={handleDeleteProduct}
                />
                <div className="pagination">
                  <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 0}
                  >
                    Previous
                  </button>
                  <span>
                    Page {page + 1} of {totalPages}
                  </span>
                  <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page + 1 === totalPages}
                  >
                    Next
                  </button>
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <DashboardHeader title="Orders" />
            {/* Future: OrdersTable */}
          </>
        )}
      </div>
    </div>
  );
};

export default SellerDashboard;
