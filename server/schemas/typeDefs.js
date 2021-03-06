const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    postings: [Posting]!
  }

  type Posting {
    _id: ID
    title: String
    category: String
    platform: String
    publisher: String
    genre: String
    condition: String
    accessory: String
    accessoryCheck: String
    cardGame: String
    cardSale: String
    figurineManufacture: String
    figureManufacture: String
    description: String
    imageid: String
    postAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(userId: ID!): User

    postings: [Posting]
    posting(postingId: ID!): Posting

    myprofile: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    removeUser: User

    login(email: String!, password: String!): Auth

    addPosting(
      title: String!
      category: String!
      platform: String!
      publisher: String!
      genre: String!
      condition: String!
      accessory: String!
      accessoryCheck: String!
      cardGame: String!
      cardSale: String!
      figurineManufacture: String!
      figureManufacture: String!
      description: String!
      imageid: String
      postAuthor: String
    ): Posting
    removePosting(postingId: String!): Posting

    updatePosting(
      postingId: String!
      title: String
      category: String
      platform: String
      publisher: String
      genre: String
      condition: String
      accessory: String
      accessoryCheck: String
      cardGame: String
      cardSale: String
      figurineManufacture: String
      figureManufacture: String
      description: String
      imageid: String
    ): Posting
  }
`;

module.exports = typeDefs;
