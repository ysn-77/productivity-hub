import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(input: { username: $username, password: $password }) {
      id
      username
    }
  }
`;

export const USER_CREATE = gql`
  mutation userCreate($username: String!, $password: String!) {
    userCreate(input: { username: $username, password: $password }) {
      id
      username
    }
  }
`;

export const TASK_CREATE = gql`
  mutation taskCreate(
    $name: String!
    $description: String
    $dueDate: ISO8601Date
  ) {
    taskCreate(
      input: { name: $name, description: $description, dueDate: $dueDate }
    ) {
      id
      name
      description
      dueDate
    }
  }
`;

export const TASK_UPDATE = gql`
  mutation taskUpdate(
    $id: ID!
    $name: String
    $description: String
    $dueDate: ISO8601Date
  ) {
    taskUpdate(
      input: {
        id: $id
        name: $name
        description: $description
        dueDate: $dueDate
      }
    ) {
      id
      name
      description
      dueDate
    }
  }
`;

export const TASK_DELETE = gql`
  mutation taskDelete($id: ID!) {
    taskDelete(input: { id: $id }) {
      id
    }
  }
`;

export const NOTE_CREATE = gql`
  mutation noteCreate($name: String!, $content: String) {
    noteCreate(input: { name: $name, content: $content }) {
      id
      name
      content
    }
  }
`;

export const NOTE_UPDATE = gql`
  mutation noteUpdate($id: ID!, $name: String, $content: String) {
    noteUpdate(input: { id: $id, name: $name, content: $content }) {
      id
      name
      content
    }
  }
`;

export const NOTE_DELETE = gql`
  mutation noteDelete($id: ID!) {
    noteDelete(input: { id: $id }) {
      id
    }
  }
`;
