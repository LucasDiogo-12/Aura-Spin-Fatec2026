# Aura Spin — Backend

Backend da aplicação **Aura Spin**, desenvolvido em Java com Spring Boot, responsável por gerenciar os dados da loja, incluindo produtos, clientes e pedidos.

O projeto faz parte do Projeto Integrador da FATEC e tem como objetivo fornecer uma API REST para comunicação com o frontend Angular.

## Tecnologias utilizadas

- **Java** — linguagem de programação.
- **Spring Boot** — desenvolvimento da API REST.
- **Spring Data JPA** — persistência e gerenciamento de dados.
- **Hibernate** — mapeamento objeto-relacional (ORM).
- **SQLite** — banco de dados.
- **Maven** — gerenciamento de dependências.

## Funcionalidades

- Cadastro, consulta, atualização e exclusão de produtos.
- Gerenciamento de clientes.
- Gerenciamento de pedidos.
- Persistência de dados utilizando SQLite.
- Integração com o frontend Angular.
- Suporte ao armazenamento de imagens de produtos em Base64.

## Estrutura da API

O backend disponibiliza endpoints para as seguintes entidades:

| Entidade | Endpoint |
|---|---|
| Produtos | `/produtos` |
| Clientes | `/clientes` |
| Pedidos | `/pedidos` |

As operações disponíveis dependem dos métodos implementados em cada Controller.

## Configuração do ambiente

**Pré-requisitos:**

- Java JDK 17 ou superior, conforme a configuração do projeto.
- Maven.
- IDE de desenvolvimento (VS Code ou IntelliJ IDEA).

### Como executar o projeto

1. Clone o repositório:

```bash
git clone URL_DO_REPOSITORIO
```

2. Entre na pasta do projeto:

```bash
cd NOME_DA_PASTA
```

3. Execute a aplicação com Maven:

```bash
mvn spring-boot:run
```

4. O servidor será iniciado em:

```text
http://localhost:8081
```

## Banco de dados

O projeto utiliza SQLite para armazenar as informações da aplicação.

O banco é configurado por meio do arquivo `application.properties`, utilizando o arquivo `lojinha.db`.

A configuração do Hibernate utiliza `ddl-auto=update`, permitindo atualizar a estrutura das tabelas conforme as entidades mapeadas, preservando os dados existentes sempre que possível.

## Integração com o Frontend

O backend foi desenvolvido para trabalhar em conjunto com o frontend Angular do Aura Spin, disponibilizando os serviços necessários para o funcionamento da loja virtual.

## Projeto

**Aura Spin — Diversão que gira com você!**

Projeto acadêmico desenvolvido na FATEC, como parte das atividades do curso de Análise e Desenvolvimento de Sistemas.
