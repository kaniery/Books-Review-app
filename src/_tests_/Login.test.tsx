import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import LoginForm from "../components/LoginForm";

describe("LoginForm", () => {
  it("renders the login form", () => {
    render(<LoginForm onSubmit={vi.fn()} />);

    expect(screen.getByLabelText("メールアドレス")).toBeInTheDocument();
    expect(screen.getByLabelText("パスワード")).toBeInTheDocument();
    expect(screen.getAllByText("ログイン")[1]).toBeInTheDocument();
  });

  it("shows error message when email or password empty", async () => {
    render(<LoginForm onSubmit={vi.fn()} />);

    fireEvent.submit(screen.getByRole("form"));

    await waitFor(() => {
      expect(
        screen.getByText("メールアドレスとパスワードは必須です")
      ).toBeInTheDocument();
    });
  });

  it("correct values when form is submitted", async () => {
    const handleSubmit = vi.fn();
    render(<LoginForm onSubmit={handleSubmit} />);

    fireEvent.change(screen.getByLabelText("メールアドレス"), {
      target: { value: "user@example.com" },
    });

    fireEvent.change(screen.getByLabelText("パスワード"), {
      target: { value: "password" },
    });

    fireEvent.click(screen.getByRole("button", { name: "ログイン" }));

    await waitFor(() => {
      // スパイが呼び出されたことを確認
      expect(handleSubmit).toHaveBeenCalled();
      expect(handleSubmit).toHaveBeenCalledWith("user@example.com", "password");
    });
  });

  it("displays a success message after successful login", async () => {
    render(<LoginForm onSubmit={vi.fn()} />);

    fireEvent.change(screen.getByLabelText("メールアドレス"), {
      target: { value: "user@example.com" },
    });

    fireEvent.change(screen.getByLabelText("パスワード"), {
      target: { value: "password" },
    });

    fireEvent.click(screen.getByRole("button", { name: "ログイン" }));

    await waitFor(() => {
      expect(screen.getByText("ログインが完了しました")).toBeInTheDocument();
    });
  });
});
