import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { RootState } from "../Store/reduxStore";

const FavoritePokemon = () => {
  const favoritePokemon = useSelector(
    (state: RootState) => state.favoritesPokemon
  );
  console.log(favoritePokemon);

  if (favoritePokemon.length === 0) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <h1 style={{ color: "rgb(159, 172, 185)" }}>
          You don't have any favorite Pokemon yet
        </h1>
      </div>
    );
  }
  return (
    <div style={{ margin: "20px" }}>
      <h1
        style={{
          textAlign: "center",
          marginBottom: "20px",
          marginTop: "20px",
          color: "rgb(159, 172, 185)",
          fontSize: "40px",
          fontStyle: "italic",
          textDecoration: "underline",
        }}
      >
        Favorite Pokemon
      </h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {favoritePokemon.map((pokemon) => (
          <Card
            sx={{ maxWidth: 345 }}
            key={pokemon.name}
            style={{ margin: "10px", padding: "10px" }}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={pokemon.image}
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {pokemon.name}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FavoritePokemon;
