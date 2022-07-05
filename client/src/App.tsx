import { Routes, Route, BrowserRouter } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import "./App.css";
import PokemonList from "./display/containers/PokemonList";
import PokemonDetail from "./display/containers/PokemonDetail";
import MyPokemonList from "./display/containers/MyPokemonList";
import NotFound404 from "./display/containers/404";
import MainBar from "./display/components/MainBar";

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<MainBar />}>
          <Route index element={<PokemonList />} />
          <Route path="pokemon" element={<PokemonList />} />
          <Route path="pokemon/:id" element={<PokemonDetail />} />
          <Route path="mypokemon" element={<MyPokemonList />} />
        </Route>
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
