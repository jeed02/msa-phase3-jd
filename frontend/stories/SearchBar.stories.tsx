import SearchBar from "../components/SearchBar";
import { Character } from "../models/Character";
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import "../styles/globals.css";

export default {
  title: "SearchBar",
  component: SearchBar,
} as ComponentMeta<typeof SearchBar>;

const Template: ComponentStory<typeof SearchBar> = (args) => (
  <SearchBar {...args} />
);
