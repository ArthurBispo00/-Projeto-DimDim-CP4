// src/app/novo/page.tsx
'use client';

import React, { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout';
import { fetcher } from '@/utils/api'; // Não precisa mais do API_BASE aqui

export default function NovoPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    nome: '',
    preco: '',
  });

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      await fetcher('/api/Produto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: form.nome,
          preco: parseFloat(form.preco),
        }),
      });
      router.push('/');
    } catch (err) {
      alert('Falha ao cadastrar produto. Veja o console.');
      console.error(err);
    }
  }

  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-4">Novo Produto</h2>
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
            required
            step="0.01"
            value={form.preco}
            onChange={e => setForm({ ...form, preco: e.target.value })}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Salvar
        </button>
      </form>
    </Layout>
  );
}
