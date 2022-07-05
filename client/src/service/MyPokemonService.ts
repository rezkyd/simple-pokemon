import axios from "axios";

const http = axios.create({ baseURL: "http://localhost:3000/pokemon" });

type Response = {
  catchStatus?: boolean;
  releaseNumber?: number;
  newNickname?: string;
};

type RenameParam = {
  prevNickname?: string;
  nickname?: string;
};

const catchPokemon = () => {
  return http.get<Response>("catch");
};

const removeMyPokemon = () => {
  return http.get<Response>("release");
};

const renameMyPokemon = (name: string, prevName?: string) => {
  const params: RenameParam = {
    prevNickname: prevName,
    nickname: name,
  };
  return http.get<Response>("rename", { params });
};

const MyPokemonService = {
  catchPokemon,
  removeMyPokemon,
  renameMyPokemon,
};

export default MyPokemonService;
