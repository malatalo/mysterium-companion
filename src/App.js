import React from "react";
import "./App.css";
import MystTable from "./MystTable";
import Grid from "@material-ui/core/Grid";
import CoolButton from "./CoolButton";
import SetupDialog from "./SetupDialog";

const initState = {
  rows: [],
  suspects: [],
  locations: [],
  weapons: [],
  stories: [],
  showMurderer: false,
  setupDialogOpen: false,
  colors: [
    { color: "purple", selected: true },
    { color: "yellow", selected: true },
    { color: "blue", selected: true },
    { color: "black", selected: true },
    { color: "red", selected: true },
    { color: "white", selected: true }
  ],
  weaponsOrStories: "weapons",
  expansions: [
    { name: "Base game", short: "base", selected: true },
    { name: "Hidden Signs", short: "hs", selected: false },
    { name: "Secrets & Lies", short: "sl", selected: false }
  ]
};

export default class App extends React.Component {
  constructor() {
    super();

    this.cards = {
      base: {
        suspects: this.initArray(1, 18, ""),
        locations: this.initArray(19, 37, ""),
        weapons: this.initArray(38, 56, "")
      },
      hs: {
        suspects: this.initArray(1, 6, "HS"),
        locations: this.initArray(7, 12, "HS"),
        weapons: this.initArray(13, 18, "HS")
      },
      sl: {
        suspects: this.initArray(1, 6, "SL"),
        locations: this.initArray(7, 12, "SL"),
        weapons: this.initArray(13, 18, "SL"),
        stories: this.initArray(19, 36, "SL")
      }
    };

    this.suspectNumbers = [];
    this.locationNumbers = [];
    this.weaponNumbers = [];
    this.storyNumbers = [];

    this.suspects = [];
    this.locations = [];
    this.weapons = [];

    this.state = initState;
  }

  initArray = (start, end, prefix) => {
    return Array(end - start + 1)
      .fill()
      .map((_, idx) => prefix + (start + idx));
  };

  openCloseSetupDialog = bool => {
    this.setState({ setupDialogOpen: bool });
  };

  handleDialogColorChange = color => event => {
    let cols = this.state.colors;
    cols.filter(c => c.color === color).map(c => (c.selected = !c.selected));
    this.setState({ colors: cols });
  };

  handleDialogExpansionChange = exp => event => {
    let exps = this.state.expansions;
    exps.filter(e => e.short === exp).map(e => (e.selected = !e.selected));
    this.setState({ expansions: exps });
    if (exp === "sl") {
      if (this.state.expansions.find(e => e.short === "sl").selected === false)
        this.setState({ weaponsOrStories: "weapons" });
    }
  };

  handleDialogWeaponsOrStoriesChange = value => {
    this.setState({ weaponsOrStories: value });
  };

  resetGame = bool => {
    this.suspectNumbers = [];
    this.locationNumbers = [];
    this.weaponNumbers = [];
    this.storyNumbers = [];
    this.suspects = [];
    this.locations = [];
    this.weapons = [];
    this.stories = [];
    if (bool) this.setState(initState);
  };

  setupGame = () => {
    this.resetGame(false);
    this.state.expansions
      .filter(exp => exp.selected === true)
      .forEach(exp => {
        const ex = exp.short;
        this.suspectNumbers = this.suspectNumbers.concat(this.cards[ex].suspects);
        this.locationNumbers = this.locationNumbers.concat(this.cards[ex].locations);
        this.weaponNumbers = this.weaponNumbers.concat(this.cards[ex].weapons);
        if (ex === "sl") this.storyNumbers = this.storyNumbers.concat(this.cards[ex].stories);
      });

    if (
      this.suspectNumbers.length === 0 ||
      this.locationNumbers.length === 0 ||
      (this.weaponNumbers.length === 0 && this.storyNumbers.length === 0)
    ) {
      this.resetGame(true);
      return;
    }

    let rows = [];
    this.state.colors.forEach(color => {
      color.selected && this.randomizeRow(rows, color.color);
    });
    if (rows.length === 0) {
      this.setState({
        colors: this.state.colors.map(c => (c.selected = true))
      });
      this.resetGame(true);
      return;
    }
    rows[Math.floor(Math.random() * rows.length)].murderer = true;
    this.setState({ rows: rows, showMurderer: false });

    this.suspects = this.suspects.sort((a, b) => {
      if (isNaN(a) || isNaN(b)) {
        return a > b ? 1 : -1;
      }
      return a - b;
    });

    this.locations = this.locations.sort((a, b) => {
      if (isNaN(a) || isNaN(b)) {
        return a > b ? 1 : -1;
      }
      return a - b;
    });

    this.weapons = this.weapons.sort((a, b) => {
      if (isNaN(a) || isNaN(b)) {
        return a > b ? 1 : -1;
      }
      return a - b;
    });
  };

