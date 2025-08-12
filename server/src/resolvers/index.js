import { queryResolvers } from './query.js';
import { mutationResolvers } from './mutation.js';
import { formResolvers } from './form.js';

export const resolvers = {
  Query: queryResolvers,
  Mutation: mutationResolvers,
  Form: formResolvers.Form,
};
