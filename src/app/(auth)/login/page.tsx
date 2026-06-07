import type { Metadata } from 'next';

import LoginForm from './_components';

export const metadata: Metadata = {
  title: 'Masuk',
};

export default function LoginPage() {
  return <LoginForm />;
}
