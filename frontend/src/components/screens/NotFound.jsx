import React from 'react';
import styled from "@emotion/styled";



export const NotFound = () => {
    return(
    <Wrapper>
        <ErrorWrapper>Lo siento! Página no encontrada</ErrorWrapper>
        <ButtonBack>Volver al inicio</ButtonBack>
    </Wrapper>
    )
}


const ErrorWrapper = styled.h1`
      padding-left: 14em;
    padding-top: 5em;
    padding-bottom: 1em;
    color: gray;
    display: flex;
        text-shadow: 1px 2px black;
`
const Wrapper = styled.div`
      display: grid;
    padding-bottom: 16em;
`

const ButtonBack = styled.button`
        width: 10em;
    justify-self: center;
        border: none;
    border-radius: 15px;
    background-color: lightblue;
    font-weight: bold;
`
export default NotFound;
