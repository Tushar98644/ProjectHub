import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Card } from "@/components";

const mockFn = jest.fn();
const mockProject = {
    _id: "1",
    title: "Test Project",
    description: "This is a test project.",
    image: "/test-image.jpg",
    github: "https://localhost:3000/",
    approved: true,
    name: "Test User",
    tags: ["tag1", "tag2"],
    createdAt: new Date(),
    discussion: mockFn, // Mock function for discussion
};

describe("Card component", () => {
    beforeEach(() => {
        render(<Card {...mockProject} />);
    });

    it("renders the title", () => {
        const titleElement = screen.getByText("Test Project");
        expect(titleElement).toBeInTheDocument();
    });

    it("renders the description", () => {
        const descriptionElement = screen.getByText("This is a test project.");
        expect(descriptionElement).toBeInTheDocument();
    });

    it("renders the contributor name", () => {
        const contributorElement = screen.getByText("Contributor : Test User");
        expect(contributorElement).toBeInTheDocument();
    });

    it("renders the GitHub link with correct href", () => {
        const githubLink = screen.getByText("view github").closest("a");
        expect(githubLink).toBeInTheDocument();
        expect(githubLink).toHaveAttribute("href", mockProject.github);
    });

    it("renders the tags", () => {
        const tagElements = screen.getAllByText(/^# tag/);
        expect(tagElements).toHaveLength(2);
    });

    it("renders the Discussion button", () => {
        const discussionButton = screen.getByText("Discussion");
        expect(discussionButton).toBeInTheDocument();
    });

    it("calls the discussion function when Discussion button is clicked", async () => {
        const discussionButton = screen.getByText("Discussion").closest("a");
        expect(discussionButton).toBeInTheDocument();

        // Simulate a click on the Discussion button
        await userEvent.click(discussionButton!);
        expect(mockProject.discussion).toHaveBeenCalled();
    });
});
