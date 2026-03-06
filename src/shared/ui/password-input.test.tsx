import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PasswordInput } from "./password-input";

describe("PasswordInput", () => {
  it('renders with type="password" by default', () => {
    render(<PasswordInput aria-label="password" />);
    const input = screen.getByLabelText("password");
    expect(input).toHaveAttribute("type", "password");
  });

  it('switches type to "text" when clicking on the button', async () => {
    render(<PasswordInput aria-label="password" />);

    const input = screen.getByLabelText("password");
    const toggleButton = screen.getByRole("button");

    expect(input).toHaveAttribute("type", "password");

    await userEvent.click(toggleButton);
    expect(input).toHaveAttribute("type", "text");
  });

  it('switches type to "password" when clicking on the button again', async () => {
    render(<PasswordInput aria-label="password" />);

    const input = screen.getByLabelText("password");
    const toggleButton = screen.getByRole("button");

    expect(input).toHaveAttribute("type", "password");

    await userEvent.click(toggleButton);
    await userEvent.click(toggleButton);

    expect(input).toHaveAttribute("type", "password");
  });
});
