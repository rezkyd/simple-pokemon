import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Card,
  CardMedia,
  Container,
  Dialog,
  DialogContent,
  Grid,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";

import { RootStore } from "../../store/Store";
import { GetPokemonDetail } from "../../store/actions/PokemonActions";
import { useParams } from "react-router-dom";
import {
  AddMyPokemon,
  CatchPokemon,
} from "../../store/actions/MyPokemonActions";
import { NamedResource } from "../../shared/model/PokemonModel";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";

type Props = {};

const PokemonDetail: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const param = useParams();
  const pokemonState = useSelector((state: RootStore) => state.pokemon);
  const [alertOpen, setAlertOpen] = useState(false);
  const [successCatch, setSuccessCatch] = useState(false);
  const [nickname, setNickname] = useState("");

  const handleClose = () => {
    setAlertOpen(false);
  };

  const handleConfirm = () => {
    const myPokemon: NamedResource = {
      url: `https://pokeapi.co/api/v2/pokemon/${pokemonState.pokemonDetail?.id}/`,
      name: pokemonState.pokemonDetail?.name,
      nickname: nickname,
      prevNickname: "",
    };
    dispatch(AddMyPokemon(myPokemon));
    setAlertOpen(false);
    setNickname("")
  };

  const handleCatch = async () => {
    setAlertOpen(true);
    if (await dispatch(CatchPokemon())) {
      setSuccessCatch(true);
    } else {
      setSuccessCatch(false);
    }
  };

  useEffect(() => {
    param.id && dispatch(GetPokemonDetail(param.id!));
  }, [dispatch, param]);

  return (
    <Box my="30px">
      <Container maxWidth="md">
        {pokemonState.pokemonDetail ? (
          <Box>
            <Grid container spacing={1} border="1px solid #efefef">
              <Grid item xs={12}>
                <CardMedia
                  height="200"
                  sx={{ objectFit: "contain" }}
                  component="img"
                  image={pokemonState.pokemonDetail?.sprites?.front_default}
                  alt={pokemonState.pokemonDetail?.name}
                ></CardMedia>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="h5"
                  fontWeight={"bold"}
                  textAlign={"center"}
                >
                  {pokemonState.pokemonDetail.name?.toUpperCase()}
                </Typography>
              </Grid>
              <Grid item xs={12} textAlign="center">
                <Button variant="contained" onClick={handleCatch}>
                  <Typography variant="subtitle1">
                    Catch this pokemon!
                  </Typography>
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1">Height</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1">
                  {pokemonState.pokemonDetail.height}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1">Weight</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1">
                  {pokemonState.pokemonDetail.weight}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1">Base Stat</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1">
                  {pokemonState.pokemonDetail.stats
                    ?.map((v) => v.stat?.name + ": " + v.base_stat)
                    .join(", ")}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1">Types</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1">
                  {pokemonState.pokemonDetail.types
                    ?.map((v) => v.type?.name)
                    .join(", ")}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1">Move Set</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1">
                  {pokemonState.pokemonDetail.moves
                    ?.map((v) => v.move?.name)
                    .join(", ")}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        ) : (
          <Skeleton height="100px"></Skeleton>
        )}
      </Container>
      <Dialog open={alertOpen} onClose={handleClose}>
        <DialogContent sx={{ p: "30px" }}>
          {successCatch ? (
            <Box>
              <Box textAlign={"center"}>
                <CheckCircleOutlineIcon color="success" fontSize="large" />
              </Box>
              <Typography variant="subtitle1">
                You succeed in catching{" "}
                {pokemonState.pokemonDetail?.name?.toUpperCase()}, give it a
                nickname!
              </Typography>
              <TextField
                fullWidth
                margin="dense"
                variant="standard"
                label="Nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              ></TextField>
              <Box textAlign={"right"} mt="15px">
                <Button variant="text" onClick={handleConfirm}>
                  <Typography variant="subtitle2">Confirm</Typography>
                </Button>
              </Box>
            </Box>
          ) : (
            <Box>
              <Box textAlign={"center"}>
                <CancelIcon color="error" fontSize="large" />
              </Box>
              <Typography variant="subtitle1">
                You failed in catching{" "}
                {pokemonState.pokemonDetail?.name?.toUpperCase()}, you can try
                again!
              </Typography>
              <Box textAlign={"right"} mt="15px">
                <Button variant="text" onClick={handleClose}>
                  <Typography variant="subtitle2">Close</Typography>
                </Button>
              </Box>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default PokemonDetail;
