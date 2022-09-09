import type { NextPage } from "next";
import { Grid, IconButton, TextField, Paper, Rating } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { Character } from "../models/Character";
import CharCard from "../components/CharCard";
import SearchBar from "../components/SearchBar";
import Head from "next/head";
import Image from "next/image";
import { gsap, Power1 } from "gsap";

const Home: NextPage = () => {
  const [charName, setCharName] = useState<string>("");
  const [charInfo, setCharInfo] = useState<Character | null>(null);

  useEffect(() => {
    gsap.from(".char-result", { y: "200", ease: Power1.easeOut, opacity: 0 });
  });

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
        {charInfo == null ? (
          <p className="not-found">Character not found</p>
        ) : (
          <CharCard charInfo={charInfo} charName={charName} />
        )}
      </div>
    </div>
  );
};

export default Home;
