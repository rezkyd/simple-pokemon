import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Pagination,
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
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 15;

  useEffect(() => {
    dispatch(GetPokemon(ITEMS_PER_PAGE));
  }, [dispatch]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(GetPokemon(ITEMS_PER_PAGE, (value - 1) * ITEMS_PER_PAGE));
    setPage(value);
  };

  const spriteUrl = (pokemonUrl: string) => {
    const id = getIdFromUrl(pokemonUrl);
    return getImageFromId(id);
  };

  return (
    <Box my="30px">
      <Container maxWidth="md">
        {pokemonState.loading ? (
          <Grid container spacing={2}>
            {Array(9)
              .fill(1)
              .map((v) => (
                <Grid item xs={4}>
                  <Skeleton height="250px"></Skeleton>
                </Grid>
              ))}
          </Grid>
        ) : pokemonState.pokemons ? (
          <Box>
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
            <Box my="20px">
              <Pagination
                sx={{
                  ul: { justifyContent: { xs: "center", sm: "flex-end" } },
                }}
                color="primary"
                count={Math.ceil(pokemonState.pokemons.count! / ITEMS_PER_PAGE)}
                page={page}
                onChange={handleChange}
              ></Pagination>
            </Box>
          </Box>
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
