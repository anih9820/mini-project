import React from "react";
import { Table, Button, Space, Tooltip, Input } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import "./ProductsTable.css";

const ProductsTable = ({
  products,
  handleEditProduct,
  handleDeleteProduct,
  handleApproveProduct,
  handleRejectProduct,
  isAdmin,
}) => {
  if (!products || products.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          paddingLeft: "20px",
          paddingRight: "20px",
          fontSize: "16px",
        }}
      >
        No products available.
      </div>
    );
  }

  const columns = [
    {
      title: "Product",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search product"
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => confirm()}
            style={{ width: 188, marginBottom: 8, display: "block" }}
          />
          <Button
            onClick={() => confirm()}
            type="primary"
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
        </div>
      ),
      onFilter: (value, record) =>
        record.name.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: "Supplier",
      dataIndex: "supplierName",
      key: "supplierName",
    },
    {
      title: "Description",
      dataIndex: "productDescription",
      key: "productDescription",
    },
    {
      title: "Price ($)",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
      render: (price) => `$${price.toFixed(2)}`,
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      sorter: (a, b) => a.stock - b.stock,
      render: (stock) =>
        stock > 0 ? stock : <span style={{ color: "red" }}>Out of Stock</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "#faad14";
        if (status === "APPROVED") color = "#52c41a";
        if (status === "REJECTED") color = "#f5222d";
        return <span style={{ color, fontWeight: 600 }}>{status}</span>;
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, product) => (
        <Space size="middle">
          <Tooltip title="Edit Product">
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => handleEditProduct(product)}
            />
          </Tooltip>
          <Tooltip title="Delete Product">
            <Button
              type="danger"
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={() => handleDeleteProduct(product.productId)}
            />
          </Tooltip>
          {isAdmin && product.status === "PENDING" && (
            <>
              <Tooltip title="Approve Product">
                <Button
                  type="primary"
                  onClick={() => handleApproveProduct(product.productId)}
                  style={{ backgroundColor: "#52c41a", borderColor: "#52c41a" }}
                >
                  Approve
                </Button>
              </Tooltip>
              <Tooltip title="Reject Product">
                <Button
                  type="danger"
                  onClick={() => handleRejectProduct(product.productId)}
                  style={{ backgroundColor: "#f5222d", borderColor: "#f5222d" }}
                >
                  Reject
                </Button>
              </Tooltip>
            </>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div style={{ paddingRight: "20px", paddingLeft: "20px" }}>
      <Table
        dataSource={products.map((product) => ({
          ...product,
          key: product.productId,
        }))}
        columns={columns}
        bordered
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default ProductsTable;
