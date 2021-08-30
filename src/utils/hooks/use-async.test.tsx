/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Simple from "../../Simple";

let container: Element | null = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

it("renders with or without a name", () => {
  act(() => {
    render(<Simple />, container);
  });

  expect(container!.textContent).toBe("Hallo, Stranger!");

  act(() => {
    render(<Simple name="Becker" />, container);
  });

  expect(container!.textContent).toBe("Hallo, Becker!");
});

afterEach(() => {
  unmountComponentAtNode(container!);
  container!.remove();
  container = null;
});
