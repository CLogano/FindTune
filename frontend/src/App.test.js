import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import App from "./App";

// Mock the components to test routing without rendering their full implementation
jest.mock("./layout/login/Login", () => () => <div>Login Component</div>);
jest.mock("./layout/callback/Callback", () => () => <div>Callback Component</div>);
jest.mock("./layout/discover/Discover", () => () => <div>Discover Component</div>);

describe("App Component", () => {

    test("renders Login component for /login route", () => {
        render(
            <MemoryRouter initialEntries={["/login"]}>
                <App />
            </MemoryRouter>
        );
        expect(screen.getByText("Login Component")).toBeInTheDocument();
    });

    test("renders Callback component for /callback route", () => {
        render(
            <MemoryRouter initialEntries={["/callback"]}>
                <App />
            </MemoryRouter>
        );
        expect(screen.getByText("Callback Component")).toBeInTheDocument();
    });

    test("renders Discover component for /discover route", () => {
        render(
            <MemoryRouter initialEntries={["/discover"]}>
                <App />
            </MemoryRouter>
        );
        expect(screen.getByText("Discover Component")).toBeInTheDocument();
    });

    test("redirects to /login for root route", () => {
        render(
            <MemoryRouter initialEntries={["/"]}>
                <App />
            </MemoryRouter>
        );
        expect(screen.getByText("Login Component")).toBeInTheDocument();
    });

    test("renders 404 component for unknown route", () => {
        render(
            <MemoryRouter initialEntries={["/unknown"]}>
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="*" element={<div>404 Not Found</div>} />
                </Routes>
            </MemoryRouter>
        );
        expect(screen.getByText("404 Not Found")).toBeInTheDocument();
    });
});