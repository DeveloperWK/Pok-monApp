import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { Bounce, toast } from "react-toastify";
import { addFavorite } from "../Features/favoritesSlice";

const DetailedPokemon = () => {
  const dispatch = useDispatch();
  const { name } = useParams<{ name: string }>();
  interface Pokemon {
    id: number;
    name: string;
    sprites: {
      other: {
        dream_world: {
          front_default: string;
        };
      };
    };
    types: { type: { name: string } }[];
    height: number;
    weight: number;
    stats: { base_stat: number }[];
    base_experience: number;
    abilities: { ability: { name: string } }[];
  }

  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const API_URL = `https://pokeapi.co/api/v2/pokemon/${name}`;

  const fetchPokemon = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);

      const data = await response.json();

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setPokemon(data);

      setLoading(false);
    } catch (error) {
      setError(`Failed to fetch data ${error}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, [name]);
  if (loading) {
    toast(" 🌐 Loading... Please wait !", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  }
  if (error) {
    toast.error(" ❌ Pokemon not found", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  }
  return (
    <div>
      {!loading && !error && (
        <div
          style={{
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            backgroundColor: "#fff",
            maxWidth: "800px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <li key={pokemon?.id} style={{ listStyleType: "none" }}>
            <figure>
              <img
                src={pokemon?.sprites?.other?.dream_world?.front_default}
                alt={pokemon?.name}
              />
            </figure>
            <h1>{pokemon?.name}</h1>
            <div style={{ fontWeight: "bold" }}>
              <p>
                {" "}
                <span>Types:</span>
                {pokemon?.types
                  ?.map((type: { type: { name: string } }) => type.type.name)
                  .join(", ")}
              </p>
            </div>
            <div className="grid-three-cols">
              <p className="pokemon-info">
                <span> Height:</span> {pokemon?.height}
              </p>
              <p className="pokemon-info">
                <span> Weight:</span> {pokemon?.weight} kg
              </p>
              <p className="pokemon-info">
                <span> speed:</span> {pokemon?.stats?.[5].base_stat}
              </p>
            </div>
            <div className="grid-three-cols">
              <div className="pokemon-info">
                <p>
                  {" "}
                  <span> Experience:</span>
                  {pokemon?.base_experience}
                </p>
              </div>
              <div className="pokemon-info">
                <p>
                  {" "}
                  <span>Attack:</span>
                  {pokemon?.stats?.[0].base_stat}
                </p>
              </div>
              <div className="pokemon-info">
                <p>
                  {" "}
                  <span> Abilities: </span>
                  {pokemon?.abilities
                    ?.map((abilityInfo) => abilityInfo.ability.name)
                    .slice(0, 1)
                    .join(", ")}
                </p>
              </div>
            </div>
          </li>
          <Button
            variant="contained"
            style={{ margin: "10px" }}
            onClick={() => {
              dispatch(
                addFavorite({
                  name: pokemon?.name || "",
                  image: pokemon?.sprites.other.dream_world.front_default ?? "",
                })
              );
              toast.success(" ✅ Pokemon saved to Favorites", {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
              });
            }}
          >
            Save Pokemon
          </Button>
        </div>
      )}
    </div>
  );
};

export default DetailedPokemon;
