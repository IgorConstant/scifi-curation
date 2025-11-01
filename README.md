# Sci-Fi Curation API / API de Curadoria de Ficção Científica

**ENG:** This API provides curated information about science fiction books, movies, TV shows, and games. Users can search for titles, get recommendations, add new works, and explore relationships between different sci-fi media.

**PT_BR:** Esta API fornece informações selecionadas sobre livros, filmes, programas de TV e jogos de ficção científica. Os usuários podem pesquisar títulos, obter recomendações, adicionar novas obras e explorar relacionamentos entre diferentes mídias de ficção científica.

---

## Endpoint

**GraphQL Endpoint:**
`http://localhost:4000/graphql`

Todas as queries e mutations são acessadas via esse único endpoint.

---

## Queries / Consultas

### 1. Listar todas as obras

```graphql
query {
  works {
    id
    title
    type
    subgenre
    year
    creator
    rating
    relatedWorks {
      relationType
      toWork {
        title
        type
      }
    }
  }
}
```

### 2. Buscar por ID ou termo

**Por ID:**

```graphql
query {
  work(id: 1) {
    id
    title
    type
    creator
  }
}
```

**Por termo (busca parcial no título):**

```graphql
query {
  work(term: "Blade") {
    id
    title
    type
    creator
  }
}
```

---

## Mutations / Mutações

### Adicionar uma nova obra

```graphql
mutation {
  addWork(
    title: "Dune"
    type: "book"
    year: 1965
    creator: "Frank Herbert"
    subgenre: "space opera"
    synopsis: "A luta pelo controle do planeta deserto Arrakis."
    rating: 9.5
  ) {
    id
    title
  }
}
```

---

## Relacionamentos / Relationships

As obras podem se relacionar entre si (ex: “inspired by”, “same universe”).

Exemplo:
Blade Runner → inspired by → Neuromancer

---

## Exemplos de Consultas por Tipo

### Filmes de Ficção Científica

```graphql
query {
  work(term: "Runner") {
    title
    type
    year
    creator
    synopsis
  }
}
```

### Livros de Ficção Científica

```graphql
query {
  work(term: "Neuromancer") {
    title
    type
    year
    creator
    synopsis
  }
}
```

### Jogos de Ficção Científica

```graphql
mutation {
  addWork(
    title: "Mass Effect"
    type: "game"
    year: 2007
    creator: "BioWare"
    subgenre: "space opera"
    synopsis: "Um épico RPG espacial onde o jogador assume o papel do Comandante Shepard."
    rating: 9.2
  ) {
    id
    title
  }
}
```

### Board Games de Ficção Científica

```graphql
mutation {
  addWork(
    title: "Twilight Imperium"
    type: "boardgame"
    year: 1997
    creator: "Christian T. Petersen"
    subgenre: "space strategy"
    synopsis: "Um jogo de tabuleiro épico sobre política, guerra e diplomacia galáctica."
    rating: 8.9
  ) {
    id
    title
  }
}
```

---

## Configuração / Setup

### 1. Clonar o repositório

```bash
git clone https://github.com/IgorConstant/scifi-curation.git
cd scifi-curation
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Rodar migrações do Prisma

```bash
npx prisma migrate dev --name init
```

### 4. Iniciar o servidor

```bash
npm start
```

O playground GraphQL estará disponível em:
`http://localhost:4000/graphql`

---

## Tecnologias

* Node.js + Express
* GraphQL (Apollo Server)
* Prisma ORM + SQLite
* Express Rate Limit (controle de requisições)
* dotenv para variáveis de ambiente

---

## Observações

* Banco de dados local com SQLite (ideal para projetos públicos e gratuitos).
* Não é necessário seed manual — novas obras podem ser criadas via mutation `addWork`.
* O rate limiting previne abuso de requisições.
* A API é pública e documentada via GraphQL Schema Docs (compatível com Apollo Studio).

---

## Donate

Se este projeto for útil para você e quiser apoiar o desenvolvimento, considere fazer uma doação:

**Pix:** [igorhenriqueconstant@gmail.com](mailto:igorhenriqueconstant@gmail.com)
