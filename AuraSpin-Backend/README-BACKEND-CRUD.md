# Aura Spin — Backend CRUD revisado

Este pacote mantém o frontend Angular original e substitui somente a pasta `backend` por uma implementação organizada dos endpoints REST de Produto, Cliente e Pedido.

## Requisitos
- Java 21
- Maven (ou usar `mvnw.cmd` no Windows)
- Porta `8081` livre

## Como iniciar no Windows
1. Abra a pasta `backend` no VS Code.
2. Abra o terminal dentro de `backend`.
3. Execute:

```powershell
.\mvnw.cmd spring-boot:run
```

Aguarde a mensagem `Started LojinhaApplication`. A API ficará em `http://localhost:8081`.

> O banco continua sendo SQLite (`lojinha.db`) e a configuração usa `spring.jpa.hibernate.ddl-auto=update`. Faça uma cópia do arquivo `lojinha.db` antes de testar exclusões ou alterações importantes. O projeto não inclui um banco de produção nem apaga o banco existente.

## Rotas para testar no Postman

Todas as requisições de cadastro/alteração devem usar `Body > raw > JSON` e o header `Content-Type: application/json`.

### Produto
| Método | URL | Uso |
|---|---|---|
| GET | `/api/produtos` | Listar produtos (rota do frontend) |
| GET | `/api/produto` | Listar produtos |
| GET | `/api/produto/{codigo}` | Consultar um produto |
| POST | `/api/produto` | Cadastrar |
| PUT | `/api/produto` | Alterar |
| DELETE | `/api/produto/{codigo}` | Excluir |
| GET | `/api/produto/vitrine` | Produtos em destaque |
| GET | `/api/produto/busca/{termo}` | Buscar por nome/descrição |

Exemplo de POST:
```json
{
  "nome": "Fidget Spinner Teste",
  "descritivo": "Cadastro pelo Postman",
  "valor": 49.90,
  "valorPromo": 0,
  "quantidade": 10,
  "destaque": 0,
  "imagem": ""
}
```
O campo `codigo` é gerado pelo banco. Para cadastrar, não envie `codigo`.

### Cliente
| Método | URL | Uso |
|---|---|---|
| GET | `/api/clientes` | Listar clientes (rota do frontend) |
| GET | `/api/cliente` | Listar clientes |
| GET | `/api/cliente/{codigo}` | Consultar cliente |
| POST | `/api/cliente` | Cadastrar |
| PUT | `/api/cliente` | Alterar |
| DELETE | `/api/cliente/{codigo}` | Excluir |

Exemplo de POST:
```json
{
  "nome": "Cliente Teste",
  "telefone": "11999999999",
  "documento": "12345678900",
  "senha": "Senha123",
  "logradouro": "Rua de Teste, 100",
  "email": "teste@example.com",
  "ativo": 1
}
```

### Pedido
| Método | URL | Uso |
|---|---|---|
| GET | `/api/pedidos` | Listar pedidos (rota do frontend) |
| GET | `/api/pedido` | Listar pedidos |
| GET | `/api/pedido/{codigo}` | Consultar pedido |
| POST | `/api/pedido` | Cadastrar |
| PUT | `/api/pedido` | Alterar |
| DELETE | `/api/pedido/{codigo}` | Excluir |

Exemplo de POST:
```json
{
  "valorTotal": 99.80,
  "entrega": "Retirada na loja",
  "obs": "Pedido de teste",
  "dataPedido": "2026-11-24",
  "codigoCliente": 1
}
```

## Observações importantes
- O frontend Angular não foi alterado: os métodos e URLs do `ApiService` foram preservados.
- `POST` zera o código recebido para sempre criar um registro novo; isso evita atualizar um registro sem querer.
- `PUT` exige um código existente. Se não encontrar, retorna `404`.
- `DELETE` exige um código existente. Se não encontrar, retorna `404`.
- `POST` retorna `201`; `PUT`, `GET` e `DELETE` retornam `200` quando executados com sucesso.
- O `Produto.imagem` continua aceitando URL, caminho em assets ou conteúdo Base64, conforme o frontend já envia.
- As rotas de login e atualização/reset de senha do cliente foram mantidas.
- Não foi possível executar o build Maven neste ambiente porque o download do Maven Wrapper não ficou acessível. Execute o comando acima localmente e, se surgir erro de compilação ou inicialização, envie o log completo.
