/* eslint-disable storybook/story-exports */
import { Meta, StoryObj } from "@storybook/react";
import Card from "./Card";

const meta: Meta<typeof Card> = {
    title: "Card",
    component: Card,
};

export default meta;

type story = StoryObj<typeof Card>;

export const Default: story = {
    args: {
        title: "title",
        description: "description",
        image: "https://chat.openai.com/?model=text-davinci-002-render-sha",
        github: "https://chat.openai.com/?model=text-davinci-002-render-sha",
    },
};
