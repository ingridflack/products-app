import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { memo, useRef } from "react";
import DeleteProductAlert from "../DeleteProductAlert/DeleteProductAlert";
import EditModal from "../EditModal/EditModal";
import { format } from "../../utils/currencyFormatter";

export interface Product {
  _id: string;
  name: string;
  categories: string;
  price: number;
  image: string;
  brand: string;
}

interface ProductCardProps {
  product: Product;
  onProductDelete: (id: string) => void;
  onProductEdit: (updatedProduct: Product) => void;
}

function ProductCard({
  product,
  onProductDelete,
  onProductEdit,
}: ProductCardProps) {
  const {
    isOpen: deleteAlertIsOpen,
    onOpen: onOpenDeleteAlert,
    onClose: onCloseDeleteAlert,
  } = useDisclosure();
  const cancelRef = useRef(null);

  const {
    isOpen: editModalIsOpen,
    onOpen: onOpenEditModal,
    onClose: onCloseEditModal,
  } = useDisclosure();

  return (
    <Card width="100%" padding="16px" data-testid="product-card">
      <CardBody padding="0px">
        <Image
          src={product.image}
          alt={product.name}
          borderRadius="lg"
          width={600}
          height="auto"
          aspectRatio={1}
          objectFit={"contain"}
          fallbackSrc="https://placehold.jp/dedede/303030/600x600.png?text=Imagem%20n%C3%A3o%20dispon%C3%ADvel"
        />

        <Stack mt="6" spacing="3">
          <Heading size="sm">
            {product.name} - {product.brand}{" "}
          </Heading>

          <Box display="flex" flexDirection="column">
            <Badge
              width="fit-content"
              colorScheme="blue"
              color="black"
              fontSize="x-small"
              marginBottom="2"
            >
              {product.categories}
            </Badge>
          </Box>

          <Text color="blue.600" fontSize="md">
            {format(product.price.toString())}
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2">
          <Button
            variant="solid"
            colorScheme="blue"
            size="sm"
            onClick={onOpenEditModal}
          >
            Editar
          </Button>
          <Button
            variant="ghost"
            colorScheme="red"
            size="sm"
            onClick={onOpenDeleteAlert}
          >
            Excluir
          </Button>
        </ButtonGroup>
      </CardFooter>
      <DeleteProductAlert
        onClose={onCloseDeleteAlert}
        isOpen={deleteAlertIsOpen}
        cancelRef={cancelRef}
        product={product}
        onProductDelete={onProductDelete}
      />

      <EditModal
        isOpen={editModalIsOpen}
        onClose={onCloseEditModal}
        product={product}
        onProductEdit={onProductEdit}
      />
    </Card>
  );
}

export default memo(ProductCard);
