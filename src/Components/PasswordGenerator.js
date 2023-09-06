import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  IconButton,
  Stack,
  Tooltip,
} from "@mui/material";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import StorageIcon from "@mui/icons-material/Storage";
import DisplayTable from "./Table";
import { generatePassword } from "../helper/helper";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

function PasswordGenerator() {
  const [alphabets, setAlphabets] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [special, setSpecial] = useState(false);
  const [password, setPassword] = useState("");
  const [storage, setStorage] = useState([]);
  const [show, setShow] = useState(false);
  useEffect(() => {
    let pass = JSON.parse(localStorage.getItem("password"));
    if (pass) {
      setStorage(pass);
    }
  }, []);

  const handleClick = () => {
    if (alphabets || numbers || special) {
      const pass = generatePassword(alphabets, numbers, special);
      setPassword(pass);
      if (storage) {
        setStorage([
          ...storage,
          { sl: storage.length + 1, password: pass, created: new Date() },
        ]);
        localStorage.setItem("password", JSON.stringify(storage));
      }
    } else {
      alert("please select one of the checkboxes");
    }
  };

  const onChangeCheck = (e) => {
    let val = e.target.value;

    switch (val) {
      case "numbers":
        setNumbers(!numbers);
        break;
      case "alphabets":
        setAlphabets(!alphabets);
        break;
      case "special":
        setSpecial(!special);
        break;
      default:
    }
  };

  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      alignItems="center"
      marginTop={3}
      direction="column"
    >
      <Grid
        item
        alignContent="center"
        onClick={() => {
          navigator.clipboard.writeText(password);
        }}
      >
        <h2>{password}</h2>
        <Tooltip title="Click on generated password to copy">
          <IconButton>
            <HelpOutlineIcon />
          </IconButton>
        </Tooltip>
      </Grid>
      <Grid item alignContent="center">
        <FormControl component="fieldset">
          <FormLabel component="legend">
            Select what you want to include in your password.
          </FormLabel>
          <FormGroup aria-label="position" row>
            <FormControlLabel
              value="alphabets"
              control={<Checkbox />}
              label="Alphabets"
              labelPlacement="end"
              onChange={onChangeCheck}
            />
            <FormControlLabel
              value="numbers"
              control={<Checkbox />}
              label="Numbers"
              labelPlacement="end"
              onChange={onChangeCheck}
            />
            <FormControlLabel
              value="special"
              control={<Checkbox />}
              label="Special Charecters"
              labelPlacement="end"
              onChange={onChangeCheck}
            />
          </FormGroup>
        </FormControl>
      </Grid>
      <Grid item alignContent="center">
        <Stack direction="row" spacing={3}>
          <Button
            variant="contained"
            color="success"
            startIcon={<SettingsSuggestIcon />}
            onClick={handleClick}
          >
            Generate Password
          </Button>
          <Button
            variant="contained"
            endIcon={<StorageIcon />}
            onClick={() => setShow(!show)}
          >
            Stored password
          </Button>
        </Stack>
      </Grid>
      <Grid item alignContent="center" margin={5}>
        {show ? <DisplayTable rows={storage.slice(-5)} /> : ""}
      </Grid>
    </Grid>
  );
}

export default PasswordGenerator;
