'use client';

import Link from 'next/link';

import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

import styles from './RegisterForm.module.css';
import type { RegisterFormProps } from './RegisterForm.types';
import { useRegister } from '../_hooks/useRegister';

export default function RegisterForm({ className }: RegisterFormProps) {
  const { isLoading, error, handleSubmit } = useRegister();

  return (
    <div className={[styles.wrapper, className].filter(Boolean).join(' ')}>
      <div className={styles.header}>
        <h1 className={styles.title}>Buat Akun Baru</h1>
        <p className={styles.subtitle}>
          Daftar dan mulai jelajahi kuliner lokal terbaik
        </p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        {error && <div className={styles.error}>{error}</div>}

        <Input
          label="Nama Lengkap"
          name="name"
          type="text"
          placeholder="Masukkan nama lengkap"
          required
          fullWidth
        />

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
          placeholder="Minimal 8 karakter"
          required
          fullWidth
        />

        <Input
          label="Konfirmasi Password"
          name="confirmPassword"
          type="password"
          placeholder="Ulangi password"
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
          Daftar Sekarang
        </Button>
      </form>

      <p className={styles.footer}>
        Sudah punya akun?{' '}
        <Link href="/login" className={styles.link}>
          Masuk di sini
        </Link>
      </p>
    </div>
  );
}
