// // import React, { useEffect,useState } from "react";
// // import { useSelector, useDispatch } from "react-redux";
// // import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
// // import { addItem, removeItem, clearCartState, updateCartWithBackend,incrementQuantitySlice } from "../../store/cartSlice";
// // import { checkoutCart } from '../../services/order-service'; 
// // import "./CartPage.css";
// // import Header from "../../components/header/header";
// // import LoadingScreen from "../../components/loading-screen/loadingScreen";

// // const CartPage = () => {
// //   const items = useSelector((state) => state.cart.items);
// //   const status = useSelector((state) => state.cart.status);
// //   const [loading, setLoading] = useState(false);
// //   const dispatch = useDispatch();
// //   const [error, setError] = useState(null);

// //   const calculateTotal = () => {
// //     return items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
// //   };


// //   const incrementQuantity = (item) => {
// //     dispatch(incrementQuantitySlice(item));
// //     setTimeout(() => {
// //       dispatch(updateCartWithBackend(items));
// //     }, 0); 
// //   };
  
// //   const decrementQuantity = (item) => {
// //     if (item.quantity > 1) {
// //       dispatch(removeItem(item.id));
// //       setTimeout(() => {
// //         dispatch(updateCartWithBackend(items));
// //       }, 0);
// //     }
// //   };
  
  
// //   const removeItemFromCart = (id) => {
// //     dispatch(removeItem(id));
// //     dispatch(updateCartWithBackend(items));  
// //   };

// //   const handlePlaceOrder = async () => {
// //     try {
// //       setLoading(true);
// //       const data = await checkoutCart();
// //      // alert("Order placed successfully!");
// //       dispatch(clearCartState());
// //       dispatch(clearCart());  
// //     }
// //     catch(error){
// //       setError(error.message);
// //     }finally{
// //       setLoading(false);
// //     }
 
// //   };

// //   const handleClearCart = () => {
// //     dispatch(clearCartState());
// //    // dispatch(clearCart());  
// //   };

// //   if (status === 'loading' ||loading ) {
// //     return <LoadingScreen />;
// // }

// //   return (
// //     <>
// //       <Header categories={[]} currentPage="productDescription" />
// //       <div className="cart-page">
// //         <div className="container">
// //           <h1 className="title">Shopping Cart</h1>
// //           <div className="cart-box">
// //             {items.length === 0 ? (
// //               <div className="empty-cart">Your cart is empty</div>
// //             ) : (
// //               <div className="cart-items">
// //                 {items.map((item) => (
// //                   <div key={item.id} className="cart-item">
// //                     <img src={item.imageUrl} alt={item.name} className="item-image" />
// //                     <div className="item-details">
// //                       <h2 className="item-name">{item.name}</h2>
// //                       <p className="item-price">${item.price}</p>
// //                     </div>
// //                     <div className="item-actions">
// //                       <button onClick={() => decrementQuantity(item)} className="quantity-btn">
// //                         <FiMinus />
// //                       </button>
// //                       <span className="quantity">{item.quantity}</span>
// //                       <button onClick={() => incrementQuantity(item)} className="quantity-btn">
// //                         <FiPlus />
// //                       </button>
// //                       <button onClick={() => removeItemFromCart(item.id)} className="remove-btn">
// //                         <FiTrash2 />
// //                       </button>
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //             )}
// //           </div>

// //           <div className="summary-box">
// //             <div className="summary-row">
// //               <span className="summary-label">Total</span>
// //               <span className="summary-value">${calculateTotal()}</span>
// //             </div>
// //             <button onClick={handlePlaceOrder} className="order-btn" disabled={items.length === 0}>
// //               Place Order
// //             </button>
// //             <button onClick={handleClearCart} className="clear-cart-btn" disabled={items.length === 0}>
// //               Clear Cart
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // export default CartPage;


// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
// import {
//   addItem,
//   removeItem,
//   clearCartState,
//   updateCartWithBackend,
//   incrementQuantitySlice,
// } from "../../store/cartSlice";
// import { getOrdersByUserId, checkoutCart } from "../../services/order-service";
// import "./CartPage.css";
// import Header from "../../components/header/header";
// import LoadingScreen from "../../components/loading-screen/loadingScreen";

// const CartPage = () => {
//   const items = useSelector((state) => state.cart.items);
//   const status = useSelector((state) => state.cart.status);
//   const [loading, setLoading] = useState(false);
//   const [activeTab, setActiveTab] = useState("cart");
//   const [activeOrders, setActiveOrders] = useState([]);
//   const [error, setError] = useState(null);

//   const dispatch = useDispatch();

//   const calculateTotal = () => {
//     return items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
//   };

//   const incrementQuantity = (item) => {
//     dispatch(incrementQuantitySlice(item));
//     setTimeout(() => {
//       dispatch(updateCartWithBackend());
//     }, 0);
//   };

//   const decrementQuantity = (item) => {
//     if (item.quantity > 1) {
//       dispatch(removeItem(item.id));
//       setTimeout(() => {
//         dispatch(updateCartWithBackend());
//       }, 0);
//     }
//   };

//   const removeItemFromCart = (id) => {
//     dispatch(removeItem(id));
//     dispatch(updateCartWithBackend());
//   };

//   const handlePlaceOrder = async () => {
//     try {
//       setLoading(true);
//       await checkoutCart();
//       dispatch(clearCartState());
//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleClearCart = () => {
//     dispatch(clearCartState());
//   };

