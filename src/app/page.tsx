'use client';

import { useState } from 'react';

import Avatar from '@/components/ui/Avatar';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import StarRating from '@/components/ui/StarRating';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(3);

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 32 }}
    >
      {/* Avatar */}
      <Avatar name="Anita Rahma" size="md" />
      <Avatar name="John Doe" size="lg" />

      {/* StarRating - readonly */}
      <StarRating value={4.5} readonly />

      {/* StarRating - interactive */}
      <StarRating value={rating} onChange={setRating} />

      {/* Modal */}
      <Button onClick={() => setIsOpen(true)}>Buka Modal</Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Reservasi Meja Resto"
      >
        <p>Isi konten modal di sini</p>
      </Modal>
    </div>
  );
}
