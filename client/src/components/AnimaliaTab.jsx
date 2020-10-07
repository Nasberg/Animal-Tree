import React, { Component, useState, useEffect } from "react";

// Import Styles
import theme from "../styles/theme";

// Import Mui Components
import {
  Grid,
  Box,
  Divider,
  List,
  ListItem,
  Typography,
  Paper,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  CircularProgress,
  Button,
  Breadcrumbs,
  Tabs,
  Tab,
  TabScrollButton,
} from "@material-ui/core";

// Import Mui Icons
import ChevronRightOutlinedIcon from "@material-ui/icons/ChevronRightOutlined";

// Import App Components
import AnimaliaCard from "./AnimailaCard";

export default ({
  currentParent,
  currentData,
  currentRank,
  currentBreadcrumb,
  currentBreadcrumbRank,
  loading,
  handleRank,
  goToWiki,
  navMatch,
}) => {
  return (
    <Grid item xs={12}>
      <Box px={navMatch ? 6 : 2} py={navMatch ? 4 : 2}>
        <Grid container spacing={2} justify="center">
          <Grid item xs={12}>
            <Grid container justify="center">
              <Grid item xs={12} sm={9} md={6} lg={5}>
                <Paper
                  elevation={15}
                  style={{
                    backgroundColor: theme.palette.primary.main,
                  }}
                >
                  <Box p={3}>
                    <Grid container spacing={1}>
                      <Grid item xs={12}>
                        <Typography
                          variant="h5"
                          align="center"
                          color="textSecondary"
                        >
                          <Box fontWeight="fontWeightBold">
                            {currentParent.canonicalName}
                          </Box>
                        </Typography>
                      </Grid>
                      {currentParent.canonicalName !== "Animalia" && (
                        <>
                          <Grid item xs={12}>
                            <Divider style={{ backgroundColor: "white" }} />
                          </Grid>
                          <Grid item xs={12}>
                            <Typography
                              variant="body1"
                              color="textSecondary"
                              align="center"
                            >
                              Habitats:
                            </Typography>
                            <Grid container justify="center">
                              {currentParent.habitats ? (
                                <>
                                  {currentParent.habitats.length > 0 ? (
                                    <>
                                      {currentParent.habitats.map(
                                        (habItem, habI) => (
                                          <Box mr={1}>
                                            <Typography
                                              variant="caption"
                                              color="textSecondary"
                                            >
                                              {habItem}
                                            </Typography>
                                          </Box>
                                        )
                                      )}
                                    </>
                                  ) : (
                                    <Typography
                                      variant="body2"
                                      color="textSecondary"
                                      align="center"
                                    >
                                      0 habitats found
                                    </Typography>
                                  )}
                                </>
                              ) : (
                                <Typography
                                  variant="body2"
                                  color="textSecondary"
                                  align="center"
                                >
                                  0 habitats found
                                </Typography>
                              )}
                            </Grid>
                          </Grid>
                          <Grid item xs={12}>
                            <Divider style={{ backgroundColor: "white" }} />
                          </Grid>
                          <Grid item xs={12}>
                            <Grid container justify="center">
                              <Paper elevation={5}>
                                <Button
                                  variant="contained"
                                  color="secondary"
                                  onClick={goToWiki}
                                >
                                  Go to Wiki
                                </Button>
                              </Paper>
                            </Grid>
                          </Grid>
                        </>
                      )}
                    </Grid>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Tabs
              variant="scrollable"
              indicatorColor="secondary"
              value={currentBreadcrumbRank - 1}
              style={{ height: "3.5rem" }}
            >
              {[
                "Kingdom",
                "Phylum",
                "Class",
                "Order",
                "Family",
                "Genus",
                "Species",
                "Subspecies",
              ]
                .slice(0, currentBreadcrumbRank)
                .map((item, i) => {
                  return currentBreadcrumb
                    .filter((it, j) => {
                      return it.rank.toLowerCase() === item.toLowerCase();
                    })
                    .map((it, j) => (
                      <Tab
                        style={{ height: "3rem", maxWidth: "100%" }}
                        onClick={() => handleRank(it)}
                        label={
                          <List dense>
                            <ListItem dense>
                              <ListItemText
                                primary={
                                  <Typography
                                    variant="body2"
                                    color="textSecondary"
                                    style={{ fontStyle: "italic" }}
                                  >
                                    {it.rank.toUpperCase()}
                                  </Typography>
                                }
                                secondary={
                                  <Typography
                                    variant="body1"
                                    color="textSecondary"
                                  >
                                    {it.canonicalName}
                                  </Typography>
                                }
                              />
                            </ListItem>
                          </List>
                        }
                      />
                    ));
                })}
            </Tabs>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          {loading ? (
            <Grid item xs={12}>
              <Grid container justify="center">
                <CircularProgress color="secondary" size={60} />
              </Grid>
            </Grid>
          ) : currentData.length === 0 ? (
            <Grid item xs={12} sm={9} md={4}>
              <Paper elevation={15}>
                <Box px={5} py={4}>
                  <Typography variant="body1" align="center">
                    {currentRank === "content"
                      ? "Sorry, but this is as far as we can take you."
                      : `Sorry, no ${currentRank} found!`}{" "}
                    Read more about this on Wikipedia.
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          ) : (
            <>
              {currentData.map((item, i) => (
                <AnimaliaCard
                  key={`animalCard-${i}`}
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
