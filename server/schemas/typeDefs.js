const { gql } = require('apollo-server-express');

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
        description: String
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

        addPosting(title: String!, category: String!, platform: String!, publisher: String!, genre: String!, condition: String!, description: String!, postAuthor: String): Posting
        removePosting(postingId: String!): Posting
    }
`;

module.exports = typeDefs;