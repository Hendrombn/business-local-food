'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import type {
  Category,
  Business,
  BusinessFormData,
} from '../../../Dashboard.types';
import BusinessForm from '../../../_components/BusinessForm';

interface EditBusinessPageProps {
  params: {
    id: string;
  };
}

export default function EditBusinessPage({ params }: EditBusinessPageProps) {
  const router = useRouter();
  const [business, setBusiness] = useState<Business | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories
        const catRes = await fetch('/api/categories');
        if (catRes.ok) {
          const catData = await catRes.json();
          setCategories(catData);
        }

        // Fetch business detail
        const bizRes = await fetch(`/api/businesses/${params.id}`);
        if (bizRes.ok) {
          const bizData = await bizRes.json();
          setBusiness(bizData);
        } else {
          router.push('/dashboard');
        }
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [params.id, router]);

  const handleSubmit = async (data: BusinessFormData) => {
    setSubmitting(true);
    try {
      const res = await fetch(`/api/businesses/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        router.push('/dashboard');
      } else {
        const error = await res.json();
        alert(error.error || 'Gagal mengupdate bisnis');
      }
    } catch (error) {
      alert('Terjadi kesalahan, coba lagi');
    } finally {
      setSubmitting(false);
    }
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
      <div className="mx-auto max-w-3xl">
        <div className="mb-6 flex items-center gap-4">
          <Link
            href="/dashboard"
            className="rounded-lg p-2 transition-colors hover:bg-gray-100"
          >
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Edit Bisnis</h1>
        </div>

        <div className="rounded-lg border border-gray-100 bg-white p-6 shadow-sm">
          <BusinessForm
            categories={categories}
            initialData={business}
            onSubmit={handleSubmit}
            isSubmitting={submitting}
            submitLabel="Simpan Perubahan"
          />
        </div>
      </div>
    </div>
  );
}
