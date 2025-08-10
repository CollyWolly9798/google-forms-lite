import {gql} from 'apollo-server'

export const typeDefs = gql`
type Form {
id:ID!
title: String!
description: String
questions: [Question!]!
}`
