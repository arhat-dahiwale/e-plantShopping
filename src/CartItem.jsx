import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity, addItem } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // 1. Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach((item) => {
      const quantity = item.quantity;
      const cost = parseFloat(item.cost.substring(1)); // remove "$" and convert to number
      total += quantity * cost;
    });
    return total.toFixed(2);
  };

  const calculateTotalQuantity = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };
  

  // 2. Continue shopping
  const handleContinueShopping = (e) => {
    onContinueShopping(e);
  };

  // 3. Checkout placeholder
  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };

  // 4. Increment quantity
  const handleIncrement = (name, quantity) => {
    dispatch(updateQuantity({ name, quantity: quantity + 1 }));
  };

  // 4. Decrement quantity
  const handleDecrement = (name, quantity) => {
    if (quantity > 1) {
      dispatch(updateQuantity({ name, quantity: quantity - 1 }));
    } else {
      dispatch(removeItem(name));
    }
  };

  // 5. Remove item from cart
  const handleRemove = (name) => {
    dispatch(removeItem(name));
  };

  // 6. Calculate subtotal for one item
  const calculateTotalCost = (item) => {
    const cost = parseFloat(item.cost.substring(1));
    return (cost * item.quantity).toFixed(2);
  };

  // Add a product to the cart again
    const handleAddItem = (item) => {
        dispatch(addItem(item));
    };
  

  return (
    <div className="cart-container">
      <h2>Your Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.name} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="cart-details">
                <h3>{item.name}</h3>
                <p>Unit Price: {item.cost}</p>
                <p>Subtotal: ${calculateTotalCost(item)}</p>
                <div className="quantity-controls">
                  <button onClick={() => handleDecrement(item.name, item.quantity)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleIncrement(item.name, item.quantity)}>+</button>
                </div>
                <button onClick={() => handleRemove(item.name)}>Remove</button>
              </div>
            </div>
          ))}
          <div className="cart-summary">
            <h3>Total Items: {calculateTotalQuantity()}</h3>
            <h3>Total: ${calculateTotalAmount()}</h3>
            <button onClick={handleContinueShopping}>Continue Shopping</button>
            <button onClick={handleCheckoutShopping}>Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartItem;
