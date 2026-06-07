import type { Metadata } from 'next';

import RegisterForm from './_components';

export const metadata: Metadata = {
  title: 'Daftar',
};

export default function RegisterPage() {
  return <RegisterForm />;
}
