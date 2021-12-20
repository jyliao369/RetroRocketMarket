import { gql } from "@apollo/client";

export const QUERY_USER = gql`
  query allUsers {
    users {
      _id
      username
      email
    }
  }
`;

export const QUERY_SINGLE_USER = gql`
  query singleUser($userId: ID!) {
    user(userId: $userId) {
      _id
      username
      email
      postings {
        _id
        title
        category
        platform
        publisher
        genre
        condition
        description
        imageid
        postAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_MYPROFILE = gql`
  query myprofile {
    myprofile {
      _id
      username
      email
      postings {
        _id
        title
        category
        platform
        publisher
        genre
        condition
        description
        imageid
        postAuthor
        createdAt
      }
    }
  }
`;

export const QUERY_POSTINGS = gql`
  query getPostings {
    postings {
      _id
      title
      category
      platform
      publisher
      genre
      condition
      description
      imageid
      postAuthor
      createdAt
    }
  }
`;

export const QUERY_SINGLE_POSTING = gql`
  query getSinglePosting($postingId: ID!) {
    posting(postingId: $postingId) {
      _id
      title
      category
      platform
      publisher
      genre
      condition
      description
      imageid
      postAuthor
      createdAt
    }
  }
`;
