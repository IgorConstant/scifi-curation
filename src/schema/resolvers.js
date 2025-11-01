import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const resolvers = {
  Query: {
    // 🔹 Retorna todas as obras
    works: async () => {
      return await prisma.work.findMany({
        include: {
          relatedFrom: { include: { toWork: true } },
          relatedTo: { include: { fromWork: true } },
        },
      });
    },

    // 🔹 Retorna uma obra específica por ID
    work: async (_, { id }) => {
      return await prisma.work.findUnique({
        where: { id },
        include: {
          relatedFrom: { include: { toWork: true } },
          relatedTo: { include: { fromWork: true } },
        },
      });
    },

    // 🔹 Busca por termo (título, sinopse ou criador)
    searchWorks: async (_, { term }) => {
      return await prisma.work.findMany({
        where: {
          OR: [
            { title: { contains: term, mode: "insensitive" } },
            { synopsis: { contains: term, mode: "insensitive" } },
            { creator: { contains: term, mode: "insensitive" } },
          ],
        },
      });
    },

    // 🔹 Retorna todas as relações entre obras
    relations: async () => {
      return await prisma.relatedWork.findMany({
        include: {
          fromWork: true,
          toWork: true,
        },
      });
    },
  },

  Mutation: {
    // 🔹 Adiciona uma nova obra
    addWork: async (_, { data }) => {
      return await prisma.work.create({ data });
    },

    // 🔹 Adiciona uma relação entre duas obras
    addRelation: async (_, { data }) => {
      const { fromWorkId, toWorkId, relationType } = data;

      return await prisma.relatedWork.create({
        data: {
          relationType,
          fromWork: { connect: { id: fromWorkId } },
          toWork: { connect: { id: toWorkId } },
        },
        include: {
          fromWork: true,
          toWork: true,
        },
      });
    },
  },
};

export default resolvers;
