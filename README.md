# Avaliação Front-end e Back-end

Este projeto é uma avaliação de front-end e back-end, consistindo em uma aplicação Angular para o front-end e uma API ASP.NET Core para o back-end.

## Tecnologias

* **Front-end:** Angular
* **Back-end:** ASP.NET Core

## Estrutura do Projeto

O projeto é dividido em duas pastas principais:

* **`frontend/`**: Contém o código da aplicação Angular.
* **`backend/`**: Contém o código da API ASP.NET Core.

## Funcionalidades do Front-end (Aplicação Angular)

O front-end é uma aplicação Angular que gerencia as rotas da seguinte forma:
* A rota inicial (`''`) redireciona automaticamente para a rota de login (`/login`).
* A página principal (`/home`) é protegida por um guarda de rota (`AuthGuard`), o que significa que apenas usuários autenticados podem acessá-la.
* A rota `/login` carrega o componente `SouClienteComponent` para a autenticação do usuário.
* Existem rotas para páginas públicas, como `/quem-somos` e `/contato`.

A aplicação interage com o back-end para gerenciar produtos e autenticação.

## Funcionalidades do Back-end (API)

A API foi desenvolvida em ASP.NET Core e serve como suporte para a aplicação front-end. Possui dois controladores principais:

### `AutenticacaoController`
Este controlador lida com a autenticação de usuários, fornecendo o endpoint para login (`POST /api/v1.0/autenticacao/login`) que retorna um token JWT para a aplicação front-end em caso de sucesso.

### `ProdutosController`
Este controlador gerencia as operações CRUD (Criar, Ler, Atualizar, Excluir) da entidade `Produto`, com os seguintes endpoints:
* `GET /api/v1.0/produtos`: Retorna todos os produtos.
* `GET /api/v1.0/produtos/{id}`: Retorna um produto específico.
* `POST /api/v1.0/produtos`: Adiciona um novo produto.
* `PUT /api/v1.0/produtos/{id}`: Modifica um produto existente.
* `DELETE /api/v1.0/produtos/{id}`: Exclui um produto.
* O acesso a estes endpoints é restrito e requer autenticação.