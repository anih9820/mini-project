import React, { useState, useEffect } from "react";
import Sidebar from "../../components/siderbar/Siderbar";
import DashboardHeader from "../../components/dashboard-header/DashboardHeader";
import LoadingScreen from "../../../../product-mfe/src/components/loading-screen/loadingScreen";
import {
  downloadPendingProducts,
  uploadApprovedProducts,
  getAllProducts,
  approveProduct,
  rejectProduct,
} from "../../services/product-service";
import ProductsTable from "../../components/products-table/ProductsTable";
import UserDropdown from "../../components/user-dropdown/user-dropdown";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [csvFile, setCsvFile] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getAllProducts(page, 10);
        setProducts(data.content);
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [page]);
  const handleApproveProduct = async (productId) => {
    try {
      setLoading(true);
      await approveProduct(productId);
      // Refresh product list
      const data = await getAllProducts(page, 10);
      setProducts(data.content);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRejectProduct = async (productId) => {
    try {
      setLoading(true);
      await rejectProduct(productId);
      // Refresh product list
      const data = await getAllProducts(page, 10);
      setProducts(data.content);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUserSelection = (userId) => {
    setSelectedUserId(userId);
  };

  const handleDownloadPendingCsv = async () => {
    if (!selectedUserId) {
      alert("Please select a user first.");
      return;
    }

    try {
      setLoading(true);
      await downloadPendingProducts(selectedUserId);
    } catch (error) {
      console.error("Error downloading CSV:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    setCsvFile(e.target.files[0]);
  };

  const handleCsvUpload = async () => {
    if (csvFile) {
      try {
        setLoading(true);
        await uploadApprovedProducts(csvFile);
        setCsvFile(null);
      } catch (error) {
        console.error("Error uploading CSV:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please select a CSV file first.");
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container">
      <Sidebar className="sidebar" activeTab="admin" setActiveTab={() => {}} />
      <div className="main-content">
        <DashboardHeader title="Admin Dashboard" />
        <div className="download-section">
          <UserDropdown onUserSelect={handleUserSelection} />
          <button
            className="download-csv-btn"
            onClick={handleDownloadPendingCsv}
          >
            Download Pending Products CSV
          </button>
        </div>
        <div className="upload-section">
          <input
            type="file"
            onChange={handleFileChange}
            accept=".csv"
            style={{ marginTop: "20px" }}
          />
          <button
            onClick={handleCsvUpload}
            className="upload-csv-btn"
            style={{ marginTop: "10px" }}
          >
            Upload Approved CSV
          </button>
        </div>
        <div style={{ marginTop: 32 }}>
          <ProductsTable
            products={products}
            handleEditProduct={() => {}}
            handleDeleteProduct={() => {}}
            handleApproveProduct={handleApproveProduct}
            handleRejectProduct={handleRejectProduct}
            isAdmin={true}
          />
          <div className="pagination">
            <button onClick={() => setPage(page - 1)} disabled={page === 0}>
              Previous
            </button>
            <span>
              Page {page + 1} of {totalPages}
            </span>
            <button
              onClick={() => setPage(page + 1)}
              disabled={page + 1 === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
