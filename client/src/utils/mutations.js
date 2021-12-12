import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_POSTING = gql`
    mutation addPosting($title: String!, $publisher: String!, $condition: String!, $description: String!) {
        addPosting(title: $title, publisher: $publisher, condition: $condition, description: $description) {
            _id
            title
            postAuthor
            publisher
            condition
            description
            createdAt
        }
    }
`;