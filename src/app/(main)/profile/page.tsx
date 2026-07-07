import { redirect } from 'next/navigation';

import LogoutButton from '@/components/auth';
import { getSession } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export default async function ProfilePage() {
  const session = await getSession();
  if (!session) redirect('/login');

  return (
    <div className="mx-auto max-w-md p-6">
      <div className="rounded-xl bg-white p-6 text-center shadow-sm">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-3xl">
          {session.name?.charAt(0) || 'U'}
        </div>
        <h1 className="mt-4 text-xl font-bold">{session.name}</h1>
        <p className="text-sm text-gray-500">{session.email}</p>
        <div className="mt-2">
          <span className="rounded-full bg-gray-100 px-3 py-1 text-xs">
            {session.role}
          </span>
        </div>
        <div className="mt-6 border-t pt-6">
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
