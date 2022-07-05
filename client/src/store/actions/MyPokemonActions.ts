import { Dispatch } from "redux";
import { AxiosError } from "axios";
import {
  NamedResource,
  PokemonPagination,
} from "../../shared/model/PokemonModel";
import PokemonService from "../../service/PokemonService";
import MyPokemonService from "../../service/MyPokemonService";
import { isPrime } from "../../utils/PokemonUtils";

export const MYPOKEMON_LOADING = "MYPOKEMON_LOADING";
export const MYPOKEMON_LIST = "MYPOKEMON_LIST";
export const MYPOKEMON_ADD = "MYPOKEMON_ADD";
export const MYPOKEMON_REMOVE = "MYPOKEMON_REMOVE";
export const MYPOKEMON_RENAME = "MYPOKEMON_RENAME";

export const MYPOKEMON_FAIL = "MYPOKEMON_FAIL";

interface MyPokemonLoading {
  type: typeof MYPOKEMON_LOADING;
}
interface MyPokemonList {
  type: typeof MYPOKEMON_LIST;
  payload: PokemonPagination;
}
interface MyPokemonAdd {
  type: typeof MYPOKEMON_ADD;
  payload: NamedResource;
}
interface MyPokemonRemove {
  type: typeof MYPOKEMON_REMOVE;
  payload: NamedResource;
}
interface MyPokemonRename {
  type: typeof MYPOKEMON_RENAME;
  payload: NamedResource;
}
interface MyPokemonFail {
  type: typeof MYPOKEMON_FAIL;
}

export type MyPokemonDispatchTypes =
  | MyPokemonLoading
  | MyPokemonList
  | MyPokemonAdd
  | MyPokemonRemove
  | MyPokemonRename
  | MyPokemonFail;

export const GetMyPokemon = (size: number) => async (
  dispatch: Dispatch<MyPokemonDispatchTypes>
) => {
  try {
    dispatch({ type: MYPOKEMON_LOADING });
    const res = await PokemonService.get(size);
    console.log("response: ", res.data);
    dispatch({ type: MYPOKEMON_LIST, payload: res.data });
  } catch (e) {
    const err = e as AxiosError;
    dispatch({ type: MYPOKEMON_FAIL });
    console.error(err.response?.status);
  }
};

export const CatchPokemon = () => async (
  dispatch: Dispatch<MyPokemonDispatchTypes>
) => {
  try {
    // dispatch({ type: MYPOKEMON_LOADING });
    const res = await MyPokemonService.catchPokemon();
    return res.data.catchStatus;
  } catch (e) {
    const err = e as AxiosError;
    dispatch({ type: MYPOKEMON_FAIL });
    console.error(err.response?.status);
    return false;
  }
};

export const AddMyPokemon = (resource: NamedResource) => async (
  dispatch: Dispatch<MyPokemonDispatchTypes>
) => {
  try {
    dispatch({ type: MYPOKEMON_ADD, payload: resource });
  } catch (e) {
    const err = e as AxiosError;
    dispatch({ type: MYPOKEMON_FAIL });
    console.error(err.response?.status);
  }
};

export const RemoveMyPokemon = (resource: NamedResource) => async (
  dispatch: Dispatch<MyPokemonDispatchTypes>
) => {
  try {
    dispatch({ type: MYPOKEMON_LOADING });
    const res = await MyPokemonService.removeMyPokemon();
    if (isPrime(res.data.releaseNumber)) {
      dispatch({ type: MYPOKEMON_REMOVE, payload: resource });
      return true;
    } else {
      dispatch({ type: MYPOKEMON_FAIL });
      return false;
    }
  } catch (e) {
    const err = e as AxiosError;
    dispatch({ type: MYPOKEMON_FAIL });
    console.error(err.response?.status);
    return false;
  }
};

export const RenameMyPokemon = (resource: NamedResource) => async (
  dispatch: Dispatch<MyPokemonDispatchTypes>
) => {
  try {
    dispatch({ type: MYPOKEMON_LOADING });
    const res = await MyPokemonService.renameMyPokemon(
      resource.nickname!,
      resource.prevNickname
    );
    const newResource = {
      ...resource,
      prevNickname: resource.nickname,
      nickname: res.data.newNickname,
    };
    console.log("new res", newResource);
    dispatch({ type: MYPOKEMON_RENAME, payload: newResource });
  } catch (e) {
    const err = e as AxiosError;
    dispatch({ type: MYPOKEMON_FAIL });
    console.error(err.response?.status);
  }
};
