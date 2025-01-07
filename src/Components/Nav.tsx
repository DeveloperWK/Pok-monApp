import React from "react";
import { Link } from "react-router";
import pokemonLogo from "../assets/pokemon.svg";
const Nav: React.FC = () => {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "3em",
        padding: "0 1em",
        backgroundColor: "rgb(159, 172, 185)",
        color: "#333",
        fontSize: "1.2em",
      }}
    >
      <div>
        <Link to="/">
          <img src={pokemonLogo} alt="pokemonLogo" width={"150px"} />
        </Link>
      </div>
      <div>
        <Link to="/" style={{ marginRight: "1em" }}>
          Home
        </Link>
        <Link to="/favoritePokemon" style={{ marginRight: "1em" }}>
          Favorites
        </Link>
        <Link to="/KnowPokemonWithAI">KnowPokemonWithAI</Link>
      </div>
    </nav>
  );
};

export default Nav;
