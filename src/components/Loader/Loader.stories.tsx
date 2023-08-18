/* eslint-disable storybook/story-exports */
/* eslint-disable storybook/default-exports */
import type { Meta, StoryObj } from "@storybook/react";
import Loader from "./Loader";

const meta: Meta<typeof Loader> = {
    title: "Loader",
    component: Loader,
    parameters: {
        controls: { expanded: true },
    },
};

export default meta;

type Story = StoryObj<typeof Loader>;

export const Default: Story = {
    args: {},
};
