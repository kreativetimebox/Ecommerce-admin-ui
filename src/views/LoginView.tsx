import { useState, type FormEvent } from 'react';

export function LoginView({ error, onLogin }: { error: string; onLogin: (email: string, password: string) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function submit(event: FormEvent) {
    event.preventDefault();
    onLogin(email, password);
  }

  return (
    <main className="login-page">
      <div className="login-panel">
        <p className="eyebrow">FLOW / WORKS</p>
        <h1>Operations, clearly.</h1>
        <p>Sign in to manage the plumbing supply platform.</p>
        <form onSubmit={submit}>
          <label>
            Admin email
            <input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
          </label>
          <label>
            Password
            <input required type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
          </label>
          <button className="primary-action" type="submit">Sign in to admin</button>
        </form>
        {error && <p className="error" role="alert">{error}</p>}
      </div>
    </main>
  );
}
