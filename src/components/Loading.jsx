import React from 'react'
import { styled } from 'styled-components'
import LoadingImage from '../assets/loading.gif'

function Loading() {
  return (
    <Container>
<Image src={LoadingImage} alt='LoadingImage' /> 
    </Container>
  )
}

export default Loading


const Container = styled.div`
    
 width: 100vw;
 height: 100vh;

`
const Image = styled.img`
display: flex;
justify-content: center;
height: 100%;
width: 100%;
`
