import { Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router";

interface Pokemon {
  name: string;
  sprites: {
    other: {
      dream_world: {
        front_default: string;
      };
    };
  };
}

const PokemonCard = ({ pokemon }: { pokemon: Pokemon }) => {
  return (
    <>
      <Card sx={{ maxWidth: 345, padding: "5px", margin: "10px" }}>
        <CardActionArea>
          <CardMedia
            component="img"
            width="100%"
            image={pokemon.sprites.other.dream_world.front_default}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {pokemon.name}
            </Typography>
          </CardContent>
        </CardActionArea>
        <Link to={`/detailedPokemon/${pokemon.name}`}>
          <Button variant="contained" style={{ margin: "10px" }} type="submit">
            View Details
          </Button>
        </Link>
      </Card>
    </>
  );
};

export default PokemonCard;
