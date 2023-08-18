import { render, screen } from "@testing-library/react";
import { Card } from "@/components";
import axios from "axios";

jest.mock("axios");

describe("Card component", () => {
    it("should render Card component for each project", async () => {
        const mockData = [
            {
                _id: "1",
                title: "Project 1",
                description: "good",
                image: "good",
                name: "good",
                aapproved: true,
            },
        ];

        (
            axios.get as jest.MockedFunction<typeof axios.get>
        ).mockResolvedValueOnce({ data: mockData });

        render(
            <Card
                _id={""}
                title={""}
                description={""}
                image={""}
                github={""}
                approved={false}
                name={""}
            />
        );

        const cards = await screen.findAllByTestId("card");
        expect(cards).toHaveLength(mockData.length);
    });
});
