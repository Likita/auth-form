import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import { AuthProvider, useAuth } from "../auth";
import { getUser, verifyPassword } from "~/services/db";
import { jest } from "@jest/globals";
import React, { ReactNode } from "react";

jest.mock("~/services/db", () => {
  return {
    getUser: jest.fn<() => Promise<{ email: string; name: string; password: string }>>(),
    verifyPassword: jest.fn<() => Promise<boolean>>()
  };
});

describe("AuthProvider", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  const TestComponent = ({ children }: { children?: ReactNode }): React.ReactNode => (
    <AuthProvider>{children}</AuthProvider>
  );

  test("initializes user from localStorage", async () => {
    const storedUser = JSON.stringify({ email: "test@example.com", name: "Test User" });
    localStorage.setItem("user", storedUser);

    await act(async () => {
      render(
        <TestComponent>
          <TestChild />
        </TestComponent>
      );
    });

    expect(screen.getByText("Authenticated: true")).toBeInTheDocument();
  });

  test("login sets user and stores in localStorage", async () => {
    (getUser as jest.MockedFunction<typeof getUser>).mockResolvedValue({ email: "test@example.com", name: "Test User", password: "hashed" });
    (verifyPassword as jest.MockedFunction<typeof verifyPassword>).mockResolvedValue(true);

    let auth: ReturnType<typeof useAuth>;

    function TestLogin() {
      auth = useAuth();
      return null;
    }

    await act(async () => {
      render(
        <TestComponent>
          <TestLogin />
        </TestComponent>
      );
    });

    await act(async () => {
      await auth!.login("test@example.com", "password");
    });

    expect(localStorage.getItem("user")).toEqual(
      JSON.stringify({ email: "test@example.com", name: "Test User" })
    );
  });

  test("logout clears user from state and localStorage", async () => {
    const storedUser = JSON.stringify({ email: "test@example.com", name: "Test User" });
    localStorage.setItem("user", storedUser);

    let auth: ReturnType<typeof useAuth>;

    function TestLogout() {
      auth = useAuth();
      return null;
    }

    await act(async () => {
      render(
        <TestComponent>
          <TestLogout />
        </TestComponent>
      );
    });

    await act(async () => {
      auth!.logout();
    });

    expect(localStorage.getItem("user")).toBeNull();
  });
});

function TestChild() {
  const auth = useAuth();
  return <div>Authenticated: {String(auth.isAuthenticated)}</div>;
}