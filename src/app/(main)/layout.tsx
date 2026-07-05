import BottomNav from '@/components/layout/BottomNav';
import Navbar from '@/components/layout/Navbar';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Navbar Desktop - hanya muncul di layar >= 768px */}
      <div className="hidden md:block">
        <Navbar />
      </div>

      {/* Main Content */}
      <main className="flex-1 pb-20 pt-16 md:pb-0">{children}</main>

      {/* Bottom Navigation - hanya di mobile */}
      <BottomNav />
    </div>
  );
}
