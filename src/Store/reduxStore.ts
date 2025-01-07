import { configureStore } from "@reduxjs/toolkit";
import favoritesSlice from "../Features/favoritesSlice";

const store = configureStore({
  reducer: {
    favoritesPokemon: favoritesSlice.reducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
