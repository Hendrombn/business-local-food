// import Link from 'next/link';
// import { redirect } from 'next/navigation';

// import { auth } from '@/lib/auth';

// export default async function HomePage() {
//   const session = await auth();

//   // Kalau belum login, redirect ke login
//   if (!session) {
//     redirect('/login');
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white">
//       <div className="text-center p-8 bg-white rounded-2xl shadow-lg border border-green-100">
//         <div className="text-6xl mb-4">🍴</div>
//         <h1 className="text-3xl font-bold text-gray-800">
//           Hi, {session.user?.name || 'User'}! 👋
//         </h1>
//         <p className="text-gray-500 mt-2">
//           Selamat datang di Kuliner Lokal
//         </p>
//         <p className="text-sm text-gray-400 mt-4">
//           Kamu berhasil login sebagai{' '}
//           <span className="font-medium text-green-600">{session.user?.email}</span>
//         </p>
//         <div className="mt-6 pt-6 border-t border-gray-100">
//           <Link
//             href="/api/auth/signout"
//             className="text-sm text-red-500 hover:text-red-700 transition-colors"
//           >
//             Logout →
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }
