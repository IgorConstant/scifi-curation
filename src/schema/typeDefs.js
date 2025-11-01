import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Work {
    id: Int!
    title: String!
    type: String!
    subgenre: String
    year: Int
    creator: String
    synopsis: String
    rating: Float
    relatedWorks: [RelatedWork!]!
  }

  type RelatedWork {
    id: Int!
    relationType: String!
    toWork: Work!
  }

  type Query {
    # Listar todas as obras
    works: [Work!]!

    # Listar por ID ou por termo no título
    work(id: Int, term: String): [Work!]!
  }

  type Mutation {
    # Adicionar uma nova obra
    addWork(
      title: String!
      type: String!
      subgenre: String
      year: Int
      creator: String
      synopsis: String
      rating: Float
    ): Work!
  }
`;
