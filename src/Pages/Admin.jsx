import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Container, Paper, Grid, Button, IconButton } from '@mui/material';
import styled from 'styled-components';
import Base from '../components/Base';
import { useNavigate } from 'react-router-dom';
import { Mail, Phone, SupportAgent } from '@mui/icons-material';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import { blue } from '@mui/material/colors';


const emails = ['support@townbazzar.com'];

function SimpleDialog(props) {
    const { onClose, selectedValue, open } = props;
  
    const handleClose = () => {
      onClose(selectedValue);
    };
  
    const handleListItemClick = (value) => {
      onClose(value);
    };
        const handleMailToSupport = () => {
          const email = "support@townbazzar.com";
          const subject = "Support Request"; 
          const body = "";
                const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                window.open(mailtoLink, "_blank")
                

          return (
            <div>
              <button onClick={handleMailToSupport}>Mail to Support</button>
            </div>
          );
        };

        const handleCallPhoneNumber = () => {
           const phoneNumber= '+91-7428730894'
            const telLink = `tel:${phoneNumber}`;
        
            window.location.href = telLink;
          };
      
       
        
  
    return (
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Customer Support</DialogTitle>
        <List sx={{ pt: 0 }}>
          {emails.map((email) => (
            <ListItem disableGutters key={email}>
              <ListItemButton onClick={handleMailToSupport}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                    <Mail />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={email} />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem disableGutters>
            <ListItemButton
              autoFocus
              onClick={handleCallPhoneNumber}
>
                <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  <Phone />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="+91-7428730894" />
            </ListItemButton>
          </ListItem>
        </List>
      </Dialog>
    );
  }
  
  SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
  };
  
const AdminContainer = styled.div`
  background-color: #f5f5f5;
  min-height: 100vh;
`;



const StyledPaper = styled(Paper)`
  padding: 16px;
  margin-bottom: 20px;
`;

const Admin = ({loginUser, setLoginUser}) => {
   const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  console.log(loginUser);

  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };
  return (
    <Base>
        <Toolbar>
          <Typography variant="h6">Admin Dashboard</Typography>
        </Toolbar>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <StyledPaper elevation={3}>
              <Typography variant="h5">Username</Typography>
              Hi, {loginUser.username}
            </StyledPaper>
          </Grid>
          <Grid item xs={12}>
            <StyledPaper elevation={3}>
              <Typography variant="h5">Order Management</Typography>

              <Button variant='contained' style={{marginTop:'1rem',backgroundColor:'lightgreen',color:'#252525',fontWeight:'bold'}}onClick={()=>navigate('/orders')}>Go to Your Orders</Button>
            </StyledPaper>
          </Grid>

          <Grid item xs={12}>
            <StyledPaper elevation={3}>
              <Typography variant="h5">Customer Support</Typography>
             <div>
                <IconButton onClick={handleClickOpen}>
                    <SupportAgent />
                </IconButton>
                <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
             </div>
            </StyledPaper>
          </Grid>
        </Grid>
      </Container>
    </Base>
  );
};

export default Admin;
