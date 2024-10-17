# App de Receitas 🍔🍷

Um aplicativo moderno de receitas, desenvolvido com React, utilizando Hooks e Context API. O app permite visualizar, buscar, filtrar, favoritar e acompanhar o progresso de preparação de receitas de comidas e bebidas.

## 🚀 Funcionalidades

- **Ver receitas** de comidas e bebidas.
- **Buscar** receitas por nome ou categoria.
- **Filtrar** receitas por nacionalidade e categoria.
- **Favoritar** receitas.
- **Acompanhar** o progresso de preparação de receitas.

## 📚 Habilidades

Neste projeto, foram desenvolvidas as seguintes habilidades:

- Gerenciar estado utilizando **Redux** e **React-Redux**.
- Usar a **Context API** do React.
- Trabalhar com os Hooks `useState`, `useContext` e `useEffect`.
- Criar **Hooks customizados**.

## ⚙️ APIs

### TheMealDB API

Base de dados aberta com receitas e ingredientes de todo o mundo.

- **Endereço da API:** [TheMealDB](https://www.themealdb.com/)
- **Exemplo de resposta:**

```json
{
  "meals":[
    {
      "idMeal":"52882",
      "strMeal":"Three Fish Pie",
      // outros campos...
    }
  ]
}
```

- **Endpoints úteis:**
  - Listar categorias: `https://www.themealdb.com/api/json/v1/1/list.php?c=list`
  - Listar nacionalidades: `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  - Listar ingredientes: `https://www.themealdb.com/api/json/v1/1/list.php?i=list`

### TheCockTailDB API

Semelhante à TheMealDB, focada em bebidas.

- **Endereço da API:** [TheCockTailDB](https://www.thecocktaildb.com/)
- **Exemplo de resposta:**

```json
{
  "drinks":[
    {
      "idDrink":"17256",
      "strDrink":"Martinez 2",
      // outros campos...
    }
  ]
}
```

## ℹ️ Observações Técnicas

### Rotas

As rotas utilizadas na aplicação foram:

- Tela de login: `/`
- Tela principal de receitas de comidas: `/meals`
- Tela principal de receitas de bebidas: `/drinks`
- Tela de detalhes de uma receita de comida: `/meals/:id`
- Tela de detalhes de uma receita de bebida: `/drinks/:id`
- Tela de receita em progresso de comida: `/meals/:id/in-progress`
- Tela de receita em progresso de bebida: `/drinks/:id/in-progress`
- Tela de perfil: `/profile`
- Tela de receitas feitas: `/done-recipes`
- Tela de receitas favoritas: `/favorite-recipes`

### LocalStorage

O uso de `localStorage` foi necessário para manter as informações ao atualizar a página. As chaves seguem as seguintes estruturas:

- **Chave `user`:**
```json
{
  "email": "email-da-pessoa"
}
```

- **Chave `doneRecipes`:**
```json
[{
  "id": "id-da-receita",
  "type": "meal-ou-drink",
  "nationality": "nacionalidade-da-receita-ou-texto-vazio",
  "category": "categoria-da-receita-ou-texto-vazio",
  "alcoholicOrNot": "alcoholic-ou-non-alcoholic-ou-texto-vazio",
  "name": "nome-da-receita",
  "image": "imagem-da-receita",
  "doneDate": "quando-a-receita-foi-concluida",
  "tags": []
}]
```

- **Chave `favoriteRecipes`:**
```json
[{
  "id": "id-da-receita",
  "type": "meal-ou-drink",
  "nationality": "nacionalidade-da-receita-ou-texto-vazio",
  "category": "categoria-da-receita-ou-texto-vazio",
  "alcoholicOrNot": "alcoholic-ou-non-alcoholic-ou-texto-vazio",
  "name": "nome-da-receita",
  "image": "imagem-da-receita"
}]
```

- **Chave `inProgressRecipes`:**
```json
{
  "drinks": {
    "id-da-bebida": ["lista-de-ingredientes-utilizados"]
  },
  "meals": {
    "id-da-comida": ["lista-de-ingredientes-utilizados"]
  }
}
```

## 🛠️ Tecnologias Utilizadas

- React
- Redux
- Context API
- Hooks (useState, useContext, useEffect)
- Fetch API

## 🤝 Observações

Projeto desenvolvido em grupo durante o curso de desenvolvedor fullstack na Trybe, aplicando-se a teoria do Kanban através da plataforma Trello.