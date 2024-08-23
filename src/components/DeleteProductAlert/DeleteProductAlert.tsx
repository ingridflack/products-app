import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import * as ProductsService from "../../services/productsService";
import { useToast } from "@chakra-ui/react";
import { Product } from "../ProductCard/ProductCard";
import { useState } from "react";

interface DeleteProductAlertProps {
  isOpen: boolean;
  onClose: () => void;
  cancelRef: React.RefObject<HTMLButtonElement>;
  product: Product;
  onProductDelete: (id: string) => void;
}

export default function DeleteProductAlert({
  isOpen,
  onClose,
  cancelRef,
  product,
  onProductDelete,
}: DeleteProductAlertProps) {
  const toast = useToast();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      await ProductsService.remove(product._id);
      onProductDelete(product._id);

      toast({
        title: "Excluído",
        description: "Produto excluído com sucesso.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });

      onClose();
    } catch (error) {
      toast({
        title: "Oops!",
        description: "Houve um erro ao excluir o produto. Tente novamente.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });

      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Excluir produto
          </AlertDialogHeader>

          <AlertDialogBody>
            Você tem certeza que deseja excluir <strong>{product.name}</strong>?
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose} disabled={isDeleting}>
              Cancelar
            </Button>
            <Button colorScheme="red" onClick={handleDelete} ml={3} isLoading={isDeleting}>
              Excluir
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
