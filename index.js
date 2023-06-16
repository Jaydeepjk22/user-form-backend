import express from "express";
import userRoutes from "./routes/userRoutes.js";
import { ApolloServer, gql } from "apollo-server-express";

const app = express();

app.use(express.json());

app.use("/users", userRoutes);

const typDefs = gql`
  type User {
    id: ID!
    name: String!
    dateOfBirth: String!
    email: String!
    phoneNumber: String!
  }

  input UserInput {
    name: String!
    dateOfBirth: String!
    email: String!
    phoneNumber: String!
  }

  type Query {
    users: [User]
  }

  type Mutation {
    createUser(input: UserInput!): User
  }
`;

const resolvers = {
  Query: {
    users: async () => {
      try {
        const response = await fetch("http://localhost:3000/users");
        const result = await response.json();
        return result.users;
      } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch users");
      }
    },
  },
  Mutation: {
    createUser: async (_, { input }) => {
      try {
        const response = await fetch("http://localhost:3000/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(input),
        });
        const result = await response.json();
        return result.user;
      } catch (error) {
        console.log(error);
        throw new Error("Failed to create user");
      }
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

app.listen(3000, () => {
  console.log("Server started on http://localhost:3000/graphql");
});
