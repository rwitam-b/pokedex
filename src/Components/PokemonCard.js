import { useEffect, useState, memo, useMemo } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import debounce from 'lodash.debounce';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { endpoints } from '../endpoints';

const pokemonColors = {
    palette: {
        black: {
            main: "#000000",
            contrastText: '#fff'
        },
        blue: {
            main: "#0000FF",
            contrastText: '#fff'
        },
        brown: {
            main: "#a52a2a",
            contrastText: '#fff'
        },
        gray: {
            main: "#808080",
            contrastText: '#fff'
        },
        green: {
            main: "#008000",
            contrastText: '#fff'
        },
        pink: {
            main: "#ffc0cb",
            contrastText: '#000000'
        },
        purple: {
            main: "#800080",
            contrastText: '#fff'
        },
        red: {
            main: "#ff0000",
            contrastText: '#fff'
        },
        white: {
            main: "#ffffff",
            contrastText: '#000000'
        },
        yellow: {
            main: "#ffff00",
            contrastText: '#000000'
        }
    }

};

function getRandomItem(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    const item = arr[randomIndex];
    return item;
}

function PokemonCard({ name, url, ...props }) {
    const [loading, setLoading] = useState(true);
    const [pokemonImage, setPokemonImage] = useState("");
    const [pokemonFunFact, setPokemonFunFact] = useState("");
    const [pokemonData, setPokemonData] = useState(null);
    const [pokemonTypeColor, setPokemonTypeColor] = useState("white");
    const theme = createTheme(pokemonColors);

    const fetchPokemonData = () => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setPokemonData(data);
                if (data.sprites && "other" in data.sprites && "official-artwork" in data.sprites.other) {
                    setPokemonImage(data.sprites.other["official-artwork"]["front_default"]);
                } else {
                    setPokemonImage(data['sprites']['front_default']);
                }

                // Fetch further metadata
                fetch(`${endpoints["GET_SPECIES"]}/${data.id}`)
                    .then(res => res.json())
                    .then(data => {
                        setPokemonTypeColor(data.color.name);
                        let flavour_texts = data.flavor_text_entries.filter(e => e.language.name == "en");
                        setPokemonFunFact(getRandomItem(flavour_texts).flavor_text);
                    });
                setLoading(false);
            });
    };

    const debouncedFetcher = useMemo(() => debounce(fetchPokemonData, 200));

    // Get Pokemon Data
    useEffect(() => {
        debouncedFetcher();
    }, []);

    return (
        <>
            <Card
                sx={{ maxWidth: 300 }}
                raised={true}
                style={{
                    border: `1px solid ${pokemonTypeColor}`,
                    backgroundColor: "rgba(100, 100, 100, 0.2)"
                }}
            >
                <CardMedia
                    component="img"
                    alt={name}
                    width="200"
                    image={pokemonImage}
                />
                <Divider />
                <CardContent>
                    {loading &&
                        <CircularProgress />
                    }
                    {!loading &&
                        <>
                            <Typography gutterBottom variant="h5" component="div">
                                {name}
                            </Typography>
                            <ThemeProvider theme={theme}>
                                {pokemonData.types.map((elem, index) => {
                                    let contrastColor = pokemonColors.palette[pokemonTypeColor].contrastText;
                                    return (
                                        <Chip
                                            key={index}
                                            label={elem.type.name}
                                            variant="outlined"
                                            size="small"
                                            color={pokemonTypeColor}
                                            style={{
                                                margin: "0px 5px 5px 0px",
                                                backgroundColor: contrastColor
                                            }}
                                        />
                                    )
                                })}
                            </ThemeProvider>
                            <br /><br />
                            <Typography variant="body2" color="text.secondary">
                                {pokemonFunFact}
                            </Typography>
                        </>
                    }
                </CardContent>
            </Card>
        </>
    );
}

const MemoPokemonCard = memo(function MemoPokemonCard({ name, url, ...props }) {
    return PokemonCard({ name, url, ...props });
});

export default MemoPokemonCard;