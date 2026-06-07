export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Kiri — gambar */}
      <div className="hidden items-center justify-center bg-[#1b5e3b] p-12 lg:flex lg:w-1/2">
        <div className="text-center text-white">
          <div className="mb-6 text-6xl">🍴</div>
          <h1 className="mb-4 text-3xl font-bold">Kuliner Lokal</h1>
          <p className="text-lg text-green-200">
            Temukan bisnis makanan lokal terbaik di sekitarmu
          </p>
        </div>
      </div>
      {/* Kanan — form */}
      <div className="flex flex-1 items-center justify-center p-8">
        {children}
      </div>
    </div>
  );
}
