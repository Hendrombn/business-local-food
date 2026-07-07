'use client';

import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import AuthTabs from '@/components/ui/AuthTabs';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

import styles from './LoginForm.module.css';
import type { LoginFormProps } from './LoginForm.types';
import { useLogin } from '../_hooks/useLogin';

export default function LoginForm({ className }: LoginFormProps) {
  const {
    email,
    password,
    error,
    isLoading,
    handleChange,
    handleSubmit,
  } = useLogin();
  
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const wrapperClasses = [styles.wrapper, className]
    .filter(Boolean)
    .join(' ');

  // Debug: cek apakah handleSubmit terpanggil
  const onSubmit = (e: React.FormEvent) => {
    console.log('Form submitted!');
    handleSubmit(e);
  };

  return (
    <div className={wrapperClasses}>
      <div className={styles.header}>
        <h2 className={styles.welcome}>Selamat datang kembali</h2>
        <p className={styles.subtitle}>
          Masukkan detail Anda untuk mengakses akun
        </p>
      </div>

      <AuthTabs />

      <form className={styles.form} onSubmit={onSubmit}>
        {error && <div className={styles.errorMessage}>{error}</div>}

        <div className={styles.fields}>
          <Input
            label="Alamat Email"
            name="email"
            type="email"
            placeholder="Masukkan email"
            required
            fullWidth
            leftIcon={<Mail size={18} />}
            value={email}
            onChange={handleChange}
            autoComplete="email"
            disabled={isLoading}
          />

          <div className={styles.passwordWrapper}>
            <Input
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Masukkan password"
              required
              fullWidth
              leftIcon={<Lock size={18} />}
              value={password}
              onChange={handleChange}
              rightIcon={
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className={styles.passwordToggle}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              }
              autoComplete="current-password"
              disabled={isLoading}
            />
          </div>

          <div className={styles.options}>
            <label className={styles.rememberMe}>
              <input type="checkbox" />
              <span>Ingat saya</span>
            </label>
            <Link href="/forgot-password" className={styles.forgotPassword}>
              Lupa password?
            </Link>
          </div>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          isLoading={isLoading}
          disabled={isLoading}
        >
          {isLoading ? 'Memproses...' : 'Masuk ke akun'}
        </Button>

        <p className={styles.registerLink}>
          Belum punya akun?{' '}
          <Link href="/register" className={styles.link}>
            Daftar gratis
          </Link>
        </p>
      </form>
    </div>
  );
}