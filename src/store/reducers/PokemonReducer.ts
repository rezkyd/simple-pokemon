import { IPokemon, PokemonPagination } from "../../shared/model/PokemonModel";
import {
  POKEMON_LOADING,
  POKEMON_LIST,
  POKEMON_DETAIL,
  POKEMON_FAIL,
  PokemonDispatchTypes,
} from "../actions/PokemonActions";

interface IPokemonState {
  loading: boolean;
  pokemons?: PokemonPagination;
  pokemonDetail?: IPokemon;
}

const initalState: IPokemonState = {
  loading: false,
  pokemons: undefined,
  pokemonDetail: undefined,
};

const pokemonReducer = (
  state: IPokemonState = initalState,
  action: PokemonDispatchTypes
): IPokemonState => {
  switch (action.type) {
    case POKEMON_LOADING:
      return {
        ...state,
        loading: true,
      };
    case POKEMON_LIST:
      return {
        ...state,
        loading: false,
        pokemons: action.payload,
      };
    case POKEMON_DETAIL:
      return {
        ...state,
        loading: false,
        pokemonDetail: action.payload,
      };
    case POKEMON_FAIL:
      return {
        ...state,
        loading: false,
      };
    default: {
      return state;
    }
  }
};

export default pokemonReducer;
