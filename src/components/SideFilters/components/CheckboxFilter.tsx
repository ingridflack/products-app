import {
  AccordionItem,
  AccordionButton,
  Box,
  AccordionIcon,
  AccordionPanel,
  Checkbox,
  Stack,
} from "@chakra-ui/react";
import { memo } from "react";

interface CheckboxFilterProps {
  filterKey: string;
  title: string;
  selectAllLabel: string;
  options: string[];
  selectedOptions: string[];
  onCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectAllChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    options: string[]
  ) => void;
}

function CheckboxFilter({
  filterKey,
  title,
  selectAllLabel,
  options,
  selectedOptions,
  onCheckboxChange,
  onSelectAllChange,
}: CheckboxFilterProps) {
  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box as="span" flex="1" textAlign="left">
            {title}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <Box>
          <Checkbox
            isChecked={selectedOptions.length === options.length}
            onChange={(e) => onSelectAllChange(e, options)}
            name={filterKey}
          >
            {selectAllLabel}
          </Checkbox>
          <Stack pl={6} mt={1} spacing={1} direction="column">
            {options.map((item: string) => (
              <Checkbox
                key={item}
                isChecked={selectedOptions.includes(item)}
                onChange={onCheckboxChange}
                name={filterKey}
                value={item}
              >
                {item}
              </Checkbox>
            ))}
          </Stack>
        </Box>
      </AccordionPanel>
    </AccordionItem>
  );
}

export default memo(CheckboxFilter);