  toggleShowMurderer = () => {
    this.setState({ showMurderer: !this.state.showMurderer });
  };

  randomNumber = (min, max) => {
    return Math.floor(min + Math.random() * (max - min + 1));
  };

  randomizeRow = (rows, color) => {
    const suspectNumber = this.randomNumber(0, this.suspectNumbers.length - 1);
    const locationNumber = this.randomNumber(0, this.locationNumbers.length - 1);
    const suspect = this.suspectNumbers.splice(suspectNumber, 1);
    const location = this.locationNumbers.splice(locationNumber, 1);
    
    let weaponOrStory = null;
    if (this.state.weaponsOrStories === "weapons") {
      const weaponNumber = this.randomNumber(0, this.weaponNumbers.length - 1);
      weaponOrStory = this.weaponNumbers.splice(weaponNumber, 1);
    } else {
      const storyNumber = this.randomNumber(0, this.storyNumbers.length - 1);
      weaponOrStory = this.storyNumbers.splice(storyNumber, 1);
    }

    this.suspects.push(suspect);
    this.locations.push(location);
    this.weapons.push(weaponOrStory);

    rows.push({
      murderer: false,
      color: color,
      suspect: suspect,
      location: location,
      weapon: weaponOrStory
    });
  };

  render() {
    const gameStarted = this.state.rows.length > 0;

    return (
      <div className="App">
        <SetupDialog
          open={this.state.setupDialogOpen}
          openCloseSetupDialog={this.openCloseSetupDialog}
          setupGame={this.setupGame}
          colors={this.state.colors}
          expansions={this.state.expansions}
          handleDialogColorChange={this.handleDialogColorChange}
          handleDialogExpansionChange={this.handleDialogExpansionChange}
          handleDialogWeaponsOrStoriesChange={this.handleDialogWeaponsOrStoriesChange}
          weaponsOrStories={this.state.weaponsOrStories}
        />
        <div className="container">
          <CoolButton
            onClick={() => this.openCloseSetupDialog(true)}
            text={gameStarted ? "restart" : "start"}
          />
          &nbsp;
          {gameStarted && (
            <CoolButton
              onClick={this.toggleShowMurderer}
              text={this.state.showMurderer ? "Hide Murderer" : "Show Murderer"}
            />
          )}
          {gameStarted && (
            <div style={{ width: "100%" }}>
              <Grid
                className={"gridContainer"}
                container
                spacing={3}
                direction="row"
                justify="center"
                alignItems="center"
                alignContent="center"
                style={{ width: "90%", display: "inline-flex" }}
              >
                <Grid item xs={12} className={"gridTitle"}>
                  Suspects
                </Grid>
                {this.suspects.map(v => (
                  <Grid key={v} className={"transparentWhite"} item xs={2}>
                    {v}
                  </Grid>
                ))}
                <Grid item xs={12} className={"gridTitle"}>
                  Locations
                </Grid>
                {this.locations.map(v => (
                  <Grid key={v} className={"transparentWhite"} item xs={2}>
                    {v}
                  </Grid>
                ))}
                <Grid item xs={12} className={"gridTitle"}>
                  {this.state.weaponsOrStories == "weapons" ? "Weapons" : "Stories"}
                </Grid>
                {this.weapons.map(v => (
                  <Grid key={v} className={"transparentWhite"} item xs={2}>
                    {v}
                  </Grid>
                ))}
              </Grid>
              <MystTable rows={this.state.rows} showMurderer={this.state.showMurderer} weaponsOrStories={this.state.weaponsOrStories} />
            </div>
          )}
        </div>
      </div>
    );
  }
}
