import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  formControl: {
    margin: theme.spacing(3)
  },
  group: {
    margin: theme.spacing(1, 0)
  }
}));

export default function SetupDialog(props) {
  const classes = useStyles();
  const start = () => {
    props.openCloseSetupDialog(false);
    props.setupGame();
  };

  const cancel = () => {
    props.openCloseSetupDialog(false);
  };

  const handleRadioButtons = event => {
    props.handleDialogWeaponsOrStoriesChange(event.target.value);
  };

  return (
    <Dialog
      PaperProps={{
        style: {
          backgroundColor: "#90A4AE",
          maxWidth: "300px"
        }
      }}
      open={props.open}
      scroll={"body"}
      onClose={cancel}
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <h3>Select colors</h3>
        <DialogContent>
          {props.colors.map(c => (
            <span key={c.color}>
              <FormControlLabel
                key={c.color}
                control={
                  <Checkbox
                    checked={c.selected}
                    onChange={props.handleDialogColorChange(c.color)}
                    value={c.color}
                    style={{ color: c.color }}
                  />
                }
                label={c.color}
              />
              <br />
            </span>
          ))}
        </DialogContent>
        <h3>Select expansions</h3>
        <DialogContent>
          {props.expansions.map(exp => (
            <span key={exp.short}>
              <FormControlLabel
                key={exp.short}
                control={
                  <Checkbox
                    checked={exp.selected}
                    onChange={props.handleDialogExpansionChange(exp.short)}
                    value={exp.short}
                    style={{ color: "#B2EBF2" }}
                  />
                }
                label={exp.name}
              />
              <br />
            </span>
          ))}
        </DialogContent>
        {props.expansions.find(e => e.short === "sl").selected === true && <>
        <h3>Weapons or stories?</h3>
        <DialogContent>
          <RadioGroup
            className={classes.group}
            value={props.weaponsOrStories}
            onChange={handleRadioButtons}
          >
            <FormControlLabel
              disabled={props.expansions.find(e => e.short === "sl").selected !== true}
              value="weapons"
              control={<Radio style={{ color: "#B2EBF2" }} />}
              label="Weapons"
            />
            <FormControlLabel
              disabled={props.expansions.find(e => e.short === "sl").selected !== true}
              value="stories"
              control={<Radio style={{ color: "#B2EBF2" }} />}
              label="Stories"
            />
          </RadioGroup>
        </DialogContent>
        </>}
      </DialogContent>
      <DialogActions>
        <Button onClick={cancel} color="primary" style={{ color: "white" }}>
          Cancel
        </Button>
        <Button onClick={start} color="primary" style={{ color: "white" }}>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}
