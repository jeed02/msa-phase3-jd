import React, { useState } from "react";
import { Grid, IconButton, TextField, Paper, Rating } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Character } from "../models/Character";
import axios from "axios";

const SearchBar = (props: {
  charName: string;
  setCharName: React.Dispatch<React.SetStateAction<string>>;
  charInfo: Character | null;
  setCharInfo: React.Dispatch<React.SetStateAction<Character | null>>;
}) => {
  const [charInput, setCharInput] = useState<string>("");
  const GENSHIN_BASE_API_URL = "https://api.genshin.dev/characters/";
  return (
    <div>
      <TextField
        id="search-bar"
        className="text"
        value={charInput}
        onChange={(prop: any) => {
          let name = prop.target.value;
          setCharInput(name);
          props.setCharName(
            prop.target.value.replace(/\s+/g, "-").toLowerCase()
          );
        }}
        label="Enter a Character Name..."
        variant="outlined"
        placeholder="Search..."
        size="small"
        sx={{
          "& .MuiInputLabel-root": { color: "white" }, //styles the label
          "& .MuiOutlinedInput-root": {
            "& > fieldset": { borderColor: "white" },
          },
          "& .MuiOutlinedInput-input": { color: "white" },
        }}
      />
      <IconButton
        aria-label="search"
        onClick={() => {
          search();
        }}
      >
        <SearchIcon style={{ fill: "white" }} />
      </IconButton>
    </div>
  );
  function search() {
    console.log(props.charName);
    if (props.charName === undefined || props.charName === "") {
      return;
    } else {
      props.setCharName(props.charName.replace(/\s+/g, "-").toLowerCase());
    }

    axios
      .get(GENSHIN_BASE_API_URL + props.charName?.toLowerCase())
      .then((res) => {
        let info = JSON.parse(JSON.stringify(res.data));
        props.setCharInfo(info);
      })
      .catch(() => {
        props.setCharInfo(null);
      });
  }
};

export default SearchBar;
