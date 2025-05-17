'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { Produto } from '@/types/Produto';
import { fetcher } from '@/utils/api';

import logoLeft from '@/imag/Captura de tela 2025-05-12 154359.png';
import logoRight from '@/imag/Captura de tela 2025-05-12 154412.png';

export default function HomePage() {
  const [produtos, setProdutos] = useState<Produto[]>([]);

  async function load() {
    setProdutos(await fetcher<Produto[]>('/api/Produto'));
  }

  async function handleDelete(id: number) {
    if (!confirm('Confirma exclusão?')) return;
    await fetcher(`/api/Produto/${id}`, { method: 'DELETE' });
    load();
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <Layout>
      <div className="flex items-center justify-center mb-6 space-x-4">
        <Image src={logoLeft} alt="Logo Esquerda" width={48} height={48} />
        <h1 className="text-3xl font-bold">DimDim DevOps Migration</h1>
        <Image src={logoRight} alt="Logo Direita" width={48} height={48} />
      </div>

      <table className="w-full border-collapse mb-8">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Nome</th>
            <th className="p-2 border">Preço</th>
            <th className="p-2 border">Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map(p => (
            <tr key={p.id} className="even:bg-gray-100">
              <td className="p-2 border">{p.id}</td>
              <td className="p-2 border">{p.nome}</td>
              <td className="p-2 border">R$ {Number(p.preco).toFixed(2)}</td>
              <td className="p-2 border flex space-x-2 justify-center">
                <Link href={`/editar/${p.id}`}>
                  <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded">
                    ✏️ Editar
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(p.id!)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  🗑️ Excluir
                </button>
              </td>
            </tr>
          ))}
          {produtos.length === 0 && (
            <tr>
              <td colSpan={4} className="p-4 text-center text-gray-500">
                Nenhum registro encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <Link href="/novo">
        <button className="bg-green-600 hover:bg-green-300 text-white px-4 py-2 rounded">
          ➕ Adicionar Produtos
        </button>
      </Link>
    </Layout>
  );
}
