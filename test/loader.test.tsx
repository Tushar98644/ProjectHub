import React from "react";
import { render } from "@testing-library/react";
import { Loader } from "@/components"; // Adjust the import path as needed

describe("Loader component", () => {
    it("has 6 child div elements", () => {
        const { container } = render(<Loader />);
        const parentDiv = container.querySelector(".cube");
        const childDivs = parentDiv!.querySelectorAll("div");
        expect(childDivs.length).toBe(6);
    });
});
