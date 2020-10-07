import React, { Component, useEffect, useState } from "react";

// Import Mui Components
import {
  Grid,
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@material-ui/core";

// Import Mui Icons
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import CasinoOutlinedIcon from "@material-ui/icons/CasinoOutlined";

// Import App Components
import HomeSuggestionCard from "./HomeSuggestionCard";
import theme from "../styles/theme";

export default ({
  navMatch,
  setMenuTabs,
  handleChangeSearch,
  handleSearch,
  handleRank,
}) => {
  const [suggestionData, setSuggestionData] = useState([]);
  const [suggestionLoading, setSuggestionLoading] = useState(false);

  const handleSuggestionData = async () => {
    const arr = [];
    let match = false;

    setSuggestionLoading(true);

    while (!match) {
      const index = Math.floor(Math.random() * 1000);

      await fetch(
        `https://api.gbif.org/v1/species/search?higherTaxonKey=1&limit=1000`
      )
        .then((res) => res.json())
        .then((data) => {
          arr.push(data.results[index]);
        })
        .then(() => {
          match = true;
          setSuggestionLoading(false);
        })
        .catch(() => {
          console.log("No match");
        });
    }

    setSuggestionData(arr);
  };

  useEffect(() => {
    handleSuggestionData();
  }, []);

  return (
    <Grid item xs={12}>
      <Box px={navMatch ? 6 : 2} pb={2} pt={navMatch ? 6 : 2}>
        <Grid container spacing={navMatch ? 10 : 4} alignItems="flex-end">
          <Grid item xs={12} lg={7}>
            <Grid container spacing={navMatch ? 2 : 4}>
              <Grid item xs={12} sm={7} md={8} lg={12}>
                <Typography variant="h3" color="textSecondary">
                  <Box fontWeight="fontWeightBold">Welcome to</Box>
                </Typography>
                <Typography variant="h2" color="textSecondary">
                  <Box fontWeight="fontWeightBold">Animal Tree</Box>
                </Typography>
              </Grid>
              {!navMatch && (
                <Grid item xs={12} sm={5} md={4}>
                  <TextField
                    fullWidth
                    placeholder="Search..."
                    variant="outlined"
                    color="secondary"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            color="secondary"
                            size="small"
                            onClick={handleSearch}
                          >
                            <SearchOutlinedIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    onChange={handleChangeSearch}
                  />
                </Grid>
              )}
            </Grid>
          </Grid>
          <Grid item xs={12} sm={7} md={6}>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              size="large"
              style={{ height: "5.4rem" }}
              onClick={() => setMenuTabs(2)}
            >
              <Typography variant="h6" color="textSecondary">
                Go to Animalia
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={12} sm={7} md={6}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={7}>
                <Typography variant="h5" color="textSecondary">
                  Find Something New
                </Typography>
              </Grid>
              <Grid item xs={5}>
                <Grid container justify="flex-end">
                  <Button
                    color="primary"
                    size="large"
                    startIcon={
                      suggestionLoading ? (
                        <CircularProgress
                          color="secondary"
                          style={{
                            height: theme.spacing(2),
                            width: theme.spacing(2),
                          }}
                        />
                      ) : (
                        <CasinoOutlinedIcon />
                      )
                    }
                    disabled={suggestionLoading}
                    onClick={handleSuggestionData}
                  >
                    Scramble
                  </Button>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2} justify="center">
                  {suggestionData.map((item, i) => (
                    <HomeSuggestionCard
                      key={`suggestionCard-${i}`}
                      item={item}
                      index={i}
                      navMatch={navMatch}
                      handleRank={handleRank}
                    />
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
};
