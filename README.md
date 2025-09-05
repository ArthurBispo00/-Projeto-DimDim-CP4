# 🏦 DimDimApp - Modernização com Docker Compose

**Equipe:**
* João Paulo Moreira dos Santos — RM 557808
* Arthur Bispo de Lima — RM 557568

**Links Rápidos:**
* **[Repositório no GitHub](https://github.com/ArthurBispo00/-Projeto-DimDim-CP4)**
* **[Vídeo de Demonstração no YouTube](https://youtu.be/S-6lppAyB-A)**

---

Este projeto consiste na modernização de uma aplicação web completa, migrando sua arquitetura original para um ambiente totalmente containerizado com Docker Compose. A aplicação é composta por um frontend em Next.js, um backend em ASP.NET Core e um banco de dados PostgreSQL.

## Arquitetura da Solução

A solução utiliza Docker Compose para orquestrar três serviços principais:

-   **`web`**: O container do frontend, responsável pela interface do usuário.
-   **`api`**: O container do backend, que contém a lógica de negócio e se comunica com o banco de dados.
-   **`db`**: O container do banco de dados PostgreSQL, que armazena os dados da aplicação de forma persistente através de um volume Docker.

Todos os serviços se comunicam através de uma rede Docker privada (`app-net`), garantindo o isolamento e a segurança do ambiente.

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
    git clone https://github.com/ArthurBispo00/-Projeto-DimDim-CP4
    cd -Projeto-DimDim-CP4
    ```

2.  **Inicie os containers:**
    Use o Docker Compose para construir as imagens e iniciar todos os containers em modo "detached" (em segundo plano).
    ```bash
    docker compose up --build -d
    ```

3.  **Acesse a aplicação:**
    Após alguns instantes, os serviços estarão disponíveis:
    -   **Frontend:** [http://localhost:3000](http://localhost:3000)
    -   **Backend (API):** [http://localhost:8080/swagger](http://localhost:8080/swagger) (para testar os endpoints)

---

## ✅ Testando a Aplicação

### Exemplo de Teste CRUD na Interface Web

1.  **Read (Ler):** Acesse [http://localhost:3000](http://localhost:3000). A página inicial deve listar todos os itens já existentes no banco de dados.
2.  **Create (Criar):** Clique no botão para adicionar um novo item. Preencha o formulário (ex: Nome: "Produto Teste", Valor: "100") e salve. O novo item deve aparecer na lista.
3.  **Update (Atualizar):** Encontre o "Produto Teste" na lista, clique em editar, mude seu nome para "Produto Atualizado" e salve. A alteração deve ser refletida na lista.
4.  **Delete (Deletar):** Clique para deletar o "Produto Atualizado". O item deve ser removido da lista.

### Verificando o Banco de Dados via Terminal (Prompt)

Para provar que as operações acima realmente aconteceram no banco, você pode acessá-lo diretamente pelo terminal.

1.  **Acesse o container do banco de dados:**
    ```bash
    docker compose exec db psql -U appuser -d appdb
    ```
    * Este comando te conecta diretamente ao banco `appdb` com o usuário `appuser`. Seu prompt mudará para `appdb=>`.

2.  **Liste as tabelas:**
    Para ver as tabelas disponíveis, use o comando:
    ```sql
    \dt
    ```
    * Você verá a tabela `Produtos`, onde os dados são armazenados.

3.  **Consulte os dados:**
    Para ver todos os registros na tabela `Produtos`, execute o comando `SELECT`. Use aspas duplas pois o nome da tabela começa com maiúscula.
    ```sql
    SELECT * FROM "Produtos";
    ```
    * Execute este comando após cada operação de CRUD na interface web para ver as linhas sendo criadas, atualizadas e deletadas em tempo real.

4.  **Para sair do psql**, digite `\q` e pressione Enter.

---

## ⚙️ Comandos Essenciais do Docker Compose

-   **Verificar o status dos containers:**
    ```bash
    docker compose ps
    ```
-   **Visualizar os logs de um serviço (ex: api):**
    ```bash
    docker compose logs -f api
    ```
-   **Parar e remover os containers:**
    ```bash
    docker compose down
    ```
-   **Parar e remover containers E o volume do banco (apaga todos os dados):**
    ```bash
    docker compose down -v
    ```

---

## 🔧 Troubleshooting Básico

-   **Erro de "Porta já em uso" (`port is already allocated`):**
    * **Causa:** Outro serviço na sua máquina está usando a porta `3000` ou `8080`.
    * **Solução:** Pare o serviço conflitante ou altere a porta no `docker-compose.yml`. (Ex: mude `"3000:3000"` para `"3001:3000"`).

-   **Container reiniciando em loop (status `restarting`):**
    * **Causa:** Erro na inicialização da aplicação dentro do container (ex: connection string errada, variável de ambiente faltando).
    * **Solução:** Verifique os logs com `docker compose logs [nome_do_servico]` para identificar o erro.