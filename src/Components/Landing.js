import Container from '@mui/material/Container';
import PokemonViewer from './PokemonViewer';
import Divider from '@mui/material/Divider';

function Landing() {
  return (
    <Container fixed className='pokedexBase'>
      <div className="App">
        <br />
        <img src="Pokédex_logo.png" />
        <br />
        <Divider />
        <br />
      </div >
      <PokemonViewer />
    </Container>
  );
}

export default Landing;
