import React from "react";
import { useCart } from "../Contexts/CartContext";

import { useNavigate } from "react-router-dom";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

const Cart: React.FC = () => {
  const {
    items,

    removeFromCart,

    clearCart,

    increaseQuantity,

    decreaseQuantity,
  } = useCart();

  const navigate = useNavigate();
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleMouseOver = (
    e: React.MouseEvent<HTMLButtonElement>,

    hoverColor: string,

    textColor: string = "white"
  ) => {
    e.currentTarget.style.backgroundColor = hoverColor;

    e.currentTarget.style.color = textColor;
  };

  const handleMouseOut = (
    e: React.MouseEvent<HTMLButtonElement>,

    defaultColor: string = "transparent",

    textColor: string = "#e74c3c"
  ) => {
    e.currentTarget.style.backgroundColor = defaultColor;

    e.currentTarget.style.color = textColor;
  };

  const renderCartItemImage = (item: CartItem) => {
    return (
      <div
        style={{
          width: "80px",

          height: "80px",

          backgroundColor: "#f5f5f5",

          borderRadius: "4px",

          display: "flex",

          alignItems: "center",

          justifyContent: "center",

          color: "#bdc3c7",

          overflow: "hidden",
        }}
      >
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            style={{
              width: "100%",

              height: "100%",

              objectFit: "cover",
            }}
          />
        ) : (
          <span>No Image</span>
        )}
      </div>
    );
  };

  return (
    <div
      className="cart-page"
      style={{
        maxWidth: "800px",

        margin: "0 auto",

        padding: "2rem",

        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",

        minHeight: "calc(100vh - 4rem)",
      }}
    >
      <h1
        style={{
          fontSize: "2.5rem",

          color: "#2c3e50",

          marginBottom: "2rem",

          borderBottom: "2px solid #f1f1f1",

          paddingBottom: "1rem",
        }}
      >
        Your Shopping Cart
      </h1>

      {items.length === 0 ? (
        <div
          style={{
            textAlign: "center",

            padding: "3rem",

            backgroundColor: "#f9f9f9",

            borderRadius: "8px",

            marginTop: "2rem",
          }}
        >
          <p style={{ fontSize: "1.2rem", color: "#7f8c8d" }}>
            Your cart is empty
          </p>

          <button
            onClick={() => navigate("/")}
            style={{
              marginTop: "1rem",

              backgroundColor: "#3498db",

              color: "white",

              border: "none",

              padding: "0.8rem 1.5rem",

              borderRadius: "4px",

              cursor: "pointer",

              fontSize: "1rem",

              transition: "background-color 0.3s",
            }}
            onMouseOver={(e) => handleMouseOver(e, "#2980b9")}
            onMouseOut={(e) => handleMouseOut(e, "#3498db", "white")}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div
            className="cart-items"
            style={{
              marginBottom: "2rem",

              boxShadow: "0 2px 10px rgba(0,0,0,0.05)",

              borderRadius: "8px",

              overflow: "hidden",
            }}
          >
            {items.map((item) => (
              <div
                key={item.id}
                className="cart-item"
                style={{
                  backgroundColor: "white",

                  padding: "1.5rem",

                  display: "flex",

                  justifyContent: "space-between",

                  alignItems: "center",

                  borderBottom: "1px solid #f1f1f1",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1.5rem",
                  }}
                >
                  {renderCartItemImage(item)}

                  <div>
                    <h3
                      style={{
                        margin: "0 0 0.5rem 0",

                        color: "#2c3e50",

                        fontSize: "1.2rem",
                      }}
                    >
                      {item.name}
                    </h3>

                    <p
                      style={{
                        margin: "0",

                        color: "#7f8c8d",

                        fontSize: "1rem",
                      }}
                    >
                      ${item.price.toFixed(2)}
                    </p>

                    <div
                      style={{
                        marginTop: "0.5rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        disabled={item.quantity === 1}
                        style={{
                          padding: "0.3rem 0.7rem",

                          border: "1px solid #ccc",

                          backgroundColor: "#eee",

                          cursor: "pointer",

                          borderRadius: "4px",
                        }}
                      >
                        −
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() => increaseQuantity(item.id)}
                        style={{
                          padding: "0.3rem 0.7rem",

                          border: "1px solid #ccc",

                          backgroundColor: "#eee",

                          cursor: "pointer",

                          borderRadius: "4px",
                        }}
                      >
                        +
                      </button>
                    </div>

                    <p
                      style={{
                        marginTop: "0.5rem",

                        color: "#2c3e50",

                        fontWeight: "500",

                        fontSize: "1.1rem",
                      }}
                    >
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{
                    backgroundColor: "transparent",

                    color: "#e74c3c",

                    border: "1px solid #e74c3c",

                    padding: "0.5rem 1rem",

                    borderRadius: "4px",

                    cursor: "pointer",

                    fontSize: "0.9rem",

                    transition: "all 0.3s",
                  }}
                  onMouseOver={(e) => handleMouseOver(e, "#e74c3c")}
                  onMouseOut={(e) => handleMouseOut(e)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div
            className="cart-summary"
            style={{
              backgroundColor: "white",

              padding: "1.5rem",

              borderRadius: "8px",

              boxShadow: "0 2px 10px rgba(0,0,0,0.05)",

              position: "sticky",

              bottom: "1rem",
            }}
          >
            <div
              style={{
                display: "flex",

                justifyContent: "space-between",

                alignItems: "center",

                marginBottom: "1.5rem",
              }}
            >
              <h3
                style={{
                  margin: "0",

                  fontSize: "1.3rem",

                  color: "#2c3e50",
                }}
              >
                Order Summary
              </h3>

              <h3
                style={{
                  margin: "0",

                  fontSize: "1.5rem",

                  color: "#2c3e50",
                }}
              >
                ${total.toFixed(2)}
              </h3>
            </div>

            <div
              style={{
                display: "flex",

                gap: "1rem",

                justifyContent: "flex-end",

                flexWrap: "wrap",
              }}
            >
              <button
                onClick={clearCart}
                style={{
                  backgroundColor: "transparent",

                  color: "#e74c3c",

                  border: "1px solid #e74c3c",

                  padding: "0.8rem 1.5rem",

                  borderRadius: "4px",

                  cursor: "pointer",

                  fontSize: "1rem",

                  transition: "all 0.3s",

                  minWidth: "120px",
                }}
                onMouseOver={(e) => handleMouseOver(e, "#e74c3c")}
                onMouseOut={(e) => handleMouseOut(e)}
              >
                Clear Cart
              </button>

              <button
                onClick={() => alert("Proceeding to checkout...")}
                style={{
                  backgroundColor: "#2ecc71",

                  color: "white",

                  border: "none",

                  padding: "0.8rem 1.5rem",

                  borderRadius: "4px",

                  cursor: "pointer",

                  fontSize: "1rem",

                  transition: "background-color 0.3s",

                  minWidth: "180px",
                }}
                onMouseOver={(e) => handleMouseOver(e, "#27ae60")}
                onMouseOut={(e) => handleMouseOut(e, "#2ecc71", "white")}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default Cart;
