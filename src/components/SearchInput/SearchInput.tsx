import { SearchIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { Filterable } from "../../shared/interfaces";

export default function SearchInput({ onFilterChange, filters }: Filterable) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, name: e.target.value });
  };

  return (
    <InputGroup marginBottom="6px">
      <InputLeftElement pointerEvents="none">
        <SearchIcon color="gray.300" />
      </InputLeftElement>
      <Input
        type="text"
        placeholder="Buscar..."
        variant="filled"
        onChange={handleInputChange}
        value={filters.name}
      />
    </InputGroup>
  );
}