//   const fetchOrders = async () => {
//     try {
//       setLoading(true);
//       const orders = await getOrdersByUserId();
//       setActiveOrders(orders);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (activeTab === "orders") {
//       fetchOrders();
//     }
//   }, [activeTab]);

//   const handleTabChange = (tab) => {
//     setActiveTab(tab);
//   };

//   if (status === "loading" || loading) {
//     return <LoadingScreen />;
//   }

//   return (
//     <>
//        <Header categories={[]} currentPage="productDescription" />
//       <div className="cart-page">
//         <div className="container">
//           <h1 className="title">My Account</h1>
//           <div className="tabs">
//             <button
//               className={`tab-btn ${activeTab === "cart" ? "active" : ""}`}
//               onClick={() => handleTabChange("cart")}
//             >
//               Shopping Cart
//             </button>
//             <button
//               className={`tab-btn ${activeTab === "orders" ? "active" : ""}`}
//               onClick={() => handleTabChange("orders")}
//             >
//               Active Orders
//             </button>
//           </div>

//           {activeTab === "cart" && (
//             <div className="cart-container">
//               <div className="left-column">
//                 {items.length === 0 ? (
//                   <div className="empty-cart">Your cart is empty</div>
//                 ) : (
//                   <div className="cart-items">
//                     {items.map((item) => (
//                       <div key={item.id} className="cart-item">
//                         <img src={item.imageUrl} alt={item.name} className="item-image" />
//                         <div className="item-details">
//                           <h2 className="item-name">{item.name}</h2>
//                           <p className="item-price">${item.price}</p>
//                         </div>
//                         <div className="item-actions">
//                           <button
//                             onClick={() => decrementQuantity(item)}
//                             className="quantity-btn"
//                           >
//                             <FiMinus />
//                           </button>
//                           <span className="quantity">{item.quantity}</span>
//                           <button
//                             onClick={() => incrementQuantity(item)}
//                             className="quantity-btn"
//                           >
//                             <FiPlus />
//                           </button>
//                           <button
//                             onClick={() => removeItemFromCart(item.id)}
//                             className="remove-btn"
//                           >
//                             <FiTrash2 />
//                           </button>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               <div className="right-column">
//                 <div className="summary-box">
//                   <div className="summary-row">
//                     <span className="summary-label">Total</span>
//                     <span className="summary-value">${calculateTotal()}</span>
//                   </div>
//                   <button
//                     onClick={handlePlaceOrder}
//                     className="order-btn"
//                     disabled={items.length === 0}
//                   >
//                     Place Order
//                   </button>
//                   <button
//                     onClick={handleClearCart}
//                     className="clear-cart-btn"
//                     disabled={items.length === 0}
//                   >
//                     Clear Cart
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}


//           {/* {activeTab === "cart" && (
//             <div>
//               <div className="cart-box">
//                 {items.length === 0 ? (
//                   <div className="empty-cart">Your cart is empty</div>
//                 ) : (
//                   <div className="cart-items">
//                     {items.map((item) => (
//                       <div key={item.id} className="cart-item">
//                         <img src={item.imageUrl} alt={item.name} className="item-image" />
//                         <div className="item-details">
//                           <h2 className="item-name">{item.name}</h2>
//                           <p className="item-price">${item.price}</p>
//                         </div>
//                         <div className="item-actions">
//                           <button
//                             onClick={() => decrementQuantity(item)}
//                             className="quantity-btn"
//                           >
//                             <FiMinus />
//                           </button>
//                           <span className="quantity">{item.quantity}</span>
//                           <button
//                             onClick={() => incrementQuantity(item)}
//                             className="quantity-btn"
//                           >
//                             <FiPlus />
                           </button>
//                           <button
//                             onClick={() => removeItemFromCart(item.id)}
//                             className="remove-btn"
//                           >
//                             <FiTrash2 />
//                           </button>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               <div className="summary-box">
//                 <div className="summary-row">
//                   <span className="summary-label">Total</span>
//                   <span className="summary-value">${calculateTotal()}</span>
//                 </div>
//                 <button
//                   onClick={handlePlaceOrder}
//                   className="order-btn"
//                   disabled={items.length === 0}
//                 >
//                   Place Order
//                 </button>
//                 <button
//                   onClick={handleClearCart}
//                   className="clear-cart-btn"
//                   disabled={items.length === 0}
//                 >
//                   Clear Cart
//                 </button>
//               </div>
//             </div>
//           )} */}

//           {activeTab === "orders" && (
//             <div className="orders-box">
//               {activeOrders.length === 0 ? (
//                 <div className="empty-orders">No active orders</div>
//               ) : (
//                 <div className="orders-list">
//                   {activeOrders.map((order) => (
//                     <div key={order.orderId} className="order-item">
//                       <h2>Order ID: {order.orderId}</h2>
//                       <p>Total: ${order.totalPrice.toFixed(2)}</p>
//                       <div className="order-items">
//                         {order.items.length > 0 ? (
//                           order.items.map((item) => (
//                             <div key={item.productId} className="order-item-details">
//                               <img
//                                 src={item.imageUrl}
//                                 alt={item.name}
//                                 className="item-image"
//                               />
//                               <div className="details">
//                                 <h3>{item.name}</h3>
//                                 <p>Quantity: {item.quantity}</p>
//                                 <p>Price: ${item.quantityPrice}</p>
//                               </div>
//                             </div>
//                           ))
//                         ) : (
//                           <p>No items in this order.</p>
//                         )}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default CartPage;
