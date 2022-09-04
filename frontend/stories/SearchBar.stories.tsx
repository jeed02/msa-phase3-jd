import SearchBar from "../components/SearchBar";
import { Character } from "../models/Character";
import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import "../styles/globals.css";
import { screen, userEvent } from "@storybook/testing-library";

export default {
  title: "SearchBar",
  component: SearchBar,
} as ComponentMeta<typeof SearchBar>;

const Template: ComponentStory<typeof SearchBar> = (args) => (
  <SearchBar {...args} />
);

export const Search = Template.bind({});
Search.play = async () => {
  const searchBarInput = screen.getByLabelText("Enter a Character Name");

  await userEvent.type(searchBarInput, "Amber", { delay: 100 });

  const submitButton = screen.getByRole("button");

  await userEvent.click(submitButton);
};
