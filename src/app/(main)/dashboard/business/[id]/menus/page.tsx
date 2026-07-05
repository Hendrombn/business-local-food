'use client';

import { ArrowLeft, Plus, Edit, Trash2, Utensils } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation'; // ← pake useParams
import { useEffect, useState } from 'react';

interface Menu {
  id: string;
  name: string;
  description: string | null;
  price: number;
  isAvailable: boolean;
}

interface Business {
  id: string;
  name: string;
}

export default function MenusPage() {
  const router = useRouter();
  const params = useParams(); // ← pake useParams
  const businessId = params.id as string; // ← ambil id dari params

  const [business, setBusiness] = useState<Business | null>(null);
  const [menus, setMenus] = useState<Menu[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingMenu, setEditingMenu] = useState<Menu | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    isAvailable: true,
  });

  useEffect(() => {
    if (!businessId) return; // ← guard kalau id belum ada

    const fetchData = async () => {
      try {
        // Fetch business
        const bizRes = await fetch(`/api/businesses/${businessId}`);
        if (bizRes.ok) {
          const bizData = await bizRes.json();
          setBusiness(bizData);
        } else {
          router.push('/dashboard');
        }

        // Fetch menus
        const menuRes = await fetch(`/api/menus?businessId=${businessId}`);
        if (menuRes.ok) {
          const menuData = await menuRes.json();
          setMenus(menuData);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [businessId, router]);

  const handleFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const url = editingMenu ? `/api/menus/${editingMenu.id}` : '/api/menus';
      const method = editingMenu ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessId: businessId,
          name: formData.name,
          description: formData.description,
          price: parseInt(formData.price),
          isAvailable: formData.isAvailable,
        }),
      });

      if (res.ok) {
        const menuRes = await fetch(`/api/menus?businessId=${businessId}`);
        if (menuRes.ok) {
          const menuData = await menuRes.json();
          setMenus(menuData);
        }
        resetForm();
      } else {
        const error = await res.json();
        alert(error.error || 'Gagal menyimpan menu');
      }
    } catch (error) {
      alert('Terjadi kesalahan, coba lagi');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Yakin ingin menghapus menu ini?')) return;

    try {
      const res = await fetch(`/api/menus/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setMenus((prev) => prev.filter((m) => m.id !== id));
      }
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      isAvailable: true,
    });
    setEditingMenu(null);
    setShowForm(false);
  };

  const startEdit = (menu: Menu) => {
    setEditingMenu(menu);
    setFormData({
      name: menu.name,
      description: menu.description || '',
      price: menu.price.toString(),
      isAvailable: menu.isAvailable,
    });
    setShowForm(true);
  };

  if (loading || !business) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center gap-4">
          <Link
            href="/dashboard"
            className="rounded-lg p-2 transition-colors hover:bg-gray-100"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              🍽️ Menu - {business.name}
            </h1>
            <p className="text-gray-500">Kelola menu untuk bisnis ini</p>
          </div>
        </div>

        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="mb-6 flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700"
          >
            <Plus size={20} />
            Tambah Menu
          </button>
        )}

        {showForm && (
          <div className="mb-6 rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="mb-4 font-semibold text-gray-800">
              {editingMenu ? 'Edit Menu' : 'Tambah Menu Baru'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Nama Menu <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-transparent focus:ring-2 focus:ring-green-500"
                  placeholder="Nasi Goreng"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Deskripsi
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  rows={2}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-transparent focus:ring-2 focus:ring-green-500"
                  placeholder="Nasi goreng dengan bumbu spesial..."
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Harga <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleFormChange}
                  required
                  min="0"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-transparent focus:ring-2 focus:ring-green-500"
                  placeholder="35000"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="isAvailable"
                  checked={formData.isAvailable}
                  onChange={handleFormChange}
                  className="h-4 w-4 accent-green-600"
                />
                <label className="text-sm text-gray-700">Tersedia</label>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className={`rounded-lg bg-green-600 px-6 py-2 font-medium text-white transition-colors ${
                    submitting
                      ? 'cursor-not-allowed opacity-50'
                      : 'hover:bg-green-700'
                  }`}
                >
                  {submitting
                    ? 'Menyimpan...'
                    : editingMenu
                      ? 'Update Menu'
                      : 'Tambah Menu'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-lg bg-gray-200 px-6 py-2 text-gray-700 transition-colors hover:bg-gray-300"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        )}

        {menus.length === 0 ? (
          <div className="rounded-lg border border-gray-100 bg-white p-8 text-center shadow-sm">
            <Utensils size={48} className="mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500">Belum ada menu</p>
            <p className="text-sm text-gray-400">
              Tambahkan menu pertama untuk bisnis ini
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm">
            <div className="divide-y divide-gray-100">
              {menus.map((menu) => (
                <div
                  key={menu.id}
                  className="flex items-center justify-between p-4 hover:bg-gray-50"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-gray-900">{menu.name}</h3>
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs ${
                          menu.isAvailable
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {menu.isAvailable ? 'Tersedia' : 'Tidak Tersedia'}
                      </span>
                    </div>
                    {menu.description && (
                      <p className="text-sm text-gray-500">
                        {menu.description}
                      </p>
                    )}
                    <p className="mt-1 text-sm font-semibold text-green-600">
                      Rp {menu.price.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(menu)}
                      className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-blue-50 hover:text-blue-600"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(menu.id)}
                      className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
