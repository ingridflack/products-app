import { ReactNode } from "react";
import {
  Box,
  Container,
  Grid,
  Skeleton,
  SkeletonText,
  Text,
} from "@chakra-ui/react";
import ProductCard, { Product } from "../ProductCard/ProductCard";

interface ProductsGridProps {
  products: Product[];
  isLoading: boolean;
  onProductDelete: (id: string) => void;
  onProductEdit: (updatedProduct: Product) => void;
}

function ProductGrid({ children }: { children: ReactNode }) {
  return (
    <Container width="100%" maxWidth={"auto"}>
      <Grid
        templateColumns={[
          "1fr",
          "repeat(1, 1fr)",
          "repeat(2, 1fr)",
          "repeat(3, 1fr)",
          "repeat(4, 1fr)",
        ]}
        gap={4}
        width="100%"
      >
        {children}
      </Grid>
    </Container>
  );
}

export default function ProductList({
  products,
  isLoading,
  onProductDelete,
  onProductEdit,
}: ProductsGridProps) {
  if (isLoading) {
    return (
      <ProductGrid>
        {[...Array(8)].map((_, index) => (
          <Box key={index} padding="6" boxShadow="lg" bg="white">
            <Skeleton height="200px" />
            <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
          </Box>
        ))}
      </ProductGrid>
    );
  }

  return (
    <ProductGrid>
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          onProductDelete={onProductDelete}
          onProductEdit={onProductEdit}
        />
      ))}

      {!products.length && <Text>Nenhum produto encontrado.</Text>}
    </ProductGrid>
  );
}
