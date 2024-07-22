import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginButton from "./LoginButton";
import CONSTANTS from "../../constants";

// Mock spotify icon
jest.mock("../../pictures/spotify-icon-white.png", () => "mocked-icon.png");

// Mock CONSTANTS
jest.mock("../../constants", () => ({
    frontendURL: "http://localhost:3000",
}));

describe("LoginButton component", () => {

    const originalLocation = window.location;

    beforeAll(() => {
        // Mock window.location
        delete window.location;
        window.location = {
            href: "",
        };
    });

    afterAll(() => {
        window.location = originalLocation;
    });

    test("renders LoginButton component", () => {

        render(<LoginButton />);

        expect(screen.getByAltText("Spotify icon", { exact: false })).toBeInTheDocument();
        expect(screen.getByText("Login with Spotify", { exact: false })).toBeInTheDocument();
    });

    test("redirects to Spotify authorization URL on click", () => {

        render(<LoginButton />);

        const buttonElement = screen.getByRole("button");
        userEvent.click(buttonElement);

        const redirectUri = CONSTANTS.frontendURL + "/callback";
        const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
        const scopes = "user-read-private user-read-email";
        const expectedUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}`;

        expect(window.location.href).toBe(expectedUrl);
    });
});