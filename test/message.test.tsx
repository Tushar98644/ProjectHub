import React from "react";
import { render, screen } from "@testing-library/react";
import { Message_list } from "@/components";

// Mock message data based on the Message interface
const messageData = {
    _id: "1",
    name: "User",
    email: "user@example.com",
    message: "This is a test message.",
    createdAt: new Date(),
};

describe("Message_list component", () => {
    it("renders name correctly", () => {
        render(<Message_list {...messageData} />);
        const nameElement = screen.getByText("User");
        expect(nameElement).toBeInTheDocument();
    });

    it("renders email correctly", () => {
        render(<Message_list {...messageData} />);
        const emailElement = screen.getByText("user@example.com");
        expect(emailElement).toBeInTheDocument();
    });

    it("renders message correctly", () => {
        render(<Message_list {...messageData} />);
        const messageElement = screen.getByText("This is a test message.");
        expect(messageElement).toBeInTheDocument();
    });
});
