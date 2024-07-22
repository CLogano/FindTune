import { render, screen } from "@testing-library/react";
import Login from "./Login";

// Mock the LoginButton component
jest.mock("./LoginButton", () => () => <div>Mocked LoginButton</div>);

// Mock the logo image
jest.mock("../../pictures/logo-white.png", () => "mocked-logo.png");

describe("Login component", () => {

  const originalInnerWidth = global.innerWidth;

  beforeAll(() => {
    // Mock window.resizeTo function to dispatch resize event
    global.resizeTo = (width) => {
      global.innerWidth = width;
      global.dispatchEvent(new Event("resize"));
    };
  });

  afterAll(() => {
    // Restore original window.innerWidth
    global.innerWidth = originalInnerWidth;
  });

  test("renders SmallScreenLayout when window width is <= 1024", () => {

    global.resizeTo(800);

    render(<Login />);

    expect(screen.getByText("Welcome Back!", { exact: false })).toBeInTheDocument();
    expect(screen.getByText("Mocked LoginButton")).toBeInTheDocument();
    expect(screen.getByText("Login securely using your Spotify account.", { exact: false })).toBeInTheDocument();
    expect(screen.getByText("© FindTune 2024. All rights reserved.", { exact: false })).toBeInTheDocument();
  });

  test("renders LargeScreenLayout when window width is > 1024", () => {

    global.resizeTo(1200);

    render(<Login />);

    expect(screen.getByText("Tired of hearing the same music? You\'re in the right place.", { exact: false })).toBeInTheDocument();
    expect(screen.getByText("FindTune")).toBeInTheDocument();
    expect(screen.getByText("Welcome Back!", { exact: false })).toBeInTheDocument();
    expect(screen.getByText("Mocked LoginButton")).toBeInTheDocument();
    expect(screen.getByText("Login securely using your Spotify account.", { exact: false })).toBeInTheDocument();
    expect(screen.getByText("© FindTune 2024. All rights reserved.", { exact: false })).toBeInTheDocument();
  });
});

