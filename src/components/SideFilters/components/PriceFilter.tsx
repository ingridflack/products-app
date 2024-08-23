import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Divider,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import { memo } from "react";

interface PriceFilterProps {
  onChange: (name: string, value: number) => void;
  minPrice?: number;
  maxPrice?: number;
}

function PriceFilter({ onChange, minPrice, maxPrice }: PriceFilterProps) {
  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box as="span" flex="1" textAlign="left">
            Preço
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <Box>
          <FormLabel>Mínimo</FormLabel>
          <NumberInput
            onChange={(_, value) => onChange("minPrice", value)}
            defaultValue={minPrice}
            min={0}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper
                onClick={(param) => console.log("oi", param)}
              />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>

          <Divider marginY="6px" />

          <FormLabel>Máximo</FormLabel>
          <NumberInput
            onChange={(_, value) => onChange("maxPrice", value)}
            defaultValue={maxPrice}
            min={minPrice}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Box>
      </AccordionPanel>
    </AccordionItem>
  );
}

export default memo(PriceFilter);
