import { Accordion, FormControl } from "@chakra-ui/react";
import { useCallback } from "react";
import PriceFilter from "./components/PriceFilter";
import CheckboxFilter from "./components/CheckboxFilter";
import { Filterable } from "../../shared/interfaces";

interface SideFiltersProps extends Filterable {
  brands: string[];
  categories: string[];
}

export default function SideFilters({
  brands,
  filters,
  categories,
  onFilterChange,
}: SideFiltersProps) {
  const handlePriceChange = useCallback(
    (name: string, value: number) => {
      onFilterChange((filters) => ({
        ...filters,
        [name]: value,
      }));
    },
    [onFilterChange]
  );

  const handleCheckboxChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, checked, value } = event.target;

      onFilterChange((filters) => {
        if (!Array.isArray(filters[name])) {
          return filters;
        }

        const updatedValue = checked
          ? [...filters[name], value]
          : filters[name].filter((option) => option !== value);

        return {
          ...filters,
          [name]: updatedValue,
        };
      });
    },
    [onFilterChange]
  );

  const handleSelectAllChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, options: string[]) => {
      const { name, checked } = event.target;

      onFilterChange((filters) => ({
        ...filters,
        [name]: checked ? options : [],
      }));
    },
    [onFilterChange]
  );

  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
        width: "300px",
        maxWidth: "100%",
      }}
    >
      <FormControl>
        <Accordion
          defaultIndex={[0, 1, 2]}
          allowMultiple
          overflow="auto"
          height="80vh"
        >
          <CheckboxFilter
            filterKey="categories"
            title="Categorias"
            selectAllLabel="Todas as categorias"
            options={categories}
            selectedOptions={filters.categories}
            onCheckboxChange={handleCheckboxChange}
            onSelectAllChange={handleSelectAllChange}
          />
          <CheckboxFilter
            title="Marcas"
            filterKey="brand"
            selectAllLabel="Todas as marcas"
            options={brands}
            selectedOptions={filters.brand}
            onCheckboxChange={handleCheckboxChange}
            onSelectAllChange={handleSelectAllChange}
          />
          <PriceFilter
            onChange={handlePriceChange}
            minPrice={filters.minPrice}
            maxPrice={filters.maxPrice}
          />
        </Accordion>
      </FormControl>
    </form>
  );
}
