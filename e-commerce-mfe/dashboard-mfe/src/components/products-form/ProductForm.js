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
    const value = {
      ...values,
      imageUrl: "https://scitechdaily.com/images/Sliced-Watermelon.jpg"

    }
    handleUpdateProduct(value);
    setEditProduct(null);
  };

  return (
    <Modal
      title={editProduct?.productId ? "Edit Product" : "Add Product"}
      open={!!editProduct}
      onCancel={() => setEditProduct(null)}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={editProduct}
      >
        <Form.Item
          label="Product Name"
          name="name"
          rules={[{ required: true, message: "Please enter the product name" }]}
        >
          <Input placeholder="Enter product name" />
        </Form.Item>

        <Form.Item
          label="Price ($)"
          name="price"
          rules={[{ required: true, type: "number", min: 0, message: "Enter a valid price" }]}
        >
          <InputNumber style={{ width: "100%" }} min={0} step={0.01} />
        </Form.Item>

        <Form.Item
          label="Description"
          name="productDescription"
          rules={[{ required: true, message: "Please enter the product description" }]}
        >
          <TextArea rows={3} placeholder="Enter product description" />
        </Form.Item>

        <Form.Item
          label="Stock Quantity"
          name="stock"
          rules={[{ required: true, type: "number", min: 0, message: "Enter a valid stock quantity" }]}
        >
          <InputNumber style={{ width: "100%" }} min={0} />
        </Form.Item>

        <Form.Item
          label="Category"
          name="categoryName"
          rules={[{ required: true, message: "Please select a category" }]}
        >
          <Select placeholder="Select category">
            <Option value="Fruits">Fruits</Option>
            <Option value="Clothing">Clothing</Option>
            <Option value="Books">Books</Option>
            <Option value="Home">Home</Option>
          </Select>
        </Form.Item>

        {/* <Form.Item
          label="Image URL"
          name="imageUrl"
          rules={[{ required: true, message: "Please enter an image URL" }]}
        >
          <Input placeholder="Enter image URL" />
        </Form.Item> */}

        <Form.Item>
          <Upload
            beforeUpload={() => false} // Prevent automatic upload
            fileList={fileList}
            onChange={({ fileList }) => setFileList(fileList)}
            listType="picture"
          >
            <Button icon={<UploadOutlined />}>Upload Product Image</Button>
          </Upload>
        </Form.Item>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button onClick={() => setEditProduct(null)}>Cancel</Button>
          <Button type="primary" htmlType="submit">Save</Button>
        </div>
      </Form>
    </Modal>
  );
};

export default ProductForm;
