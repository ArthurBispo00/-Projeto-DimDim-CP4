// src/app/editar/[id]/page.tsx
'use client';

import React, { FormEvent, useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Layout from '@/components/Layout';
import { Produto } from '@/types/Produto';
import { fetcher } from '@/utils/api';

export default function EditarPage() {
  const router = useRouter();
  const { id } = useParams();
  const [form, setForm] = useState({
    nome: '',
    preco: '',
  });

  useEffect(() => {
    if (!id) return;
    fetcher<Produto>(`/api/Produto/${id}`)
      .then(p =>
        setForm({
          nome: p.nome,
          preco: String(p.preco),
        })
      )
      .catch(err => console.error('Erro ao buscar produto:', err));
  }, [id]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      await fetcher(`/api/Produto/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: Number(id),
          nome: form.nome,
          preco: parseFloat(form.preco),
        }),
      });
      router.push('/');
    } catch (err) {
      alert('Falha ao editar produto. Veja o console.');
      console.error(err);
    }
  }

  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-4">Editar Produto</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <label className="block mb-1">Nome</label>
          <input
            type="text"
            required
            value={form.nome}
            onChange={e => setForm({ ...form, nome: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Preço</label>
          <input
            type="number"
            step="0.01"
            required
            value={form.preco}
            onChange={e => setForm({ ...form, preco: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Atualizar
        </button>
      </form>
    </Layout>
  );
}
