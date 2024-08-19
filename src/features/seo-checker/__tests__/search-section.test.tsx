import { screen, rtlRender, fireEvent } from "@/testing/test-utils";
import SearchSection from "../components/search-section";
import userEvent from "@testing-library/user-event";

const mockHandleOnChange = vi.fn();
const mockHandleSearch = vi.fn();

test("renders SearchSection correctly with given props", async () => {
  await rtlRender(
    <SearchSection
      inputValue="https://example.com"
      handleOnchange={mockHandleOnChange}
      handleSearch={mockHandleSearch}
    />
  );

  // Check for the presence of the input field with the correct value
  const inputElement = screen.getByPlaceholderText("Type URL");
  expect(inputElement).toBeInTheDocument();
  expect(inputElement).toHaveValue("https://example.com");

  // Check for the presence of the Submit button
  const buttonElement = screen.getByRole("button", { name: /Submit/i });
  expect(buttonElement).toBeInTheDocument();

  // Check for default classes
  expect(buttonElement).toHaveClass("w-20");
});

test("calls handleOnChange when the input value changes", async () => {
  await rtlRender(
    <SearchSection
      inputValue=""
      handleOnchange={mockHandleOnChange}
      handleSearch={mockHandleSearch}
    />
  );

  // Simulate user typing in the input field
  const inputElement = screen.getByPlaceholderText("Type URL");
  await userEvent.type(inputElement, "https://new-url.com");

  // Ensure the handleOnchange function is called
  expect(mockHandleOnChange).toHaveBeenCalled();
  expect(mockHandleOnChange).toHaveBeenCalledWith(expect.any(Object));
});

test("calls handleSearch when the submit button is clicked", async () => {
  await rtlRender(
    <SearchSection
      inputValue="https://example.com"
      handleOnchange={mockHandleOnChange}
      handleSearch={mockHandleSearch}
    />
  );

  // Simulate button click
  const buttonElement = screen.getByRole("button", { name: /Submit/i });
  fireEvent.click(buttonElement);

  // Ensure the handleSearch function is called
  expect(mockHandleSearch).toHaveBeenCalled();
});
