import React, { Component, useEffect, useState } from "react";

// Import Styles
import theme from "./styles/theme";
import "./styles/style.css";

// Import Mui Components
import {
  Grid,
  Box,
  Paper,
  Tabs,
  Tab,
  ThemeProvider,
  TextField,
  IconButton,
  Typography,
  InputAdornment,
  useMediaQuery,
  AppBar,
  Toolbar,
  Button,
  SwipeableDrawer,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
} from "@material-ui/core";

// Import Mui Icons
import HouseOutlinedIcon from "@material-ui/icons/HouseOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import PetsOutlinedIcon from "@material-ui/icons/PetsOutlined";
import MenuOutlinedIcon from "@material-ui/icons/MenuOutlined";
import CloseOutlinedIcon from "@material-ui/icons/CloseOutlined";

// Import App Components
import useLocalStorage from "./hooks/useLocalStorage";
import HomeTab from "./components/HomeTab";
import SearchTab from "./components/SearchTab";
import AnimaliaTab from "./components/AnimaliaTab";

// Import Images
import animalBackground from "./images/animal-background.jpg";
import forestBackground from "./images/forest-background.jpg";

function App() {
  const [menuTabs, setMenuTabs] = useLocalStorage("menuTab", 0);

  const handleMenuTabs = (event, newValue) => {
    setMenuTabs(newValue);
  };

  // Search State
  const [searchField, setSearchField] = useLocalStorage("searchField", "");
  const [searchData, setSearchData] = useLocalStorage("searchData", []);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchZeroMatch, setSearchZeroMatch] = useState(false);

  const handleChangeSearch = (event) => {
    setSearchField(event.target.value);
  };

  const handleSearch = () => {
    setSearchZeroMatch(false);
    setSearchLoading(true);
    setMenuTabs(1);

    fetch(
      `https://api.gbif.org/v1/species/search?q=${searchField}&highertaxonKey=1&limit=25`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.results.length > 0) {
          setSearchData(data.results);
        } else {
          setSearchZeroMatch(true);
        }

        setSearchLoading(false);
      });
  };

  const [currentParent, setCurrentParent] = useLocalStorage("currentParent", {
    canonicalName: "Animalia",
    habitats: [],
  });
  const [currentBreadcrumbRank, setCurrentBreadcrumbRank] = useLocalStorage(
    "currentBreadcrumbRank",
    1
  );
  const [currentBreadcrumb, setCurrentBreadcrumb] = useLocalStorage(
    "currentBreadcrumb",
    [
      {
        key: 1,
        canonicalName: "Animalia",
        rank: "kingdom",
      },
    ]
  );
  const [currentRank, setCurrentRank] = useLocalStorage(
    "currentRank",
    "phylum"
  );
  const [currentHighertaxonKey, setCurrentHighertaxonKey] = useLocalStorage(
    "currentHighertaxonKey",
    "1"
  );
  const [currentData, setCurrentData] = useLocalStorage("currentData", []);
  const [animaliaLoading, setAnimaliaLoading] = useState(false);

  const handleRank = (item) => {
    setMenuTabs(2);

    switch (item.rank.toLowerCase()) {
      case "kingdom":
        setCurrentRank("phylum");
        setCurrentBreadcrumbRank(1);
        break;
      case "phylum":
        setCurrentRank("class");
        setCurrentBreadcrumbRank(2);
        break;
      case "class":
        setCurrentRank("order");
        setCurrentBreadcrumbRank(3);
        break;
      case "order":
        setCurrentRank("family");
        setCurrentBreadcrumbRank(4);
        break;
      case "family":
        setCurrentRank("genus");
        setCurrentBreadcrumbRank(5);
        break;
      case "genus":
        setCurrentRank("species");
        setCurrentBreadcrumbRank(6);
        break;
      case "species":
        setCurrentRank("subspecies");
        setCurrentBreadcrumbRank(7);
        break;
      case "subspecies":
        setCurrentRank("content");
        setCurrentBreadcrumbRank(8);
        setCurrentData([]);
        break;
    }
    setCurrentHighertaxonKey(item.key);
    setCurrentParent(item);

    let arr = [
      {
        key: 1,
        canonicalName: "Animalia",
        rank: "kingdom",
      },
    ];

    [
      "Phylum",
      "Class",
      "Order",
      "Family",
      "Genus",
      "Species",
      "Subspecies",
    ].map((jt, j) => {
      arr.push({
        ...item,
        key: item[`${jt.toLowerCase()}Key`],
        canonicalName: item[`${jt.toLowerCase()}`],
        rank: jt.toLowerCase(),
      });
    });

    setCurrentBreadcrumb(arr);
  };

  const handleGetData = () => {
    if (currentRank !== "content") {
      setAnimaliaLoading(true);

      fetch(
        `https://api.gbif.org/v1/species/search?rank=${currentRank}&highertaxonKey=${currentHighertaxonKey}&limit=100`
      )
        .then((res) => res.json())
        .then((data) => {
          setCurrentData(data.results);
          setAnimaliaLoading(false);
        });
    }
  };

  useEffect(() => {
    handleGetData();
  }, [currentRank]);

  const goToWiki = () => {
    document.location.href = `https://en.wikipedia.org/wiki/${currentParent.canonicalName}`;
  };

  const navMatch = useMediaQuery(theme.breakpoints.up("lg"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleDrawerClose = (index) => {
    setMenuTabs(index);
    setDrawerOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <img
        src={forestBackground}
        style={{
          position: "fixed",
          height: "100%",
          minWidth: "100%",
          zIndex: -1,
        }}
      />
      {!navMatch && (
        <>
          <AppBar
            position="fixed"
            style={{ backgroundColor: theme.palette.primary.dark }}
            elevation={15}
          >
            <Toolbar>
              <Button
                color="primary"
                style={{ padding: 0 }}
                onClick={() => setMenuTabs(0)}
              >
                <Typography variant="h5" color="textSecondary" align="center">
                  <Box fontWeight="fontWeightBold">Animal Tree</Box>
                </Typography>
              </Button>
              <Box ml="auto">
                <IconButton
                  edge="end"
                  color="inherit"
                  aria-label="menu"
                  onClick={handleDrawer}
                  style={{ height: theme.spacing(6), width: theme.spacing(6) }}
                >
                  <MenuOutlinedIcon
                    style={{
                      height: theme.spacing(4),
                      width: theme.spacing(4),
                    }}
                  />
                </IconButton>
              </Box>
            </Toolbar>
          </AppBar>
          <Drawer anchor="right" open={drawerOpen} onClose={handleDrawer}>
            <List style={{ backgroundColor: theme.palette.primary.dark }}>
              {[
                ["Home", <HouseOutlinedIcon />],
                ["Search", <SearchOutlinedIcon />],
                ["Animalia", <PetsOutlinedIcon />],
              ].map((item, i) => (
                <ListItem
                  key={`drawer-${i}`}
                  button
                  onClick={() => handleDrawerClose(i)}
                  style={
                    menuTabs === i
                      ? {
                          width: "13rem",
                          height: "4.2rem",
                          backgroundColor: theme.palette.secondary.main,
                          color: "white",
                        }
                      : { width: "13rem", height: "4.2rem", color: "white" }
                  }
                >
                  <ListItemIcon style={{ color: "white" }}>
                    {item[1]}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="body1" color="textSecondary">
                        {item[0]}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Drawer>
        </>
      )}
      <Box pt={navMatch ? 0 : 8}>
        <Grid container alignItems="stretch">
          {navMatch && (
            <Grid item xs={4} sm={3} lg={2} style={{ position: "fixed" }}>
              <Paper
                square
                elevation={15}
                style={{
                  height: "100vh",
                  backgroundColor: theme.palette.primary.dark,
                  borderTopRightRadius: "1.5rem",
                  borderBottomRightRadius: "1.5rem",
                }}
              >
                <Grid container>
                  <Grid item xs={12}>
                    <Box py={4}>
                      <Typography
                        variant="h5"
                        color="textSecondary"
                        align="center"
                      >
                        <Box fontWeight="fontWeightBold">Animal Tree</Box>
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Tabs
                      orientation="vertical"
                      indicatorColor="secondary"
                      textColor="secondary"
                      value={menuTabs}
                      onChange={handleMenuTabs}
                    >
                      {[
                        ["Home", <HouseOutlinedIcon />],
                        ["Search", <SearchOutlinedIcon />],
                        ["Animalia", <PetsOutlinedIcon />],
                      ].map((item, i) => (
                        <Tab
                          key={`menuTabs-${i}`}
                          label={item[0]}
                          icon={item[1]}
                        />
                      ))}
                    </Tabs>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          )}
          <Grid
            item
            xs={12}
            lg={10}
            style={navMatch ? { marginLeft: "16.5%" } : {}}
          >
            <Grid container>
              {navMatch && menuTabs !== 1 && (
                <Grid item xs={12}>
                  <Box px={navMatch ? 6 : 2} py={2}>
                    <Grid
                      container
                      justify="flex-end"
                      alignItems="center"
                      spacing={6}
                    >
                      <Grid item xs={5}>
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
                          value={searchField}
                          onChange={handleChangeSearch}
                          onKeyPress={(e) =>
                            e.key === "Enter" ? handleSearch() : null
                          }
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              )}
              {menuTabs === 0 && (
                <HomeTab
                  navMatch={navMatch}
                  setMenuTabs={setMenuTabs}
                  handleChangeSearch={handleChangeSearch}
                  handleSearch={handleSearch}
                  handleRank={handleRank}
                />
              )}
              {menuTabs === 1 && (
                <SearchTab
                  data={searchData}
                  loading={searchLoading}
                  zeroMatch={searchZeroMatch}
                  handleRank={handleRank}
                  searchField={searchField}
                  handleChangeSearch={handleChangeSearch}
                  handleSearch={handleSearch}
                  navMatch={navMatch}
                />
              )}
              {menuTabs === 2 && (
                <AnimaliaTab
                  currentData={currentData}
                  currentParent={currentParent}
                  currentBreadcrumb={currentBreadcrumb}
                  currentBreadcrumbRank={currentBreadcrumbRank}
                  currentRank={currentRank}
                  handleRank={handleRank}
                  loading={animaliaLoading}
                  goToWiki={goToWiki}
                  navMatch={navMatch}
                />
              )}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}

export default App;
