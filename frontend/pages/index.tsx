import type { NextPage } from "next";
import { Grid, IconButton, TextField, Paper, Rating } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import React, { useState } from "react";
import { Character } from "../models/Character";
import CharCard from "../components/CharCard";
import SearchBar from "../components/SearchBar";
import Head from "next/head";
import Image from "next/image";

const Home: NextPage = () => {
  const [charName, setCharName] = useState<string>("");
  const [charInfo, setCharInfo] = useState<Character | null>(null);

  return (
    <div className="main">
      <h1 className="title">Genshin Impact Search</h1>
      <div>
        <SearchBar
          charName={charName}
          setCharName={setCharName}
          charInfo={charInfo}
          setCharInfo={setCharInfo}
        />
        {charInfo === null ? (
          <p className="not-found">Character not found</p>
        ) : (
          <CharCard charInfo={charInfo} charName={charName} />
        )}
      </div>
    </div>
  );
};

export default Home;
