import "./App.css";
import React, { useState, useEffect } from "react";
import { usePapaParse } from "react-papaparse";
import { default as BrassImage } from "./assets/Brass.png";
import { default as WoodwindsImage } from "./assets/Woodwinds.png";
import { default as ColorguardImage } from "./assets/Colorguard.png";
import { default as PercussionImage } from "./assets/Percussion.png";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "light",
  },
  spacing: 4,
});

let data;

let Houses = {
  BRASS: 0,
  WOODWINDS: 0,
  COLORGUARD: 0,
  PERCUSSION: 0,
};

function ReadPoints(props) {
  const { readRemoteFile } = usePapaParse();

  readRemoteFile(HOUSE_POINTS, {
    complete: (results) => {
      results.data.shift(); // first row is just the headers
      let Houses = {
        BRASS: 0,
        WOODWINDS: 0,
        COLORGUARD: 0,
        PERCUSSION: 0,
      };
      data = results.data;
      results.data.map((row) => {
        switch (row[4]) {
          case "BRASS":
            Houses.BRASS += parseInt(row[3]);
            break;
          case "WOODWINDS":
            Houses.WOODWINDS += parseInt(row[3]);
            break;
          case "COLOR GUARD":
            Houses.COLORGUARD += parseInt(row[3]);
            break;
          case "PERCUSSION":
            Houses.PERCUSSION += parseInt(row[3]);
            break;
          default:
            break;
        }
        return null;
      });
      data = Houses;
      props.setHousepoints(Houses);
    },
  });
}

let callMade = false;

const HOUSE_POINTS =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vS86f6k_9eQABY2sUgI5lPAXW25EPjEB4P3SF8JqV_O7kZ9aMz81wRZdM71ac-0be5evaOqfMk3wt-8/pub?gid=746757530&single=true&output=csv";

function App() {
  const [housepoints, setHousepoints] = useState();

  if (!callMade) {
    ReadPoints({ setHousepoints });
    callMade = true;
  }

  return (
    <Container maxWidth="md">
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <div style={{ width: "100%", textAlign: "center" }}>
          <Typography gutterBottom component="div" varient="h2">
            CRHS Band and Color Guard House Points - OVERALL
          </Typography>
        </div>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={5}>
            <Grid xs={12} md={6}>
              <Card
                style={{ backgroundColor: "gray", color: "white" }}
                sx={{ display: "flex" }}
              >
                <CardMedia
                  component="img"
                  sx={{ width: 151 }}
                  image={BrassImage}
                  alt="Brass"
                />
                <Box sx={{ margin: "auto" }}>
                  <CardContent sx={{ flex: "1 0 auto" }}>
                    <Typography
                      variant="h2"
                      component="div"
                      sx={{
                        margin: "22px",
                      }}
                    >
                      {housepoints?.BRASS}
                    </Typography>
                  </CardContent>
                </Box>
              </Card>
            </Grid>
            <Grid xs={12} md={6}>
              <Card
                style={{ backgroundColor: "black", color: "white" }}
                sx={{ display: "flex" }}
              >
                <CardMedia
                  component="img"
                  sx={{ width: 151 }}
                  image={PercussionImage}
                  alt="Percussion"
                />
                <Box
                  sx={{
                    margin: "auto",
                  }}
                >
                  <CardContent sx={{ flex: "1 0 auto" }}>
                    <Typography
                      variant="h2"
                      component="div"
                      sx={{ margin: "22px" }}
                    >
                      {housepoints?.PERCUSSION}
                    </Typography>
                  </CardContent>
                </Box>
              </Card>
            </Grid>
            <Grid xs={12} md={6}>
              <Card
                style={{ backgroundColor: "#7c13ba", color: "white" }}
                sx={{ display: "flex" }}
              >
                <CardMedia
                  component="img"
                  sx={{ width: 151 }}
                  image={ColorguardImage}
                  alt="Color Guard"
                />
                <Box sx={{ margin: "auto" }}>
                  <CardContent sx={{ flex: "1 0 auto" }}>
                    <Typography
                      variant="h2"
                      component="div"
                      sx={{ margin: "22px" }}
                    >
                      {housepoints?.COLORGUARD}
                    </Typography>
                  </CardContent>
                </Box>
              </Card>
            </Grid>
            <Grid xs={12} md={6}>
              <Card
                style={{ backgroundColor: "white", color: "black" }}
                sx={{
                  display: "flex",
                }}
              >
                <CardMedia
                  component="img"
                  sx={{ width: 151 }}
                  image={WoodwindsImage}
                  alt="Woodwinds"
                />
                <Box sx={{ margin: "auto" }}>
                  <CardContent sx={{ flex: "1 0 auto" }}>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <Typography
                        variant="h2"
                        component="div"
                        sx={{ margin: "22px" }}
                      >
                        {housepoints?.WOODWINDS}
                      </Typography>
                    </div>
                  </CardContent>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </ThemeProvider>
    </Container>
  );
}

export default App;
