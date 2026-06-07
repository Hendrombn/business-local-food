'use client';

import Link from 'next/link';

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

import styles from './LoginForm.module.css';
import type { LoginFormProps } from './LoginForm.types';
import { useLogin } from '../_hooks/useLogin';

export default function LoginForm({ className }: LoginFormProps) {
  const { isLoading, error, handleSubmit } = useLogin();

  return (
    <div className={[styles.wrapper, className].filter(Boolean).join(' ')}>
      <div className={styles.header}>
        <h1 className={styles.title}>Selamat Datang</h1>
        <p className={styles.subtitle}>
          Masuk untuk menjelajahi kuliner lokal terbaik
        </p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        {error && <div className={styles.error}>{error}</div>}

        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="email@example.com"
          required
          fullWidth
        />

        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="Masukkan password"
          required
          fullWidth
        />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          isLoading={isLoading}
        >
          Masuk
        </Button>
      </form>

      <p className={styles.footer}>
        Belum punya akun?{' '}
        <Link href="/register" className={styles.link}>
          Daftar sekarang
        </Link>
      </p>
    </div>
  );
}
