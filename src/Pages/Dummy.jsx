import React from 'react'
import { styled } from 'styled-components'

function Dummy() {
    function RandomChange(){
        const arr = ["Vignesh", "kishore", "anitha", "santhosh_Priya" ]
        const random = Math.floor(Math.random()*4)
        return arr[random]
    }
  return (
<Main>
    <Header>
        Hey {RandomChange()}, Welcome to Town Bazzar !
    </Header>
</Main>
    )
}

export default Dummy
const Main = styled.div`
background-color: cornsilk;
    display: flex;
    height: 99vh;
    border: 1px solid transparent;
    justify-content: center;
align-items: center;

`

const Header = styled.h1`
text-align: center;

`