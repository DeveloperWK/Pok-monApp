import { createSlice } from "@reduxjs/toolkit";

interface Pokemon {
  name: string;
  image: string;
  [key: string]: string | number | boolean | undefined | object;
 
}
const favoritesSlice = createSlice({
  name: "favoritesPokemon",
  initialState: [] as Pokemon[],
  reducers: {
    addFavorite: (state, action: { payload: Pokemon }) => {
      const favoritePokemon = state.find(
        (pokemon) => pokemon.name === action.payload.name
      );
      if (favoritePokemon) {
        return;
      } else {
        state.push(action.payload);
      }

      return state;
    },
    removeFavorite: (state, action: { payload: string }) => {
      return state.filter((item) => item.name !== action.payload);
    },
  },
});
export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice;
export type RootState = ReturnType<typeof favoritesSlice.reducer>;
