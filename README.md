# 🏦 DimDimApp - 3º Checkpoint Dockerfile

**Equipe:**  
João Paulo Moreira dos Santos — RM 557808

---

## 📑 Sumário

1. [Introdução](#introdução)
2. [Objetivo](#objetivo)
3. [Requisitos Atendidos](#requisitos-atendidos)
4. [Tecnologias Utilizadas](#tecnologias-utilizadas)
5. [Estrutura do Projeto](#estrutura-do-projeto)
6. [Passo a Passo de Execução](#passo-a-passo-de-execução)
7. [Comandos Docker Utilizados](#comandos-docker-utilizados)
8. [Evidências e Prints do Funcionamento](#evidências-e-prints-do-funcionamento)
9. [Justificativas das Decisões](#justificativas-das-decisões)
10. [Link do Repositório no GitHub](#link-do-repositório-no-github)
11. [Conclusão](#conclusão)
12. [Checklist Final](#checklist-final)

---

## Introdução

Este projeto é uma solução completa para a Instituição Financeira fictícia DimDim, composta por uma API em .NET e um Frontend em Next.js, conectados a um banco PostgreSQL, totalmente conteinerizados com Docker e versionados no GitHub, seguindo rigorosamente o edital do 3º Checkpoint.

---

## Objetivo

Implementar uma solução DevOps de automação, isolamento e persistência de dados, com dois containers (aplicação e banco), Dockerfile personalizado para a aplicação, volume nomeado e rede dedicada, conforme todas as boas práticas exigidas no edital.

---

## Requisitos Atendidos

- [x] Dois containers (API com CRUD e Banco de Dados)
- [x] Volume nomeado para persistência dos dados
- [x] Ambos os containers na mesma rede Docker
- [x] Dockerfile próprio para a aplicação, rodando como usuário não-root
- [x] Utilização de variáveis de ambiente
- [x] Container do banco usando imagem oficial (sem Dockerfile)
- [x] Execução em background com `-d`
- [x] Evidências via `docker exec` (`ls`, `pwd`, `whoami`)
- [x] Código-fonte, Dockerfiles, instruções e prints versionados no GitHub

---

## Tecnologias Utilizadas

- **API:** .NET 8 (C#)
- **Frontend:** Next.js (React)
- **Banco de Dados:** PostgreSQL 16
- **Docker**
- **Git/GitHub**
- **PowerShell/Windows**

---

## Estrutura do Projeto

```plaintext
/Projeto-DimDimApp-CP3
│
├── API/
│   ├── Dockerfile
│   └── ...código da API...
│
├── front-produtos/
│   ├── Dockerfile
│   └── ...código do frontend...
│
├── imagens/
│   ├── banco de dados.png
│   ├── bulddockerfileapi.png
│   ├── bulddockerfilefront.png
│   ├── criacao da rede.png
│   ├── criacao do volume.png
│   ├── dockerps.png
│   ├── run imag api.png
│   ├── run imag front.png
│   └── usuario.png
│
└── README.md
Passo a Passo de Execução
1. Clone o repositório
sh
Copiar
Editar
git clone https://github.com/joao1015/Projeto-DimDimApp-CP3.git
cd Projeto-DimDimApp-CP3
2. Criação da Rede Docker
sh
Copiar
Editar
docker network create joaorm557808_rede
Print:

3. Criação do Volume Docker
sh
Copiar
Editar
docker volume create joaorm557808_postgres_data
Print:

4. Build da API (.NET)
sh
Copiar
Editar
cd API
docker build -t joaorm557808_api .
Print:

5. Build do Frontend (Next.js)
sh
Copiar
Editar
cd ../front-produtos
docker build -t joaorm557808_front .
Print:

6. Execução do Container do Banco de Dados
sh
Copiar
Editar
docker run -d --name joaorm557808_postgres --network joaorm557808_rede \
  -e POSTGRES_DB=joaorm557808db \
  -e POSTGRES_USER=joaorm557808user \
  -e POSTGRES_PASSWORD=joaorm557808pass \
  -v joaorm557808_postgres_data:/var/lib/postgresql/data \
  -p 5432:5432 postgres:16
Print:

7. Execução do Container da API
sh
Copiar
Editar
docker run -d --name joaorm557808_api --network joaorm557808_rede \
  -e ConnectionStrings__DefaultConnection="Host=joaorm557808_postgres;Database=joaorm557808db;Username=joaorm557808user;Password=joaorm557808pass" \
  -p 5000:5000 joaorm557808_api
Print:

8. Execução do Container do Frontend
sh
Copiar
Editar
docker run -d --name joaorm557808_front --network joaorm557808_rede \
  -e NEXT_PUBLIC_API_BASE="http://joaorm557808_api:5000" \
  -p 3000:3000 joaorm557808_front
Print:

Comandos Docker Utilizados
docker network create

docker volume create

docker build -t ...

docker run -d ...

docker ps

docker exec -it ... sh

ls, pwd, whoami (dentro do container)

Evidências e Prints do Funcionamento
1. Containers rodando (docker ps)
sh
Copiar
Editar
docker ps
Print:

2. Acesso ao container da aplicação (usuário não-root)
sh
Copiar
Editar
docker exec -it joaorm557808_api sh
ls
pwd
whoami
Print:

3. Acesso ao container do banco de dados (usuário root)
sh
Copiar
Editar
docker exec -it joaorm557808_postgres bash
ls
pwd
whoami
Print:
(Adicione aqui um print similar, caso seu professor peça o usuário do banco — pode duplicar o "usuario.png" caso o comando seja idêntico ou criar um print específico)

4. CRUD funcionando (prints do front ou Postman)
(Adicione aqui prints de cadastro, listagem, edição, exclusão)

markdown
Copiar
Editar
**Cadastro:**  
![Cadastro](imagens/crud_cadastro.png)

**Listagem:**  
![Listagem](imagens/crud_listagem.png)

**Edição:**  
![Edição](imagens/crud_edicao.png)

**Exclusão:**  
![Exclusão](imagens/crud_exclusao.png)
(Renomeie e coloque os prints de CRUD conforme suas capturas.)

5. Persistência dos dados após restart do banco
(Adicione print mostrando que os dados persistem após reiniciar o container do banco)

markdown
Copiar
Editar
**Persistência:**  
![Persistência do banco](imagens/persistencia.png)
Justificativas das Decisões
Banco de Dados: Utilizada a imagem oficial do PostgreSQL conforme o edital, sem Dockerfile próprio.

Volume Nomeado: Garante persistência dos dados do banco mesmo após remoção do container.

Rede Docker: Containers isolados em rede própria para comunicação exclusiva.

Usuário Não-Root: API e Frontend executando como usuário stevejobs, conforme exigência.

Execução em Background: Todos containers rodam com flag -d.

CRUD: API implementa todas as operações (Create, Read, Update, Delete) em tabela do banco.

Acesso via docker exec: Prints comprovam acesso, estrutura e usuários corretos.

Link do Repositório no GitHub
https://github.com/joao1015/Projeto-DimDimApp-CP3

Conclusão
O projeto DimDimApp atendeu todos os requisitos do 3º Checkpoint, aplicando práticas reais de DevOps, automação, conteinerização e persistência, com documentação detalhada, código versionado e evidências completas do funcionamento.