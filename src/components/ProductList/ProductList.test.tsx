import { describe, expect, it, vi } from "vitest";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductList from "./ProductList";
import { productsMock } from "../../mock/productsMock";

// @vitest-environment jsdom

describe("ProductList", () => {
  it("renders product cards when isLoading is false", () => {
    render(
      <ProductList
        products={productsMock}
        isLoading={false}
        onProductDelete={vi.fn()}
        onProductEdit={vi.fn()}
      />
    );

    const productCards = screen.getAllByTestId("product-card");

    expect(productCards).toHaveLength(productsMock.length);
  });
});
