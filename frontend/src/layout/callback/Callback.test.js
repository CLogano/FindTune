import { render, screen, waitFor } from "@testing-library/react";
import { useLocation, useNavigate } from "react-router-dom";
import Callback from "./Callback";

// Mock the useLocation and useNavigate hooks from react-router-dom
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useLocation: jest.fn(),
    useNavigate: jest.fn(),
}));

describe("Callback Component", () => {

    const mockNavigate = jest.fn();

    beforeEach(() => {
        // Mock the useNavigate function
        useNavigate.mockReturnValue(mockNavigate);

        // Clear localStorage before each test
        localStorage.clear();
    });

    test("extracts access token and navigates to /discover", async () => {
        // Mock the location object to simulate the URL hash
        useLocation.mockReturnValue({
            hash: "#access_token=mockAccessToken",
        });

        render(<Callback />);

        // Verify the access token is stored in localStorage
        await waitFor(() => {
            expect(localStorage.getItem("spotify_access_token")).toBe("mockAccessToken");
        });

        // Verify the user is navigated to the /discover page
        expect(mockNavigate).toHaveBeenCalledWith("/discover");

        // Verify the "Logging in..." text is displayed
        expect(screen.getByText('Logging in...', { exact: false })).toBeInTheDocument();
    });

    test("does not navigate if access token is not present", async () => {
        // Mock the location object to simulate the URL hash without access token
        useLocation.mockReturnValue({
            hash: "",
        });

        render(<Callback />);

        // Verify the access token is not stored in localStorage
        await waitFor(() => {
            expect(localStorage.getItem("spotify_access_token")).toBeNull();
        });

        // Verify the user is not navigated to the /discover page
        expect(mockNavigate).not.toHaveBeenCalled();

        // Verify the "No access token found. Unable to log in." text is displayed
        expect(screen.getByText('No access token found. Unable to log in.', { exact: false })).toBeInTheDocument();
    });
});