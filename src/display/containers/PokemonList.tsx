import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Skeleton,
  Typography,
} from "@mui/material";
import { GetPokemon } from "../../store/actions/PokemonActions";
import { RootStore } from "../../store/Store";
import { getIdFromUrl, getImageFromId } from "../../utils/PokemonUtils";

type Props = {};

const PokemonList: React.FC<Props> = () => {
  const dispatch = useDispatch();
  const pokemonState = useSelector((state: RootStore) => state.pokemon);

  useEffect(() => {
    dispatch(GetPokemon(24));
  }, [dispatch]);

  const spriteUrl = (pokemonUrl: string) => {
    const id = getIdFromUrl(pokemonUrl);
    return getImageFromId(id);
  };

  return (
    <Box my="30px">
      <Container maxWidth="md">
        {pokemonState.pokemons ? (
          <Grid container spacing={2}>
            {pokemonState.pokemons?.results?.map((v, i) => (
              <Grid key={i} item xs={4}>
                <Card>
                  <CardActionArea href={"/pokemon/" + getIdFromUrl(v.url!)}>
                    <CardMedia
                      height="140"
                      component="img"
                      image={spriteUrl(v.url!)}
                      alt={v.name}
                    ></CardMedia>
                    <CardContent>
                      <Typography
                        variant="subtitle1"
                        textAlign={"center"}
                        sx={{ fontSize: { xs: 12, sm: 16 } }}
                      >
                        {v.name?.toUpperCase()}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : pokemonState.loading ? (
          <Skeleton height="140px"></Skeleton>
        ) : (
          <Typography variant="h5">
            No Pokemon found! Please try again.
          </Typography>
        )}
      </Container>
    </Box>
  );
};

export default PokemonList;
