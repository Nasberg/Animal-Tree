import React, { Component } from "react";

// Import Styles
import theme from "../styles/theme";

// Import Mui Components
import {
  Box,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Typography,
} from "@material-ui/core";

// Import Mui Icons
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";

export default ({ item, index, handleRank }) => {
  const { key, rank, canonicalName, scientificName, habitats, parent } = item;

  return (
    <Grid item xs={12}>
      <Paper
        elevation={15}
        style={{
          height: "5.4rem",
          backgroundColor:
            index % 2 === 0
              ? theme.palette.primary.light
              : theme.palette.secondary.light,
        }}
      >
        <List>
          <ListItem>
            <ListItemText
              primary={
                <Typography variant="body1" color="textSecondary">
                  {canonicalName}
                </Typography>
              }
              secondary={
                <Typography variant="body2" color="textSecondary">
                  <Box fontStyle="italic">Rank: {rank}</Box>
                </Typography>
              }
            />
            <ListItemSecondaryAction>
              <IconButton color="inherit" onClick={() => handleRank(item)}>
                <SendOutlinedIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Paper>
    </Grid>
  );
};
