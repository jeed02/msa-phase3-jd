import React from "react";
import { Grid, IconButton, TextField, Paper, Rating } from "@mui/material";
import { Character } from "../models/Character";

const CharCard = (props: { charInfo: Character; charName: string }) => {
  const GENSHIN_BASE_API_URL = "https://api.genshin.dev/characters/";
  return (
    <div className="char-result">
      <Paper sx={{ backgroundColor: getBackgroundColor() }}>
        <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item md={3}>
            <img src={GENSHIN_BASE_API_URL + props.charName + "/gacha-card"} />
          </Grid>
          <Grid item md={9}>
            <div className="char-items">
              <Grid container>
                <Grid item md={6}>
                  <h1 className="title">{props.charInfo.name}</h1>
                  <p className="constellation">
                    {props.charInfo.constellation}
                  </p>
                  <Rating
                    name="read-only"
                    value={props.charInfo.rarity}
                    readOnly
                  />
                </Grid>
                <Grid item md={6}>
                  <img
                    src={getElement(props.charInfo.vision)}
                    alt=""
                    style={{
                      height: "50px",
                      margin: "40px auto",
                      float: "right",
                      paddingRight: "2em",
                    }}
                  />
                </Grid>
              </Grid>

              <p>{props.charInfo.description}</p>
              <table className="char-info">
                <tr>
                  <td className="char-info-header">Weapon:</td>
                  <td>{props.charInfo.weapon}</td>
                </tr>
                <tr>
                  <td className="char-info-header">Vision:</td>
                  <td>{props.charInfo.vision}</td>
                </tr>
                <tr>
                  <td className="char-info-header">Nation:</td>
                  <td>{props.charInfo.nation}</td>
                </tr>
                <tr>
                  <td className="char-info-header">Affiliation:</td>
                  <td>{props.charInfo.affiliation}</td>
                </tr>
              </table>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
  function getBackgroundColor() {
    let backColor = "#2d325a";
    return backColor;
  }

  function getElement(vision: string) {
    switch (vision) {
      case "Anemo":
        return "/images/Element_Anemo.png";
      case "Cryo":
        return "/images/Element_Cryo.png";
      case "Electro":
        return "/images/Element_Electro.png";
      case "Geo":
        return "/images/Element_Geo.png";
      case "Hydro":
        return "/images/Element_Hydro.png";
      case "Pyro":
        return "/images/Element_Pyro.png";
    }
  }
};

export default CharCard;
