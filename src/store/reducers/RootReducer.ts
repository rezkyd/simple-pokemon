import { combineReducers } from "redux";
import myPokemonReducer from "./MyPokemonReducer";
import pokemonReducer from "./PokemonReducer";

const RootReducer = combineReducers({
  pokemon: pokemonReducer,
  myPokemon: myPokemonReducer,
});

export default RootReducer;
