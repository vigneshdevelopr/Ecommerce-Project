import React, { useState } from "react";
import { styled } from "styled-components";
import BrandLogo from "../assets/brandlogo.png";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Loading from "../components/Loading";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function Register() {
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
const[loading, setLoading]=useState(true);
useEffect(() => {
  setTimeout(() => setLoading(false), 1000)
}, [])
  const[values, setValues]=useState({
    email:"",
    username: "",
    password: "",
    confirmpassword: ""
})

  const{
    email,username,password,confirmpassword
  }=values
  const handleChange = (name)=>(event)=>{
const value = event.target.value;
setValues({...values,[name]:value})
console.log(value)
}

  



  const history = useNavigate();

//api fetching:

const addUser = async() =>{
  try {
    const newData = {
      email,
      username,
      password
    }
    const response = await fetch('https://townbazzarserver.up.railway.app/users/add',{
      method:'POST',
      body:JSON.stringify(newData),
      headers:{
        'Content-Type':'application/json'
      }
    })
    const data = await response.json();
    console.log(data);
     if(data){
       toast.success(`hey ${values.username}, welcome to Town Bazzar`,toastify)
    }
    setValues({
      email:"",
      username:"",
      password:"",
      confirmpassword:""
    })
  } catch (error) {
    toast.error('You got an error', toastify)
  }
}


  return (
    <div>
{loading === false ? ( 
  <div>
      <Container>
      <ArcArea>
        <Logo>
          <img className="logo" src={BrandLogo} alt="Brand Logo" />
        </Logo>
        <Form>
        <input
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            onChange={handleChange("email")}
          />
          <input
            type="string"
            name="username"
            value={username}
            placeholder="username"
            onChange={handleChange("username")}
          />
          <input
            type="password"
            name="password"
            onChange={handleChange("password")}
            value={password}
            placeholder="password"
          />
          <input
            type="password"
            name="confirmpassword"
            value={confirmpassword}
            placeholder="Confirm Password"
            onChange={handleChange("confirmpassword")}
          />
          <button onClick={addUser} type="submit"><span style={{fontSize:'larger',fontWeight:'bold', color: '#252525'}}>Register</span></button>
<h5 style={{textAlign:'center'}}>          By continuing, you agree to TownBazzar's Conditions of Use and Privacy Notice.
</h5>
        </Form>
        <h5 style={{ textAlign: "center" }}>Already Have an Account ?</h5>
        <p className="createnewaccount" onClick={() => history("/")}>Login</p>
      </ArcArea>

    </Container> 
              <ToastContainer />
              </div>

    ): (
      <Loading />
    )}

    </div>
    
  );
}

export default Register;

const Container = styled.div`

  width: 100%;
  height: 100%;
  font-family: "Marcellus", serif;
  font-size: larger;
  color: whitesmoke;
  /* border: 2px solid black; */
  display: flex;
  justify-content: center;

  background: url("https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c2hvcHBpbmd8ZW58MHx8MHx8fDA%3D&w=1000&q=80");
  background-repeat: no-repeat;
  background-size: cover;
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
    &:hover{
border-color: #F7CA00;
    }
  }
  button {
    margin-top: 30px !important;
    padding: 10px 30px !important;
    background-color: #F7CA00;
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

  .createnewaccount{
    display: flex;
    justify-content: center;
    align-items: center;
    /* border: 1px solid white; */
    background-color: #F7CA00;
    color: #252525;
    border-radius: 9px;
    height:3rem;
    
  }
`;
