import { FILTERS_BUTTONS } from "../consts";
import { type FilterValue } from "../types";

interface Props {
  onFilterChange: (filter: FilterValue) => void
  filterSelected: FilterValue
}

export const Filters: React.FC<Props> = (
    { filterSelected, onFilterChange }
) => {
  return (
    <ul className="filters">
        {
            Object.entries(FILTERS_BUTTONS).map(([key, {href, literal }]) => {
                const isSelect = key === filterSelected
                const className = isSelect ? 'selected' : ''

                 return (
                    <li key ={key}>
                        <a 
                            href={href}
                            className={className}
                            onClick={(event) => {
                                event.preventDefault()
                                onFilterChange(key as FilterValue)
                            }}
                        >       
                            {literal}
                        </a>
                    </li>
                )
            })
        }
    </ul>
  );
};