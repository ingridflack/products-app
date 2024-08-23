import { Box, Container, Heading } from "@chakra-ui/react";
import "./App.css";
import { useCallback, useEffect, useState } from "react";
import SearchInput from "./components/SearchInput/SearchInput";
import SideFilters from "./components/SideFilters/SideFilters";
import { Product } from "./components/ProductCard/ProductCard";
import * as ProductsService from "./services/productsService";
import { useDebounce } from "./hooks/useDebounce";
import { Filters } from "./shared/interfaces";
import ProductList from "./components/ProductList/ProductList";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [debouncedFilters, filters, setFilters] = useDebounce<Filters>(
    {
      brand: [],
      categories: [],
      minPrice: 0,
      maxPrice: 0,
      name: "",
    },
    1000
  );
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const fetchInitialData = async () => {
      const [brandsResponse, categoriesResponse] = await Promise.all([
        ProductsService.getBrands(),
        ProductsService.getCategories(),
      ]);

      setBrands(brandsResponse.data.payload);
      setCategories(categoriesResponse.data.payload);
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    const fetchProducts = async (filters: Filters) => {
      setIsFetching(true);
      try {
        const response = await ProductsService.list(filters);
        setProducts(response.data.payload);
      } catch (e) {
        console.log({ e });
      } finally {
        setIsFetching(false);
      }
    };

    fetchProducts(debouncedFilters);
  }, [debouncedFilters]);

  const onProductDelete = useCallback((id: string) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product._id !== id)
    );
  }, []);

  const onProductEdit = useCallback((updatedProduct: Product) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === updatedProduct._id ? updatedProduct : product
      )
    );
  }, []);

  return (
    <Container maxWidth={"auto"}>
      <Heading marginBottom="16px">Listagem de produtos</Heading>

      <Container display="flex" width="100%" maxWidth={"auto"} padding="0">
        <Box w="300px" maxW="100%" position="sticky" top="30px">
          <SearchInput onFilterChange={setFilters} filters={filters} />

          <SideFilters
            brands={brands}
            categories={categories}
            onFilterChange={setFilters}
            filters={filters}
          />
        </Box>

        <ProductList
          products={products}
          isLoading={isFetching}
          onProductDelete={onProductDelete}
          onProductEdit={onProductEdit}
        />
      </Container>
    </Container>
  );
}

export default App;
