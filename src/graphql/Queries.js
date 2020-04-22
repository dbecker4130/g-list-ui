import gql from 'graphql-tag';

const GET_BOARDS = gql`
  query getBoards {
    getBoards {
      id
      name
    }
  }
`;

const GET_BOARD = gql`
  query getBoard($boardId: ID!) {
    getBoard(id: $boardId) {
      id
      name
      lists {
        id
        boardId
        name
        items {
          id
          name
        }
      }
    }
  }
`;

const GET_LISTS = gql`
  query getLists($boardId: ID!) {
    getLists(id: $boardId) {
      id
      name
    }
  }
`;

const GET_LIST = gql`
  query getList($listId: ID!) {
    getList(id: $listId) {
      id
      name
      items {
        id
        name
      }
    }
  }
`;

export {
    GET_BOARDS,
    GET_BOARD,
    GET_LISTS,
    GET_LIST
}