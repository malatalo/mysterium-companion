import React from "react";
import "./App.css";
import MystTable from "./MystTable";
import Grid from "@material-ui/core/Grid";
import CoolButton from "./CoolButton";
import ColorDialog from "./ColorDialog";

const suspectMM = { min: 1, max: 18 };
const locationMM = { min: 19, max: 37 };
const weaponMM = { min: 38, max: 56 };
let usedNumbers = [];

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      rows: [],
      showMurderer: false,
      colorDialogOpen: false,
      colors: [
        { color: "purple", selected: true },
        { color: "yellow", selected: true },
        { color: "blue", selected: true },
        { color: "black", selected: true },
        { color: "red", selected: true },
        { color: "white", selected: true }
      ]
    };
  }

  startGame = () => {
    usedNumbers = [];
    let rows = [];
    this.setState({ rows: [], showMurderer: false });
    this.state.colors.forEach(color => {
      if (color.selected) this.randomizeRow(rows, color.color);
    });
    if(rows.length === 0) {
      this.setState({colors: this.state.colors.map(c=>c.selected=true)})
      return
    }
    rows[Math.floor(Math.random() * rows.length)].murderer = true;
    this.setState({ rows: rows });
  };

  openColorDialog = () => {
    this.setState({ colorDialogOpen: true });
  };

  closeColorDialog = () => {
    this.setState({ colorDialogOpen: false });
  };

  setColors = colors => {
    this.setState({ colors: colors }, this.startGame());
  };

  toggleShowMurderer = () => {
    this.setState({ showMurderer: !this.state.showMurderer });
  };

  randomNumber = (min, max) => {
    let rand;
    do {
      rand = Math.floor(min + Math.random() * (max - min + 1));
    } while (usedNumbers.includes(rand));
    usedNumbers.push(rand);
    usedNumbers.sort((a, b) => a - b);
    return rand;
  };

  randomizeRow = (rows, color) => {
    const suspect = this.randomNumber(suspectMM.min, suspectMM.max);
    const location = this.randomNumber(locationMM.min, locationMM.max);
    const weapon = this.randomNumber(weaponMM.min, weaponMM.max);
    rows.push({
      murderer: false,
      color: color,
      suspect: suspect,
      location: location,
      weapon: weapon
    });
  };

  render() {
    const gameStarted = usedNumbers.length > 0;
    return (
      <div className="App">
        <ColorDialog
          open={this.state.colorDialogOpen}
          closeColorDialog={this.closeColorDialog}
          setColors={this.setColors}
          colors={this.state.colors}
        />
        <div className="container">
          <CoolButton
            onClick={this.openColorDialog}
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
            <div>
              <Grid
                className={"gridContainer"}
                container
                spacing={3}
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Grid item xs={12} className={"gridTitle"}>
                  Suspects
                </Grid>
                {usedNumbers.map(v =>
                  v < 19 ? (
                    <Grid key={v} className={"transparentWhite"} item xs={1}>
                      {v}
                    </Grid>
                  ) : (
                    ""
                  )
                )}
                <Grid item xs={12} className={"gridTitle"}>
                  Locations
                </Grid>
                {usedNumbers.map(v =>
                  v > 18 && v < 38 ? (
                    <Grid key={v} className={"transparentWhite"} item xs={1}>
                      {v}
                    </Grid>
                  ) : (
                    ""
                  )
                )}
                <Grid item xs={12} className={"gridTitle"}>
                  Weapons
                </Grid>
                {usedNumbers.map(v =>
                  v > 37 ? (
                    <Grid key={v} className={"transparentWhite"} item xs={1}>
                      {v}
                    </Grid>
                  ) : (
                    ""
                  )
                )}
              </Grid>
              <MystTable
                rows={this.state.rows}
                showMurderer={this.state.showMurderer}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}
