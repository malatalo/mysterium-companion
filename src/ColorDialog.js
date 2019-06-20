import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

const checkboxTheme = createMuiTheme({
  checkbox: { checkedColor: "white" }
});

export default class ColorDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = { colors: props.colors };
  }

  start = () => {
    this.props.closeColorDialog();
    this.props.setColors(this.state.colors);
  };

  cancel = () => {
    this.props.closeColorDialog();
  };

  handleChange = color => event => {
    let cols = this.state.colors;
    cols.filter(c => c.color === color).map(c => (c.selected = !c.selected));
    // cols.(c => {
    //   if (c.color === color) c.selected = !c.selected;
    // });
    this.setState({ colors: cols });
  };

  render() {
    return (
      <Dialog
        PaperProps={{
          style: {
            backgroundColor: "#90A4AE",
          }
        }}
        open={this.props.open}
        onClose={this.cancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Which colors are in use?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {this.state.colors.map(c => (
              <span key={c.color}>
                <FormControlLabel
                  key={c.color}
                  control={
                    <ThemeProvider theme={checkboxTheme}>
                      <Checkbox
                        checked={c.selected}
                        onChange={this.handleChange(c.color)}
                        value={c.color}
                        style={{ color: c.color }}
                      />
                    </ThemeProvider>
                  }
                  label={c.color}
                />
                <br />
              </span>
            ))}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={this.cancel}
            color="primary"
            style={{ color: "white" }}
          >
            Cancel
          </Button>
          <Button
            onClick={this.start}
            color="primary"
            style={{ color: "white" }}
          >
            Start
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
