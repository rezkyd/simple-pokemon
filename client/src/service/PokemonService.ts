import axios from "axios";
import { IPokemon, PokemonPagination } from "../shared/model/PokemonModel";

const http = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
});

const getId = (id: string) => {
  return http.get<IPokemon>(`pokemon/${id}`);
};

const get = (limit: number, offset: number = 0) => {
  const params: any = {
    limit: limit,
    offset: offset,
  };
  return http.get<PokemonPagination>("pokemon/", { params });
};

const PokemonService = {
  get,
  getId,
};

export default PokemonService;
