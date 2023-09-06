import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Button, Grid, IconButton } from "@mui/material";
import Base from "../components/Base";
import axios from "axios";
import { getuserId } from "../components/Who's_the_User";

function Cart() {
  const [cart, setCart] = useState([]);
  const userId = getuserId();

  // Initialize the quantity for each item to 1
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/products/cart/${userId}`);
        const cartWithDefaultQuantity = response.data.map((item) => ({
          ...item,
          quantity: 1,
        }));
        setCart(cartWithDefaultQuantity);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCart();
  }, [userId]);

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity >= 1) {
      const updatedCart = cart.map((item) => {
        if (item._id === productId) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
      setCart(updatedCart);
    }
  };
const handleRemove = async (productId) => {
    try {
      const response = await axios.delete(`http://localhost:4000/products/cart/${userId}/${productId}`);
      setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
      console.log(response);
      alert('Your selected product has been removed from Cart');
    } catch (error) {
      console.log(error);
    }
  };

  // Calculate total amount based on updated quantities
  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <Base>
      <Division>
        <Grid container spacing={1}>
          <Grid xs={6} md={8}>
            {cart.map((item) => (
              <Card key={item._id}>
                <div className="image">
                  <img src={item.image} alt="image" />

                  <About>
                    <h1 className="title">{item.title}</h1>
                    <div className="price">
                      <span style={{ fontSize: 'large', fontWeight: 'bold' }}>Rs: {item.price}/-</span>
                    </div>
                    <div className="quantity">
                      <IconButton onClick={() => handleQuantityChange(item._id, item.quantity - 1)}>
                        <RemoveIcon />
                      </IconButton>
                      {item.quantity}
                      <IconButton onClick={() => handleQuantityChange(item._id, item.quantity + 1)}>
                        <AddIcon />
                      </IconButton>
                    </div>
                  </About>
                  <div className="removebtn">
                    <Button
                      onClick={() => handleRemove(item._id)}
                      variant="contained"
                      style={{ display: 'flex', margin: '0 auto', marginTop: '5px', color: 'whitesmoke', backgroundColor: 'red' }}
                    >
                      Remove from Cart
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </Grid>
          <Grid
            className="checkout"
            style={{
              marginTop: "1rem",
              borderRadius: "10px",
            }}
            xs={6}
            md={4}
            
          >
            <Grid2 className="Grid2">
            <HeaderTitle className="title" style={{ textAlign: "center" }}>
              CHECKOUT
            </HeaderTitle>
            <div className="proceed">
              <div className="head1">Total Amount to Checkout</div>
              {cart.map((item, idx) => (
                <div key={idx} className="description">
                  {item.quantity}x {item.title} : Rs {item.price * item.quantity}/-
                </div>
              ))}
              <hr />
            </div>
            <div className="pre-payment">
              <div className="subtotal">SubTotal: {totalAmount}/-</div>
              <div className="button">
                <Button
                  style={{ color: "whitesmoke", backgroundColor: "#252525" }}
                  variant="contained"
                >
                  Proceed to Pay
                </Button>
              </div>
            </div>
            </Grid2>
            
          </Grid>
        </Grid>
      </Division>
    </Base>
  );
}

export default Cart;




const Division = styled.div`
  height: 100%;

  .pre-payment {
    margin-top: auto;
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    justify-content: center;
    align-items: center;
  }

  hr {
    width: 100%;
    margin-top: 1rem;
    background-color: #252525;
    margin-left: auto;
    margin-right: auto;
  }

  .button {
    display: flex;
    color: whitesmoke !important;
    background-color: #252525 !important;
  }

  .proceed {
    font-size: larger;
    font-weight: 500;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .description {
    display: flex;
    font-size: large;

    flex-direction: column;
  }
`;

const Card = styled.div`

  width: 300px;
  /* border: 2px solid #252525; */
  margin: 2rem;
  border-radius: 10px;
  -webkit-box-shadow: 7px 4px 39px 5px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 7px 4px 39px 5px rgba(0, 0, 0, 0.75);
  box-shadow: 7px 4px 39px 5px rgba(0, 0, 0, 0.75);

  .image {
    /* border: 1px solid yellow; */
    
    padding: 1rem;
  }

  img {
    width: 50%;
    display: flex;
    margin: 0 auto;
    justify-content: center;
  }
`;

const About = styled.div`
  margin-top: 5px;

  .title {
    text-align: center;
  }
  .price {
    margin-top: 2rem;

    text-align: center;
  }
  .quantity {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;
    gap: 5px;
  }
`;

const HeaderTitle = styled.h2`
  font-family: "Prompt", sans-serif;
`;


const Grid2 = styled.div`
height: 40%;
display: flex;
padding: 10px;
text-align: center;
flex-direction: column;
-webkit-box-shadow: 7px 4px 39px 5px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 7px 4px 39px 5px rgba(0, 0, 0, 0.75);
  box-shadow: 7px 4px 39px 5px rgba(0, 0, 0, 0.75);
`