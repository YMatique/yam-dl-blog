# 📚 Yuvi Matique Digital Library (YMDL) - Estrutura de Modelos (Eloquent)

Este documento descreve os modelos principais da aplicação Laravel YMDL, focados na gestão de conteúdo (Artigos, Notícias, Eventos, Séries) e suas respectivas relações no banco de dados (Eloquent ORM).

## 1. Modelos de Conteúdo Principal

Estes modelos formam o núcleo do conteúdo da biblioteca.

| Modelo         | Descrição                                                                    | Relações Chave (Resumo)                                                            |
| :------------- | :--------------------------------------------------------------------------- | :--------------------------------------------------------------------------------- |
| **`User`**     | Representa os administradores, editores e autores.                           | `hasMany` (Post, News, Event, Series)                                              |
| **`Post`**     | Conteúdo aprofundado e atemporal (Artigo, Estudo, Frase).                    | `belongsTo` (User, Series), `belongsToMany` (Category, Tag), `morphMany` (Comment) |
| **`Series`**   | Coleções ordenadas de `Posts` (ex: "Estudo do Livro de Romanos").            | `belongsTo` (User), `hasMany` (Post)                                               |
| **`Category`** | Agrupamento temático amplo e transversal (ex: "Doutrinas", "Vida Cristã").   | `belongsToMany` (Post, Event)                                                      |
| **`Tag`**      | Palavras-chave específicas para indexação e busca (ex: "Graça", "Salvação"). | `belongsToMany` (Post, News)                                                       |

## 2. Modelos Temporais e de Atualidade

Estes modelos gerenciam informações sensíveis ao tempo (Notícias e Eventos).

| Modelo      | Descrição                                                                                                | Campos e Relações Chave                                                   |
| :---------- | :------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------ |
| **`News`**  | Conteúdo com relevância imediata e atualizações.                                                         | `belongsTo` (User), `belongsToMany` (Tag), `morphMany` (Comment)          |
| **`Event`** | Atividades programadas (palestras, encontros). A localização e o tempo estão contidos no próprio modelo. | **Campos Principais:** `start_date`, `end_date`, `location_text` (string) |

## 3. Modelos de Engajamento e Infraestrutura

Estes modelos gerenciam a interação do usuário e a gestão de leitores.

| Modelo           | Descrição                                                                   | Relações Chave (Resumo)                           |
| :--------------- | :-------------------------------------------------------------------------- | :------------------------------------------------ |
| **`Comment`**    | Interações dos leitores no conteúdo. **Implementado de forma Polimórfica.** | `morphTo` (Pode pertencer a Post ou News)         |
| **`Subscriber`** | Gerenciamento de e-mails para newsletter.                                   | Autônomo (sem relações Eloquent a outros modelos) |

---

## 💡 Observações Importantes (Relações Polimórficas)

O modelo **`Comment`** é implementado usando **Relações Polimórficas (`morphTo`/`morphMany`)**. Isso significa que a tabela `comments` possui as colunas `commentable_id` e `commentable_type`, permitindo que um único modelo `Comment` seja relacionado tanto a um `Post` quanto a uma `News` (e a futuros modelos, como `Event` ou `Video`).

**Exemplo de Acesso (Laravel Eloquent):**

```php
// Para obter todos os comentários de um Post:
$post->comments;

// Para obter o item pai de um comentário:
$comment->commentable; // Retorna uma instância de Post ou News
```
