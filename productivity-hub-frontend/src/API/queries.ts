import { gql } from '@apollo/client';

export const GET_NOTES = gql`
  query {
    notes {
      id
      name
      content
    }
}
`;

export const GET_TASKS = gql`
  query {
    tasks {
      id
      name
      description
      dueDate
    }
}
`;
