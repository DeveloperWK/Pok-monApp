import { createBrowserRouter } from "react-router";

import GeminiChat from "../Components/GeminiChat";
import DetailedPokemon from "../Pages/DetailedPokemon";
import ErrorHandle from "../Pages/ErrorHandle";
import FavoritePokemon from "../Pages/FavoritePokemon";
import Home from "../Pages/Home";
import Root from "../Root/Root";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorHandle />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/detailedPokemon/:name",
        element: <DetailedPokemon />,
      },
      {
        path: "/favoritePokemon",
        element: <FavoritePokemon />,
      },
      {
        path: "/KnowPokemonWithAI",
        element: <GeminiChat />,
      },
    ],
  },
]);

export default Router;
