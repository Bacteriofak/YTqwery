import type { FormEvent } from 'react';

interface SearchPanelProps {
  value: string;
  onSearch: (query: string) => void;
  loading: boolean;
}

function SearchPanel({ value, onSearch, loading }: SearchPanelProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const input = form.querySelector<HTMLInputElement>('input[name="query"]');
    if (input && input.value.trim()) {
      onSearch(input.value.trim());
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 14 }}>
      <label style={{ display: 'block' }}>
        Поиск видео и ниш YouTube
        <input name="query" defaultValue={value} placeholder="Введите тему или канал для анализа" />
      </label>
      <button type="submit" className="primary" disabled={loading}>
        {loading ? 'Идёт поиск...' : 'Начать анализ'}
      </button>
    </form>
  );
}

export default SearchPanel;
