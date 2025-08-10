import {gql} from  "apollo-server"

export const typeDefs = gql`
type Form{
id: ID!
title: String!
description: String
questions: [Question!]!
}

type Question {
id: ID!
text: String!
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
}

input AnswerInput {
questionId: ID!
text: String!
}

type Query {
forms:[Form!]!
form(id: ID!): Form!
responses(formId: ID!): [Response!]!
}

type Mutation {
createForm(
title: String!
description: String
questions: [QuestionInput]
): Form!

submitResponse(
formId: ID!
answers: [AnswerInput]!): Response!
}
`;