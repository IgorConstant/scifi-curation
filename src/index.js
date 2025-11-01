import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from './utils/rateLimiter.js';
import typeDefs from './schema/typeDefs.js';
import resolvers from './schema/resolvers.js';
import { PrismaClient } from '@prisma/client';

dotenv.config();
const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(cors());
app.use(rateLimit);

// Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({ prisma }),
});

await server.start();
server.applyMiddleware({ app, path: '/graphql' });

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}/graphql`);
});
