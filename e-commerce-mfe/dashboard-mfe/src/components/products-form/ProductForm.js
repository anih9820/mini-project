import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber, Button, Select, Upload, Modal } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const { Option } = Select;

const ProductForm = ({ editProduct, setEditProduct, handleUpdateProduct }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (editProduct) {
      form.setFieldsValue(editProduct);
    }
  }, [editProduct, form]);

  const onFinish = (values) => {
    const payload = {
      name: values.name,
      category: values.category,
      price: values.price,
      description: values.description,
      stock: values.stock,
      image:
        fileList.length > 0
          ? URL.createObjectURL(fileList[0].originFileObj)
          : "https://cdn.example.com/products/ecosteel-bottle-750ml.jpg", // fallback
      supplierName: values.supplierName,
    };
  console.log("🔍 Submitting product payload:", payload);
    handleUpdateProduct(payload);
    setEditProduct(null);
  };

  return (
    <Modal
      title={editProduct ? "Edit Product" : "Add Product"}
      open={!!editProduct}
      onCancel={() => setEditProduct(null)}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Product Name"
          name="name"
          rules={[{ required: true, message: "Please enter the product name" }]}
        >
          <Input placeholder="Enter product name" />
        </Form.Item>

        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true, message: "Please select a category" }]}
        >
          <Select placeholder="Select category">
            <Option value="Fresh Produce">Fresh Produce</Option>
            <Option value="Dairy & Eggs">Dairy & Eggs</Option>
            <Option value="Meat & Poultry">Meat & Poultry</Option>
            <Option value="Seafood">Seafood</Option>
            <Option value="Frozen Foods">Frozen Foods</Option>
            <Option value="Bakery & Desserts">Bakery & Desserts</Option>
            <Option value="Beverages">Beverages</Option>
            <Option value="Dry Goods & Pantry">Dry Goods & Pantry</Option>
            <Option value="Condiments & Sauces">Condiments & Sauces</Option>
            <Option value="Snacks & Appetizers">Snacks & Appetizers</Option>
            <Option value="Canned & Packaged Goods">
              Canned & Packaged Goods
            </Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Price ($)"
          name="price"
          rules={[
            {
              required: true,
              type: "number",
              min: 0,
              message: "Enter a valid price",
            },
          ]}
        >
          <InputNumber style={{ width: "100%" }} min={0} step={0.01} />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please enter a description" }]}
        >
          <TextArea rows={3} placeholder="Enter product description" />
        </Form.Item>

        <Form.Item
          label="Stock Quantity"
          name="stock"
          rules={[
            {
              required: true,
              type: "number",
              min: 0,
              message: "Enter a valid stock quantity",
            },
          ]}
        >
          <InputNumber style={{ width: "100%" }} min={0} />
        </Form.Item>

        <Form.Item
          label="Supplier Name"
          name="supplierName"
          rules={[
            { required: true, message: "Please enter the supplier name" },
          ]}
        >
          <Input placeholder="Enter supplier name" />
        </Form.Item>

        <Form.Item label="Product Image">
          <Upload
            beforeUpload={() => false}
            fileList={fileList}
            onChange={({ fileList }) => setFileList(fileList)}
            listType="picture"
          >
            <Button icon={<UploadOutlined />}>Upload Image</Button>
          </Upload>
        </Form.Item>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button onClick={() => setEditProduct(null)}>Cancel</Button>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default ProductForm;
