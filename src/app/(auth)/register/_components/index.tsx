'use client';

import { Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import AuthTabs from '@/components/ui/AuthTabs';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

import styles from './RegisterForm.module.css';
import type { RegisterFormProps } from './RegisterForm.types';
import { useRegister } from '../_hooks/useRegister';

export default function RegisterForm({ className }: RegisterFormProps) {
  const {
    name,
    email,
    password,
    confirmPassword,
    error,
    isLoading,
    handleChange,
    handleSubmit,
  } = useRegister();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const wrapperClasses = [styles.wrapper, className].filter(Boolean).join(' ');

  return (
    <div className={wrapperClasses}>
      <div className={styles.header}>
        <h2 className={styles.welcome}>Buat akun baru</h2>
        <p className={styles.subtitle}>Mulai jelajahi kuliner lokal terbaik</p>
      </div>

      <AuthTabs />

      <form className={styles.form} onSubmit={handleSubmit}>
        {error && <div className={styles.errorMessage}>{error}</div>}

        <div className={styles.fields}>
          <Input
            label="Nama Lengkap"
            name="name"
            type="text"
            placeholder="Masukkan nama lengkap"
            required
            fullWidth
            leftIcon={<User size={18} />}
            value={name}
            onChange={handleChange}
            autoComplete="name"
            disabled={isLoading}
          />

          <Input
            label="Alamat Email"
            name="email"
            type="email"
            placeholder="name@example.com"
            required
            fullWidth
            leftIcon={<Mail size={18} />}
            value={email}
            onChange={handleChange}
            autoComplete="email"
            disabled={isLoading}
          />

          <Input
            label="Password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Buat password (min. 6 karakter)"
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
            autoComplete="new-password"
            disabled={isLoading}
          />

          <Input
            label="Konfirmasi Password"
            name="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Masukkan ulang password"
            required
            fullWidth
            leftIcon={<Lock size={18} />}
            value={confirmPassword}
            onChange={handleChange}
            rightIcon={
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className={styles.passwordToggle}
                tabIndex={-1}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            }
            autoComplete="new-password"
            disabled={isLoading}
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          isLoading={isLoading}
          disabled={isLoading}
        >
          {isLoading ? 'Memproses...' : 'Daftar Sekarang'}
        </Button>

        <p className={styles.loginLink}>
          Sudah punya akun?{' '}
          <Link href="/login" className={styles.link}>
            Masuk sekarang
          </Link>
        </p>
      </form>
    </div>
  );
}
