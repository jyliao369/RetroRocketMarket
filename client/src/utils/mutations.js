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
    mutation addPosting($title:String!, $category:String!, $platform:String!, $publisher:String!, $genre:String!, $condition:String!, $description:String!) {
        addPosting(title: $title, category: $category, platform: $platform, publisher: $publisher, genre: $genre, condition: $condition, description: $description) {
            title
            category
            platform
            publisher
            genre
            condition
            description
            postAuthor
            createdAt
        }
    }
`;

export const REMOVE_POSTING = gql`
    mutation removePosting($postingId: String!) {
        removePosting(postingId: $postingId) {
            _id
            title
            category
            platform
            publisher
            genre
            condition
            description
            postAuthor
            createdAt
        }
    }
`