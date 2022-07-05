import React from "react";
import { NavLink } from "react-router-dom";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Button,
  Paper,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

type Props = {};

const NotFound404: React.FC<Props> = (props) => {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <IconButton component={NavLink} to={"/"} edge="start" color="inherit">
            <ArrowBack />
          </IconButton>
          <Typography variant="subtitle2">Kembali Ke Beranda</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md">
        <Box
          sx={{
            marginTop: "5vh",
          }}
        >
          <Box>
            <Paper sx={{ padding: "40px 0px" }}>
              <Box sx={{ margin: "auto", textAlign: "center" }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: { xs: "16px", sm: "20px" },
                    my: "10px",
                    fontWeight: "bold",
                  }}
                >
                  Halaman Tidak Ditemukan
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: "12px", sm: "16px" },
                    my: "10px",
                    fontWeight: "bold",
                    color: "#9A9A9A",
                  }}
                >
                  Halaman yang Anda cari tidak ditemukan
                </Typography>
                <Button
                  component={NavLink}
                  to={"/"}
                  variant="contained"
                  sx={{ mt: "50px" }}
                >
                  <Typography variant="subtitle2">OK</Typography>
                </Button>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default NotFound404;
