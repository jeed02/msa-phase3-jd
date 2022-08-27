import type { NextPage } from "next";
import { Grid, IconButton, TextField, Paper, Rating } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import React, { useState } from "react";
import { Character } from "../models/Character";
import CharCard from "../components/CharCard";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [charName, setCharName] = useState<string>("");
  const [charInput, setCharInput] = useState<string>("");
  const [charInfo, setCharInfo] = useState<Character | null>(null);
  const GENSHIN_BASE_API_URL = "https://api.genshin.dev/characters/";

  return (
    <div className="main">
      <h1 className="title">Genshin Impact Search</h1>
      <div>
        <TextField
          id="search-bar"
          className="text"
          value={charInput}
          onChange={(prop: any) => {
            let name = prop.target.value;
            setCharInput(name);
            setCharName(prop.target.value.replace(/\s+/g, "-").toLowerCase());
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
        {charInfo === null ? (
          <p className="not-found">Character not found</p>
        ) : (
          <CharCard charInfo={charInfo} charName={charName} />
        )}
      </div>
    </div>
  );
  function search() {
    console.log(charName);
    if (charName === undefined || charName === "") {
      return;
    } else {
      setCharName(charName.replace(/\s+/g, "-").toLowerCase());
    }

    axios
      .get(GENSHIN_BASE_API_URL + charName?.toLowerCase())
      .then((res) => {
        let info = JSON.parse(JSON.stringify(res.data));
        setCharInfo(info);
      })
      .catch(() => {
        setCharInfo(null);
      });
  }
};

export default Home;
