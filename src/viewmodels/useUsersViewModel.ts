import { useEffect, useState } from 'react';
import { usersRepository } from '../models/usersRepository';
import { errorMessage } from '../models/errorMessage';
import type { AdminRole, AdminUser, CreateUserForm } from '../models/types';

const initialForm: CreateUserForm = { email: '', password: '', firstName: '', lastName: '', type: 'ADMIN' };

export function useUsersViewModel(token: string) {
  const [data, setData] = useState<AdminUser[] | null>(null);
  const [roles, setRoles] = useState<AdminRole[] | null>(null);
  const [form, setForm] = useState<CreateUserForm>(initialForm);
  const [message, setMessage] = useState('');

  function load() { return Promise.all([usersRepository.list(token), usersRepository.listRoles(token)]).then(([users, allRoles]) => { setData(users); setRoles(allRoles); }); }

  useEffect(() => {
    load().catch((error) => setMessage(errorMessage(error, 'Users are unavailable.')));
  }, [token]);

  function setField<K extends keyof CreateUserForm>(field: K, value: CreateUserForm[K]) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function createUser() {
    try {
      await usersRepository.create(form, token);
      setForm(initialForm);
      setMessage('User created.');
      await load();
    } catch (error) {
      setMessage(errorMessage(error, 'User creation failed.'));
    }
  }

  async function removeUser(userId: string) {
    if (!window.confirm('Delete this user? This cannot be undone.')) return;
    try {
      await usersRepository.remove(userId, token);
      setMessage('User deleted.');
      await load();
    } catch (error) {
      setMessage(errorMessage(error, 'User could not be deleted. They may have existing orders — suspend the account instead.'));
    }
  }

  async function assignRole(userId: string, roleId: string) {
    try {
      await usersRepository.assignRole(userId, roleId, token);
      await load();
    } catch (error) {
      setMessage(errorMessage(error, 'Role could not be assigned.'));
    }
  }

  async function removeRole(userId: string, roleId: string) {
    try {
      await usersRepository.removeRole(userId, roleId, token);
      await load();
    } catch (error) {
      setMessage(errorMessage(error, 'Role could not be removed.'));
    }
  }

  async function toggleStatus(userId: string, status: string) {
    try {
      await usersRepository.updateStatus(userId, status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE', token);
      await load();
    } catch (error) {
      setMessage(errorMessage(error, 'User status could not be updated.'));
    }
  }

  return { data, roles, form, setField, message, createUser, removeUser, assignRole, removeRole, toggleStatus };
}
