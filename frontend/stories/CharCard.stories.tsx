import CharCard from "../components/CharCard";
import { Character } from "../models/Character";
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import "../styles/globals.css";

export default {
  title: "CharCard",
  component: CharCard,
} as ComponentMeta<typeof CharCard>;

const Template: ComponentStory<typeof CharCard> = (args) => (
  <CharCard {...args} />
);

export const Amber = Template.bind({});
const AmberInfo: Character = {
  name: "Amber",
  vision: "Pyro",
  weapon: "Bow",
  nation: "Mondstadt",
  affiliation: "Knights of Favonius",
  rarity: 4,
  constellation: "Lepus",
  birthday: "0000-08-10",
  description:
    "Always energetic and full of life, Amber's the best - albeit only - Outrider of the Knights of Favonius.",
};
Amber.args = {
  charInfo: AmberInfo,
  charName: "amber",
};

export const Raiden = Template.bind({});
const RaidenInfo: Character = {
  name: "Raiden Shogun",
  vision: "Electro",
  weapon: "Polearm",
  nation: "Inazuma",
  affiliation: "Inazuma City",
  rarity: 5,
  constellation: "Imperatrix Umbrosa",
  birthday: "0000-06-26",
  description:
    "Her Excellency, the Almighty, Narukami Ogosho, who promised the people of Inazuma an unchanging Eternity.",
};
Raiden.args = {
  charInfo: RaidenInfo,
  charName: "raiden",
};

export const Kazuha = Template.bind({});
const KazuhaInfo: Character = {
  name: "Kaedehara Kazuha",
  vision: "Anemo",
  weapon: "Sword",
  nation: "Inazuma",
  affiliation: "The Crux",
  rarity: 5,
  constellation: "Acer Palmatum",
  birthday: "0000-10-29",
  description:
    "If one's heart is empty, all under heaven is empty. But if one's heart is pure, all under heaven is pure.",
};
Kazuha.args = {
  charInfo: KazuhaInfo,
  charName: "kazuha",
};

export const Sara = Template.bind({});
const SaraInfo: Character = {
  name: "Kujou Sara",
  vision: "Electro",
  weapon: "Bow",
  nation: "Inazuma",
  affiliation: "Tenryou Commission",
  rarity: 4,
  constellation: "Flabellum",
  birthday: "0000-07-14",
  description:
    "A general of the Tenryou Commission. Bold, decisive, and skilled in battle.",
};
Sara.args = {
  charInfo: SaraInfo,
  charName: "sara",
};
