import React, { Component } from "react";

// Import Styles
import theme from "../styles/theme";

// Import Mui Components
import {
  Grid,
  Paper,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Typography,
  IconButton,
} from "@material-ui/core";

// Import Mui Icons
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";

export default ({ item, index, handleRank }) => {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Paper
        elevation={15}
        style={{
          height: "100%",
          backgroundColor:
            index % 2 === 0
              ? theme.palette.primary.light
              : theme.palette.secondary.light,
        }}
      >
        <Box px={1}>
          <List dense>
            <ListItem>
              <ListItemText
                primary={
                  <Typography variant="body1" color="textSecondary">
                    {item.canonicalName}
                  </Typography>
                }
                secondary={
                  <Typography variant="body2" color="textSecondary">
                    <Box fontStyle="italic">{item.scientificName}</Box>
                  </Typography>
                }
              />
              <ListItemSecondaryAction>
                <IconButton color="inherit" onClick={() => handleRank(item)}>
                  <SendOutlinedIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <Box px={2}>
              <Divider style={{ backgroundColor: "white" }} />
            </Box>
            <ListItem>
              <ListItemText
                primary={
                  <Typography variant="body2" color="textSecondary">
                    Habitats:
                  </Typography>
                }
                secondary={
                  <Grid container justify="flex-start">
                    {item.habitats.length > 0 ? (
                      <>
                        {item.habitats.map((habItem, habI) => (
                          <Box mr={1}>
                            <Typography variant="caption">{habItem}</Typography>
                          </Box>
                        ))}
                      </>
                    ) : (
                      <Typography variant="caption">
                        0 habitats found
                      </Typography>
                    )}
                  </Grid>
                }
              />
            </ListItem>
          </List>
        </Box>
      </Paper>
    </Grid>
  );
};
