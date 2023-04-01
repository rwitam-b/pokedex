import { useEffect, useState } from 'react';
import { Outlet } from "react-router-dom";
import Container from '@mui/material/Container';
import PokemonViewer from './PokemonViewer';
import Divider from '@mui/material/Divider';


function Landing() {
  return (
    <Container fixed>
      <div className="App">
        <br />
        <img src="Pokédex_logo.png" />
        <br />
        <Divider />
        <br/>
      </div >      
      <PokemonViewer />
    </Container>
  );
}

export default Landing;
