import React, { Component } from "react";

// Import Mui Components
import {
  Box,
  Grid,
  CircularProgress,
  TextField,
  ButtonGroup,
  Button,
  Paper,
  Typography,
} from "@material-ui/core";

// Import Mui Icons
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";

// Import App Components
import AnimaliaCard from "./AnimailaCard";

export default ({
  data,
  loading,
  handleRank,
  searchField,
  handleChangeSearch,
  handleSearch,
  zeroMatch,
  navMatch,
}) => {
  return (
    <Grid item xs={12}>
      <Box px={navMatch ? 6 : 2} py={2}>
        <Grid container spacing={2} justify="center">
          <Grid item xs={12} sm={9}>
            <Box
              mt={data.length === 0 ? 24 : 0}
              style={{ transition: "all .75s" }}
            >
              <ButtonGroup
                variant="contained"
                color="secondary"
                fullWidth
                style={{
                  borderTopRightRadius: "1.5rem",
                  borderBottomRightRadius: "1.5rem",
                }}
              >
                <TextField
                  variant="outlined"
                  placeholder="Search..."
                  value={searchField}
                  onChange={handleChangeSearch}
                  onKeyPress={(e) =>
                    e.key === "Enter" ? handleSearch() : null
                  }
                />
                <Button style={{ width: "5rem" }} onClick={handleSearch}>
                  <SearchOutlinedIcon />
                </Button>
              </ButtonGroup>
            </Box>
          </Grid>
          {loading ? (
            <Grid item xs={12}>
              <Grid container justify="center">
                <CircularProgress color="secondary" size={60} />
              </Grid>
            </Grid>
          ) : zeroMatch ? (
            <Grid item xs={12} sm={8} md={6} lg={6}>
              <Paper elevation={15}>
                <Box px={5} py={4}>
                  <Typography variant="body1" align="center">
                    Sorry, but we couldn't find any matches for your search.
                    Please try again!
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ) : (
            <>
              {data.map((item, i) => (
                <AnimaliaCard
                  key={`searchCard${i}`}
                  item={item}
                  index={i}
                  handleRank={handleRank}
                />
              ))}
            </>
          )}
        </Grid>
      </Box>
    </Grid>
  );
};
