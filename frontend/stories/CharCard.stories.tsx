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
