const { gql } = require("apollo-server");

const typeDefs = gql`
  type Flashcard {
    id: ID!
    userId: String
    deckId: String
    front: String
    back: String
    due: String
    reviews: Int
    retention: Int
    new: Boolean
    createdAt: String
    nextReview: Int
    mastered: Boolean
  }

  type Deck {
    id: ID!
    userId: String
    name: String
    createdAt: String
    flashcards: [Flashcard]
  }

  type User {
    id: ID!
    password: String
    email: String
    name: String
    createdAt: String
    decks: [Deck]
    flashcards: [Flashcard]
  }

  type Query {
    user: User
    deck(id: ID!): Deck
    isAuthenticated: Boolean!
    dueFlashcards: [Flashcard]
    newFlashcards: [Flashcard]
    dueFromDeck(deckId: ID!): [Flashcard]
    newFromDeck(deckId: ID!): [Flashcard]
    logout: Boolean!
  }

  type Mutation {
    createUser(email: String!, password: String!): String!
    loginUser(email: String!, password: String!): String!
    createDeck(name: String!): Deck!
    createFlashcard(data: CreateFlashcardInput): Flashcard!
    updateFlashcard(data: UpdateFlashcardInput): Flashcard!
    deleteFlashcard(id: ID!): Flashcard!
    deleteDeck(id: ID!): Deck!
  }

  input UpdateFlashcardInput {
    id: ID!
    front: String
    back: String
    due: String
    reviews: Int
    retention: Int
    new: Boolean
    nextReview: Int
    mastered: Boolean
  }

  input CreateFlashcardInput {
    front: String
    back: String
    deckId: String!
  }
`;

module.exports = {
  typeDefs,
};
