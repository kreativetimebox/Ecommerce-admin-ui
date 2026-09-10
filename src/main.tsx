import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import { useAdminAuthViewModel } from './viewmodels/useAdminAuthViewModel';
import { LoginView } from './views/LoginView';
import { Portal } from './views/Portal';

function App() {
  const { token, error, login, logout } = useAdminAuthViewModel();
  return token ? <Portal token={token} onLogout={logout} /> : <LoginView error={error} onLogin={login} />;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
