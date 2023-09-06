import { useEffect, useState } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Skeleton,
  Typography,
  Button,
} from "@mui/material";
import { styled } from "styled-components";
import axios from "axios";
import { getuserId } from "./Who's_the_User";

const userId = getuserId();

function Media() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  // const[cart,setCart]=useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:4000/products", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const prodData = await response.json();
        console.log(prodData);
        setData(prodData);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  //add to cart:

  const addtoCart = async (prodId) => {
    try {
      const response = await axios.put("http://localhost:4000/products/cart", {
        prodId,
        userId,
      });
      alert("Product added to cart");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid container spacing={3}>
      {loading || data.length === 0
        ? Array.from(new Array(8)).map((_, index) => (
            <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
              <Skeleton variant="rectangular" width="100%" height={320} />
            </Grid>
          ))
        : data.map((item, index) => (
            <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
              <StyledCard>
                <CardMedia
                  component="img"
                  alt="product"
                  height="230"
                  style={{ width: "200px", margin: "0 auto" }}
                  image={item.image}
                />
                <CardContent>
                  <Typography
                    style={{ fontSize: "1.5ch", fontWeight: "bold" }}
                    variant="h6"
                    component="div"
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{
                      color: "yellow",
                      backgroundColor: "#252525",
                      fontWeight: "bold",
                      fontSize: "large",
                      borderRadius: "10px",
                      margin: "5px",
                    }}
                  >
                    Rs: {item.price}/-
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Rating: {item.rating}/5
                  </Typography>
                </CardContent>
                <CardActions>
                  <StyledButton
                    onClick={() => addtoCart(item._id)}
                    className="cartbtn"
                    size="small"
                  >
                    Add to Cart
                  </StyledButton>
                </CardActions>
              </StyledCard>
            </Grid>
          ))}
    </Grid>
  );
}

function Cards() {
  return (
    <Container>
      <Media />
    </Container>
  );
}

export default Cards;

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100% !important;
`;

const StyledCard = styled(Card)`
  background-color: whitesmoke !important;
  height: 100%;
  max-width: 250px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 0 auto;
  -webkit-box-shadow: 4px 17px 18px -2px rgba(0, 0, 0, 0.68) !important;
  -moz-box-shadow: 4px 17px 18px -2px rgba(0, 0, 0, 0.68) !important;
  box-shadow: 4px 17px 18px -2px rgba(0, 0, 0, 0.68) !important;
`;

const StyledButton = styled(Button)`
  display: flex !important;
  margin: 0 auto !important;
  background-color: #252525 !important;
  color: #ffffff !important;
  font-weight: bold;
  &:hover {
    background-color: whitesmoke !important;
    color: #252525 !important;
    cursor: pointer;
  }
`;
