import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Form {
    id: ID!
    title: String!
    description: String
    questions: [Question!]!
    responses: [Response!]!
  }

  enum QuestionType {
    TEXT
    CHECKBOX
    RADIO
  }

  type Question {
    id: ID!
    text: String!
    type: QuestionType!
    options: [String!]
  }

  type Response {
    id: ID!
    text: String!
    answers: [Answer!]!
  }

  type Answer {
    questionId: ID!
    text: String!
  }

  input QuestionInput {
    text: String!
    type: QuestionType!
    options: [String]
  }

  input AnswerInput {
    questionId: ID!
    text: String!
  }

  type Query {
    forms: [Form!]!
    form(id: ID!): Form!
    responses(formId: ID!): [Response!]!
  }

  type Mutation {
    createForm(
      title: String!
      description: String
      questions: [QuestionInput]
    ): Form!

    submitResponse(formId: ID!, answers: [AnswerInput]!): Response!
  }
`;
