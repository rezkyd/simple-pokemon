import { Dispatch } from "redux";
import { AxiosError } from "axios";
import { IPokemon, PokemonPagination } from "../../shared/model/PokemonModel";
import PokemonService from "../../service/PokemonService";

export const POKEMON_LOADING = "POKEMON_LOADING";
export const POKEMON_LIST = "POKEMON_LIST";
export const POKEMON_DETAIL = "POKEMON_DETAIL";
export const POKEMON_FAIL = "POKEMON_FAIL";

interface PokemonLoading {
  type: typeof POKEMON_LOADING;
}

interface PokemonList {
  type: typeof POKEMON_LIST;
  payload: PokemonPagination;
}

interface PokemonDetail {
  type: typeof POKEMON_DETAIL;
  payload: IPokemon;
}

interface PokemonFail {
  type: typeof POKEMON_FAIL;
}

export type PokemonDispatchTypes =
  | PokemonLoading
  | PokemonList
  | PokemonDetail
  | PokemonFail;

export const GetPokemon = (size: number, offset?: number) => async (
  dispatch: Dispatch<PokemonDispatchTypes>
) => {
  try {
    dispatch({ type: POKEMON_LOADING });
    const res = await PokemonService.get(size, offset);
    console.log("response: ", res.data);
    dispatch({ type: POKEMON_LIST, payload: res.data });
  } catch (e) {
    const err = e as AxiosError;
    dispatch({ type: POKEMON_FAIL });
    console.error(err.response?.status);
  }
};

export const GetPokemonDetail = (id: string) => async (
  dispatch: Dispatch<PokemonDispatchTypes>
) => {
  try {
    dispatch({ type: POKEMON_LOADING });
    const res = await PokemonService.getId(id);
    dispatch({ type: POKEMON_DETAIL, payload: res.data });
  } catch (e) {
    const err = e as AxiosError;
    dispatch({ type: POKEMON_FAIL });
    console.error(err.response?.status);
  }
};
