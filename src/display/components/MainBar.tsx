import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import BackpackIcon from "@mui/icons-material/Backpack";
import { Outlet } from "react-router-dom";
import { RootStore } from "../../store/Store";
import { useSelector } from "react-redux";
import { Badge } from "@mui/material";

const MainBar = () => {
  const myPokemonState = useSelector((state: RootStore) => state.myPokemon);

  return (
    <Box>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <CatchingPokemonIcon sx={{ display: "flex", mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: "flex",
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Pokémon
            </Typography>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="My Pokémon">
                <IconButton href="/mypokemon" sx={{ p: 0 }}>
                  <Badge
                    badgeContent={myPokemonState.pokemons?.count}
                    color="success"
                  >
                    <BackpackIcon
                      fontSize="large"
                      sx={{ bgcolor: "#FFF", borderRadius: "50%", p: "2px" }}
                    />
                  </Badge>
                </IconButton>
              </Tooltip>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Outlet />
    </Box>
  );
};
export default MainBar;
