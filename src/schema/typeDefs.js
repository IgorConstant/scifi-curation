import { gql } from "apollo-server-express";

const typeDefs = gql`
  type Work {
    id: Int!
    title: String!
    type: String!
    year: Int
    creator: String
    subgenre: String
    synopsis: String
    rating: Float
    relatedFrom: [RelatedWork]
    relatedTo: [RelatedWork]
  }

  type RelatedWork {
    id: Int!
    relationType: String!
    fromWork: Work!
    toWork: Work!
  }

  input WorkInput {
    title: String!
    type: String!
    year: Int
    creator: String
    subgenre: String
    synopsis: String
    rating: Float
  }

  input RelatedWorkInput {
    relationType: String!
    fromWorkId: Int!
    toWorkId: Int!
  }

  type Query {
    works: [Work!]!
    work(id: Int!): Work
    searchWorks(term: String!): [Work!]!
    relations: [RelatedWork!]!
  }

  type Mutation {
    addWork(data: WorkInput!): Work!
    addRelation(data: RelatedWorkInput!): RelatedWork!
  }
`;

export default typeDefs;
