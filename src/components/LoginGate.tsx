import type { FormEvent } from 'react';

interface LoginGateProps {
  onLogin: (password: string) => void;
  error?: string;
}

function LoginGate({ onLogin, error }: LoginGateProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const input = form.querySelector<HTMLInputElement>('input[name="password"]');
    if (input) {
      onLogin(input.value.trim());
    }
  }

  return (
    <div>
      <h2 className="page-title" style={{ fontSize: '2rem' }}>YTqwery</h2>
      <p className="subtitle">Страница защищена. Введите пароль, чтобы попасть в панель аналитики.</p>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 14, marginTop: 24 }}>
        <label>
          Пароль
          <input name="password" type="password" placeholder="Введите пароль" />
        </label>
        <button type="submit" className="primary">Войти</button>
        {error ? <div className="error-note">{error}</div> : null}
      </form>
      <p className="meta-line" style={{ marginTop: 18 }}>
        Примечание: GitHub Pages поддерживает только статические страницы, поэтому эта защита реализована на клиенте.
      </p>
    </div>
  );
}

export default LoginGate;
