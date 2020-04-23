import gql from 'graphql-tag';

// BOARDS
const CREATE_BOARD = gql`
  mutation addBoard($boardName: String!) {
    addBoard(name: $boardName) {
        name
    }
  }
`;
const EDIT_BOARD = gql`
  mutation editBoard($boardId: ID!, $boardName: String!) {
    editBoard(id: $boardId, name: $boardName) {
      id
      name
    }
  }
`;
const DELETE_BOARD = gql`
  mutation deleteBoard($id: ID!) {
    deleteBoard(id: $id) {
      id
    }
  }
`;

// LISTS
const CREATE_LIST = gql`
  mutation addList($listName: String!, $boardId: ID!) {
    addList(name: $listName, boardId: $boardId) {
        name
        boardId
    }
  }
`;
const EDIT_LIST = gql`
  mutation editList($listId: ID!, $listName: String!) {
    editList(id: $listId, name: $listName) {
      id
      name
    }
  }
`;
const DELETE_LIST = gql`
  mutation deleteList($id: ID!) {
    deleteList(id: $id) {
      id
    }
  }
`;

// ITEMS
const CREATE_ITEM = gql`
  mutation addItem($itemName: String!, $listId: ID!) {
    addItem(name: $itemName, listId: $listId) {
      name
      listId
    }
  }
`;
const EDIT_ITEM = gql`
  mutation editItem($itemId: ID!, $itemName: String!) {
    editItem(id: $itemId, name: $itemName) {
      id
      name
    }
  }
`;
const MOVE_ITEM = gql`
  mutation moveItem($itemId: ID!, $listId: ID!) {
    moveItem(id: $itemId, listId: $listId) {
      id
      listId
    }
  }
`;
const DELETE_ITEM = gql`
  mutation deleteItem($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`;

export {
  CREATE_BOARD,
  EDIT_BOARD,
  DELETE_BOARD,
  CREATE_LIST,
  EDIT_LIST,
  DELETE_LIST,
  CREATE_ITEM,
  EDIT_ITEM,
  MOVE_ITEM,
  DELETE_ITEM
}