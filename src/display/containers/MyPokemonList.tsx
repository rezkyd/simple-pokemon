import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  Skeleton,
  Tooltip,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { GetPokemon } from "../../store/actions/PokemonActions";
import { RootStore } from "../../store/Store";
import { getIdFromUrl, getImageFromId } from "../../utils/PokemonUtils";
import {
  RemoveMyPokemon,
  RenameMyPokemon,
} from "../../store/actions/MyPokemonActions";
import { NamedResource } from "../../shared/model/PokemonModel";

type Props = {};

const MyPokemonList: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const myPokemonState = useSelector((state: RootStore) => state.myPokemon);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alert, setAlert] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState<NamedResource>();

  const handleRename = (resource: NamedResource) => {
    setAlertOpen(true);
    setAlert("rename");
    setSelectedPokemon(resource);
  };
  const handleRemove = (resource: NamedResource) => {
    setAlertOpen(true);
    setAlert("remove");
    setSelectedPokemon(resource);
  };
  const handleClose = () => {
    setAlertOpen(false);
  };
  const handleConfirm = async () => {
    if (alert === "rename") {
      dispatch(RenameMyPokemon(selectedPokemon!));
      setAlertOpen(false);
    } else if (alert === "remove" || alert === "failed") {
      if (await dispatch(RemoveMyPokemon(selectedPokemon!))) {
        setAlert("success");
      } else {
        setAlert("failed");
      }
    } else if (alert === "success") {
      setAlertOpen(false);
    }
  };

  const spriteUrl = (pokemonUrl: string) => {
    const id = getIdFromUrl(pokemonUrl);
    return getImageFromId(id);
  };

  return (
    <Box my="30px">
      <Container maxWidth="md">
        {myPokemonState.pokemons ? (
          <Grid container spacing={2}>
            {myPokemonState.pokemons?.results?.map((v, i) => (
              <Grid key={i} item xs={4}>
                <Card sx={{ maxWidth: 300 }}>
                  <CardHeader
                    action={
                      <Box>
                        <Tooltip title="Rename">
                          <IconButton
                            onClick={() => handleRename(v)}
                            aria-label="rename nickname"
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Remove">
                          <IconButton
                            onClick={() => handleRemove(v)}
                            aria-label="remove pokemon"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    }
                  ></CardHeader>
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
                        {v.name?.toUpperCase()} ({v.nickname})
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : myPokemonState.loading ? (
          <Skeleton height="140px"></Skeleton>
        ) : (
          <Typography variant="h5" textAlign={"center"}>
            You dont have Pokemon yet, try to catch one!
          </Typography>
        )}
      </Container>

      <Dialog open={alertOpen} onClose={handleClose}>
        <DialogContent sx={{ p: "30px" }}>
          <Box>
            <Box textAlign={"center"}>
              {alert === "rename" ? (
                <EditIcon color="disabled" fontSize="small" />
              ) : alert === "success" ? (
                <CheckCircleOutlineIcon color="disabled" fontSize="small" />
              ) : (
                <DeleteIcon color="error" fontSize="small" />
              )}
            </Box>
            {alert === "rename" ? (
              <Typography variant="subtitle1">
                Are you sure you want to rename {selectedPokemon?.nickname} ?
              </Typography>
            ) : alert === "remove" ? (
              <Typography variant="subtitle1">
                Are you sure you want to release {selectedPokemon?.nickname} ?
              </Typography>
            ) : alert === "success" ? (
              <Typography variant="subtitle1">
                Succeed releasing {selectedPokemon?.nickname} into the wild
              </Typography>
            ) : (
              <Typography variant="subtitle1">
                Failed releasing {selectedPokemon?.nickname} into the wild, you
                can try again
              </Typography>
            )}
            <Box textAlign={"right"} mt="15px">
              {alert !== "success" && (
                <Button
                  variant="text"
                  sx={{ mr: "10px" }}
                  onClick={handleClose}
                >
                  <Typography variant="subtitle2">Cancel</Typography>
                </Button>
              )}
              <Button variant="text" onClick={handleConfirm}>
                <Typography variant="subtitle2">Confirm</Typography>
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default MyPokemonList;
