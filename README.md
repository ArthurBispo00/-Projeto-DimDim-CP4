# 🏦 DimDimApp - 4º Checkpoint DockerComponse

**Equipe:**
João Paulo Moreira dos Santos — RM 557808
Arthur Bispo de Lima — RM 557568

---

Este projeto consiste na modernização de uma aplicação web completa, migrando sua arquitetura original para um ambiente totalmente containerizado com Docker Compose. A aplicação é composta por um frontend em Next.js, um backend em ASP.NET Core e um banco de dados PostgreSQL.

## Arquitetura da Solução

A solução utiliza Docker Compose para orquestrar três serviços principais:

-   **`web`**: O container do frontend, responsável pela interface do usuário.
-   **`api`**: O container do backend, que contém a lógica de negócio e se comunica com o banco de dados.
-   **`db`**: O container do banco de dados PostgreSQL, que armazena os dados da aplicação de forma persistente através de um volume Docker.

Todos os serviços se comunicam através de uma rede Docker privada, garantindo o isolamento e a segurança do ambiente.

---

## 🚀 Instruções de Uso

Siga os passos abaixo para executar a aplicação em seu ambiente local.

### Pré-requisitos

Antes de começar, garanta que você tenha as seguintes ferramentas instaladas:

-   [Docker](https://www.docker.com/products/docker-desktop/)
-   [Docker Compose](https://docs.docker.com/compose/install/) (geralmente já vem com o Docker Desktop)

### Executando a Aplicação

1.  **Clone o repositório:**
    ```bash
    git clone [URL_DO_SEU_REPOSITORIO_AQUI]
    cd [NOME_DA_PASTA_DO_PROJETO]
    ```

2.  **Inicie os containers:**
    Use o Docker Compose para construir as imagens e iniciar todos os containers em modo "detached" (em segundo plano).
    ```bash
    docker compose up --build -d
    ```

3.  **Acesse a aplicação:**
    Após alguns instantes, os serviços estarão disponíveis:
    -   Frontend: [http://localhost:3000](http://localhost:3000)
    -   Backend (API): [http://localhost:8080](http://localhost:8080)

---

## ⚙️ Comandos Essenciais do Docker Compose

Aqui estão alguns comandos úteis para gerenciar o ambiente:

-   **Verificar o status dos containers:**
    ```bash
    docker compose ps
    ```

-   **Visualizar os logs de um serviço específico (ex: api):**
    ```bash
    docker compose logs -f api
    ```

-   **Parar e remover os containers, redes e volumes:**
    *Atenção: O comando `down -v` removerá também o volume do banco de dados, apagando todos os dados.*
    ```bash
    docker compose down
    ```
    Para remover também o volume (resetar o banco):
    ```bash
    docker compose down -v
    ```
-   **Acessar o terminal de um container (ex: banco de dados):**
    ```bash
    docker compose exec db bash
    ```

---

## 🔧 Troubleshooting Básico

Encontrou algum problema? Aqui estão algumas soluções comuns:

-   **Erro de "Porta já em uso" (`port is already allocated`):**
    * **Causa:** Outro serviço na sua máquina está usando a porta `3000` ou `8080`.
    * **Solução:** Pare o serviço que está usando a porta ou altere a porta no arquivo `docker-compose.yml`. (Ex: mude `"3000:3000"` para `"3001:3000"`).

-   **Container reiniciando em loop (status `restarting`):**
    * **Causa:** Pode haver um erro na inicialização da aplicação dentro do container (ex: erro de conexão com o banco, variável de ambiente faltando).
    * **Solução:** Verifique os logs do container com `docker compose logs [nome_do_servico]` para identificar a causa do erro.

-   **Frontend não consegue se conectar com a API:**
    * **Causa:** A API pode não ter iniciado corretamente ou há um problema de configuração de rede.
    * **Solução:** Verifique o status e os logs do container `api`. Certifique-se de que o healthcheck está passando com `docker compose ps`.