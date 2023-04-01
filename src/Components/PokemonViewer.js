import { useEffect, useState, useMemo } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Masonry from '@mui/lab/Masonry';
import Button from '@mui/material/Button';
import Grid2 from '@mui/material/Unstable_Grid2';
import debounce from 'lodash.debounce';
import { endpoints } from '../endpoints';
import PokemonCard from './PokemonCard';

function PokemonViewer() {
  const [pokemonList, setPokemonList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchPokemonList = () => {
    fetch(`${endpoints["GET_POKEMONS"]}?offset=${offset}&limit=20`)
      .then(res => res.json())
      .then(data => {
        let tempList = [...pokemonList, ...data['results']];
        setPokemonList(tempList);
        setOffset(tempList.length);
        setLoading(false);
      });
  };

  const debouncedFetcher = useMemo(() => debounce(fetchPokemonList, 1000));

  useEffect(() => {
    debouncedFetcher();
  }, []);

  return (
    <>
      <Grid2 container spacing={2}>
        <Grid2 xs={12} display="flex" justifyContent="center" alignItems="center">
          {pokemonList.length > 0 &&
            <Masonry columns={4} spacing={4}>
              {pokemonList.map((item, index) => (
                <PokemonCard key={index} name={item.name} url={item.url} />
              ))}
            </Masonry>
          }
        </Grid2>
        <Grid2 xs={12} display="flex" justifyContent="center" alignItems="center">
          {loading &&
            <CircularProgress />
          }
        </Grid2>
        <Grid2 xs={12} display="flex" justifyContent="center" alignItems="center">
          <Button
            variant="contained"
            style={{ backgroundColor: "#ffde00", color: "black" }}
            onClick={() => {
              setLoading(true);
              debouncedFetcher();
            }}
          >Load More!
          </Button>
        </Grid2>
        <Grid2 xs={12} display="flex" justifyContent="center" alignItems="center">
          &nbsp;
        </Grid2>
      </Grid2>
    </>
  );
}

export default PokemonViewer;
