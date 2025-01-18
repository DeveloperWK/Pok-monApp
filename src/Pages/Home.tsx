import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, ButtonGroup, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";
import PokemonCard from "../Components/PokemonCard";

const Home: React.FC = () => {
  interface Pokemon {
    name: string;
    url: string;
    sprites: {
      other: {
        dream_world: {
          front_default: string;
        };
      };
    };
  }

  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [prevUrl, setPrevUrl] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [home, setHome] = useState(false);
  const API_URL = "https://pokeapi.co/api/v2/pokemon";
  const fetchPokemon = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const detailedPokemon = data.results.map(
        async ({ url }: { url: string }) => {
          const res = await fetch(url);
          const data = await res.json();
          return data;
        }
      );

      const detailedPokemonData = await Promise.all(detailedPokemon);

      setPokemon(detailedPokemonData);
      setNextUrl(data.next);
      setPrevUrl(data.previous);
    } catch (error) {
      setError(`Failed to fetch data ${error}`);
      setLoading(false);
    } finally {
      setLoading(false);
      setHome(false);
    }
  };
  const handleNextPage = async () => {
    if (nextUrl) {
      setLoading(true); // Set loading to true before fetching
      try {
        const response = await fetch(nextUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        const detailedPokemon = data.results.map(
          async ({ url }: { url: string }) => {
            const res = await fetch(url);
            const data = await res.json();

            return data;
          }
        );
        const detailedPokemonDataNext = await Promise.all(detailedPokemon);
        setPokemon(detailedPokemonDataNext);

        setNextUrl(data.next);
        setPrevUrl(data.previous);
      } catch (error) {
        console.error("Error fetching next page:", error);
        setError("Error loading next page");
      } finally {
        setLoading(false); // Set loading to false after fetching (success or error)
      }
    }
  };

  const handlePrevPage = async () => {
    if (prevUrl) {
      setLoading(true); // Set loading to true before fetching

      try {
        const response = await fetch(prevUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const detailedPokemon = data.results.map(
          async ({ url }: { url: string }) => {
            const res = await fetch(url);
            const data = await res.json();

            return data;
          }
        );

        const detailedPokemonData = await Promise.all(detailedPokemon);
        setPokemon(detailedPokemonData);
        setNextUrl(data.next);
        setPrevUrl(data.previous);
      } catch (error) {
        console.error("Error fetching previous page:", error);
        setError("Error loading previous page");
      } finally {
        setLoading(false); // Set loading to false after fetching (success or error)
      }
    }
  };
  useEffect(() => {
    fetchPokemon();
  }, []);
  useEffect(() => {
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
  }, [loading, error]);

  const searchHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    // const filteredPokemon = pokemon.filter((poke) =>
    //   poke.name.toLowerCase().includes(search.toLowerCase())
    // );
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${search}`);
    if (!response.ok) {
      toast.warn(`${search} Pokemon not found`, {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });

      setSearch("");
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const filteredPokemon = [data];
    setPokemon(filteredPokemon);
    setSearch("");
    setLoading(false);
    setHome(true);
  };
  // if (error) {
  //   toast.error(" ❌ Pokemon not found", {
  //     position: "top-right",
  //     autoClose: 5000,
  //     hideProgressBar: false,
  //     closeOnClick: false,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     theme: "light",
  //     transition: Bounce,
  //   });
  // }

  return (
    <>
      <form
        style={{ display: "flex", justifyContent: "center", margin: "10px" }}
        onSubmit={searchHandler}
      >
        <TextField
          id="outlined-basic"
          label="search pokemon"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button variant="contained" style={{ margin: "10px" }} type="submit">
          Search
        </Button>
      </form>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "10px",
          padding: "10px",
        }}
      >
        {!loading &&
          !error &&
          pokemon.map((poke) => <PokemonCard key={poke.name} pokemon={poke} />)}
      </div>
      <ButtonGroup
        disableElevation
        variant="contained"
        style={{ display: "flex", justifyContent: "center", margin: "10px" }}
      >
        <Button onClick={() => handlePrevPage()} disabled={!prevUrl}>
          <i>
            <FontAwesomeIcon icon={faArrowLeft} />
          </i>
          Previous Page{" "}
        </Button>

        <Button onClick={() => handleNextPage()} disabled={!nextUrl}>
          Next Page{" "}
          <i>
            <FontAwesomeIcon icon={faArrowRight} />
          </i>
        </Button>
      </ButtonGroup>
      {home && (
        <Button
          variant="contained"
          style={{ display: "flex", justifyContent: "center", margin: "10px" }}
          onClick={fetchPokemon}
        >
          Home
        </Button>
      )}
    </>
  );
};

export default Home;
