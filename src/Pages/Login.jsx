import {useState } from "react";
import { styled } from "styled-components";
import BrandLogo from "../assets/brandlogo.png";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const LoadingSpinner = () => (
  <SpinnerContainer>
    <Spinner />
  </SpinnerContainer>
);
function Login() {
  const toastify = {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  };
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const { email, password } = values;
  const [loading, setLoading] = useState(false);
  const history = useNavigate();
  //handleChange:
  const handleChange = (name) => (event) => {
    const value = event.target.value;
    setValues({ ...values, [name]: value });
    // console.log(values);
  };

  const LoginUser = async () => {
    const newData = {
      email,
      password,
    };
    try {
      setLoading(true);
      const response = await fetch("https://townbazzarserver.up.railway.app/signin", {
        method: "POST",
        body: JSON.stringify(newData),
        headers: {
          "content-type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      if (response.status === 401) {
        toast.warning("Invalid Credentials", toastify);
      } else if (response.status === 404) {
        toast.warning("User not found", toastify);
      }
      if (response.status === 200) {
        toast.success("Login Successful", toastify);
        await history("/home");
        window.location.reload()
        window.localStorage.setItem("userId", data.userID);
     
      }
      setValues({
        email: "",
        password: "",
      });
    } catch (error) {
      console.log(error.message);
      toast.error("Error Found on Login", toastify);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <Container>
  <ArcArea>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <>
              <Logo>
                <img className="logo" src={BrandLogo} alt="Brand Logo" />
              </Logo>
              <Form>
                <input
                  className="input"
                  onChange={handleChange("email")}
                  name="email"
                  value={email}
                  type="email"
                  placeholder="email"
                />
                <input
                  onChange={handleChange("password")}
                  name="password"
                  className="input"
                  value={password}
                  type="password"
                  placeholder="password"
                />
                <button onClick={LoginUser}>
                  <span
                    style={{
                      fontSize: "larger",
                      fontWeight: "bold",
                      color: "#252525",
                    }}
                  >
                    Login
                  </span>
                </button>
                <h5 style={{ textAlign: "center" }}>
                  {" "}
                  By continuing, you agree to TownBazzar Conditions of Use and
                  Privacy Notice.
                </h5>
              </Form>
              <h5 style={{ textAlign: "center" }}>Dont Have an account ?</h5>
              <p
                className="createnewaccount"
                onClick={() => history("/register")}
              >
                create a new account
              </p>
            </>
          )}
        </ArcArea>
      </Container>
      <ToastContainer />
    </div>
  );
}

export default Login;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  font-family: "Marcellus", serif;
  font-size: larger;
  color: whitesmoke;
  /* border: 2px solid black; */
  display: flex;
  justify-content: center;

  background: url("https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c2hvcHBpbmd8ZW58MHx8MHx8fDA%3D&w=1000&q=80");
  background-repeat: no-repeat;
  background-size: cover;

  .input {
    background-color: beige;
    outline-width: 0;
  }
`;
const Logo = styled.div`
  padding: 20px;
  /* border: 2px solid darkgray; */
  text-align: center;

  img {
    height: 90px;
    background-color: #e76b6b;
    border-radius: 9px;
    /* border: 2px solid darkcyan; */
  }
`;
const Form = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  margin: 0 auto;

  input {
    display: flex;
    margin-top: 10px;
    padding: 10px;
    border-color: transparent;
    border-radius: 8px;
  }
  button {
    margin-top: 30px !important;
    padding: 10px 30px !important;
    background-color: #f7ca00;
    border: none;
    border-radius: 9px;
    width: fit-content;
    display: flex;
    margin: 0 auto;
    padding: 8px;
    &:hover {
      cursor: pointer;
      background-color: #e9da9a;
    }
  }
`;
const ArcArea = styled.div`
  /* border: 2px solid white; */
  width: 8cm;
  display: flex;
  flex-direction: column;
  padding: 2cm;
  justify-content: center;
  margin: 20px 0;
  border-radius: 10px;
  background-color: black;
  opacity: 80%;

  p {
    text-align: center;
    color: whitesmoke;
    text-decoration: none;
    margin: 10px;

    &:hover {
      cursor: pointer;
    }
  }

  .createnewaccount {
    display: flex;
    justify-content: center;
    align-items: center;
    /* border: 1px solid white; */
    background-color: #f7ca00;
    color: #252525;
    border-radius: 9px;
    height: 3rem;
  }
`;
const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Spinner = styled.div`
  border: 5px solid rgba(0, 0, 0, 0.1);
  border-top: 5px solid #fff;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
