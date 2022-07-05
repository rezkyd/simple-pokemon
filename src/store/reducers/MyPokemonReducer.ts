import { IPokemon, PokemonPagination } from "../../shared/model/PokemonModel";
import {
  MYPOKEMON_LOADING,
  MYPOKEMON_LIST,
  MYPOKEMON_ADD,
  MYPOKEMON_REMOVE,
  MYPOKEMON_RENAME,
  MYPOKEMON_FAIL,
  MyPokemonDispatchTypes,
} from "../actions/MyPokemonActions";

interface IPokemonState {
  loading: boolean;
  pokemons?: PokemonPagination;
}

const initalState: IPokemonState = {
  loading: false,
  pokemons: undefined,
};

const myPokemonReducer = (
  state: IPokemonState = initalState,
  action: MyPokemonDispatchTypes
): IPokemonState => {
  switch (action.type) {
    case MYPOKEMON_LOADING:
      return {
        ...state,
        loading: true,
      };
    case MYPOKEMON_LIST:
      return {
        ...state,
        loading: false,
        pokemons: action.payload,
      };
    case MYPOKEMON_ADD:
      return {
        ...state,
        loading: false,
        pokemons: {
          ...state.pokemons,
          count: (state.pokemons?.count || 0) + 1,
          results: (state.pokemons?.results || []).concat(action.payload),
        },
      };
    case MYPOKEMON_REMOVE:
      return {
        ...state,
        loading: false,
        pokemons: {
          ...state.pokemons,
          count: (state.pokemons?.count || 0) - 1,
          results: state.pokemons?.results?.filter((v) => v !== action.payload),
        },
      };
    case MYPOKEMON_RENAME:
      console.log(state.pokemons?.results);
      const index = state.pokemons?.results?.findIndex(
        (v) => v.nickname === action.payload.prevNickname
      );
      const temp = state.pokemons?.results?.slice();
      if (temp && index !== undefined && index >= 0) {
        temp.splice(index, 1, action.payload);
      }
      return {
        ...state,
        loading: false,
        pokemons: {
          ...state.pokemons,
          results: temp,
        },
      };
    case MYPOKEMON_FAIL:
      return {
        ...state,
        loading: false,
      };
    default: {
      return state;
    }
  }
};

export default myPokemonReducer;
