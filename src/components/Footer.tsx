import { type FilterValue } from '../types.d';
import { Filters } from './Filters';
import { type FC } from 'react';

interface Props {
  activeCount: number;
  completedCount: number;
  onClearCompleted: () => void;
  filterSelected: FilterValue;
  onFilterChange: (filter: FilterValue) => void;
}

export const Footer: FC<Props> = ({
  activeCount,
  completedCount,
  onClearCompleted,
  filterSelected,
  onFilterChange
}) => {
  return (
    <footer className='footer'>
      <span className='todo-count'>
        <strong>{activeCount}</strong> tareas pendientes
      </span>

      <Filters 
        filterSelected={filterSelected}
        onFilterChange={onFilterChange}
      />

      {completedCount > 0 && (
        <button className='clear-completed' onClick={onClearCompleted}>
          Borrar completadas
        </button>
      )}
    </footer>
  );
};