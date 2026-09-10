import { useEffect, useState } from 'react';
import { authRepository } from '../models/authRepository';
import { tokenStorage } from '../models/tokenStorage';
import { authEvents } from '../models/authEvents';
import { errorMessage } from '../models/errorMessage';

export function useAdminAuthViewModel() {
  const [token, setToken] = useState(() => tokenStorage.get());
  const [error, setError] = useState('');

  useEffect(() => authEvents.onUnauthorized(() => {
    tokenStorage.clear();
    setToken(null);
    setError('Your session expired. Please sign in again.');
  }), []);

  async function login(email: string, password: string) {
    setError('');
    try {
      const session = await authRepository.login(email, password);
      setToken(session.tokens.accessToken);
    } catch (error) {
      setError(errorMessage(error, 'Admin sign-in failed. Check your credentials.'));
    }
  }

  function logout() {
    tokenStorage.clear();
    setToken(null);
  }

  return { token, error, login, logout };
}
