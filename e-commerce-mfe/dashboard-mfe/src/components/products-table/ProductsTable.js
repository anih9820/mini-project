import React from "react";
import { Table, Button, Space, Tooltip, Input } from "antd";
import { EditOutlined, DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import "./ProductsTable.css";

const ProductsTable = ({ products, handleEditProduct, handleDeleteProduct }) => {
  if (!products || products.length === 0) {
    return <div style={{ textAlign: "center", paddingLeft: "20px", paddingRight: "20px", fontSize: "16px" }}>No products available.</div>;
  }

  // Define table columns
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
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => confirm()}
            style={{ width: 188, marginBottom: 8, display: "block" }}
          />
          <Button onClick={() => confirm()} type="primary" icon={<SearchOutlined />} size="small" style={{ width: 90 }}>
            Search
          </Button>
        </div>
      ),
      onFilter: (value, record) => record.name.toLowerCase().includes(value.toLowerCase()),
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
      render: (stock) => (stock > 0 ? stock : <span style={{ color: "red" }}>Out of Stock</span>),
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
        </Space>
      ),
    },
  ];

  return (
    <div style={{ paddingRight: "20px", paddingLeft: "20px" }}>
      <Table
        dataSource={products.map((product) => ({ ...product, key: product.productId }))}
        columns={columns}
        bordered
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default ProductsTable;
