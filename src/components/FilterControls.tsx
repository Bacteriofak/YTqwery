import type { Filters } from '../types';

interface FilterControlsProps {
  filters: Filters;
  sort: string;
  onFilterChange: (next: Partial<Filters>) => void;
  onSortChange: (sort: string) => void;
}

function FilterControls({ filters, sort, onFilterChange, onSortChange }: FilterControlsProps) {
  return (
    <div className="grid-cols-2" style={{ gap: '16px' }}>
      <label>
        Минимум просмотров
        <input
          type="number"
          value={filters.minViews}
          min={0}
          onChange={event => onFilterChange({ minViews: Number(event.target.value) })}
        />
      </label>

      <label>
        Максимум просмотров
        <input
          type="number"
          value={filters.maxViews}
          min={0}
          onChange={event => onFilterChange({ maxViews: Number(event.target.value) })}
        />
      </label>

      <label>
        Опубликовано после
        <input
          type="date"
          value={filters.since}
          onChange={event => onFilterChange({ since: event.target.value })}
        />
      </label>

      <label>
        Сортировать по
        <select value={sort} onChange={event => onSortChange(event.target.value)}>
          <option value="relevance">Релевантность</option>
          <option value="views">Просмотры</option>
          <option value="likes">Лайки</option>
          <option value="publishedAt">Дата публикации</option>
        </select>
      </label>
    </div>
  );
}

export default FilterControls;
