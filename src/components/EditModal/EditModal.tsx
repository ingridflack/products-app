import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  useToast,
} from "@chakra-ui/react";
import { Product } from "../ProductCard/ProductCard";
import { useState } from "react";
import * as ProductsService from "../../services/productsService";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  onProductEdit: (updatedProduct: Product) => void;
}

export default function EditModal({
  isOpen,
  onClose,
  product,
  onProductEdit,
}: EditModalProps) {
  const [formData, setFormData] = useState<Product>(product);
  const toast = useToast();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    setIsUpdating(true);
    e.preventDefault();

    try {
      await ProductsService.update(formData);
      onProductEdit(formData);

      toast({
        title: "Atualizado",
        description: "Produto atualizado com sucesso.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });

      onClose();
    } catch (error) {
      toast({
        title: "Oops!",
        description: "Houve um erro ao atualizar o produto. Tente novamente.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });

      console.error(error);
    } finally {
      setIsUpdating(false);
    }
  };

  const onFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onPriceChange = (_: string, valueAsNumber: number) => {
    setFormData({ ...formData, price: valueAsNumber });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar produto</ModalHeader>
        <ModalCloseButton />
        <form onSubmit={handleSubmit}>
          <ModalBody pb={6}>
            <FormControl marginBottom="8px">
              <FormLabel>Nome:</FormLabel>
              <Input
                placeholder="Nome do produto"
                defaultValue={product.name}
                value={formData.name}
                name="name"
                onChange={onFieldChange}
              />
            </FormControl>

            <FormControl marginBottom="8px">
              <FormLabel>Categoria:</FormLabel>
              <Input
                placeholder="Categoria do produto"
                defaultValue={product.categories}
                value={formData.categories}
                name="categories"
                onChange={onFieldChange}
              />
            </FormControl>

            <FormControl marginBottom="8px">
              <FormLabel>Marca:</FormLabel>
              <Input
                placeholder="Marca do produto"
                defaultValue={product.brand}
                value={formData.brand}
                name="brand"
                onChange={onFieldChange}
              />
            </FormControl>

            <FormControl marginBottom="8px">
              <FormLabel>Preço:</FormLabel>
              <NumberInput
                defaultValue={product.price}
                min={0}
                value={formData.price}
                name="price"
                onChange={onPriceChange}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              type="submit"
              isLoading={isUpdating}
            >
              Salvar
            </Button>
            <Button onClick={onClose} disabled={isUpdating}>
              Cancelar
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
