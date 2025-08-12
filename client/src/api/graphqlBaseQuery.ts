import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import type { DocumentNode } from 'graphql';
import { print } from 'graphql';

type MaybeVars = Record<string, any> | undefined | void;

type GraphQLRequest = {
  document: string | DocumentNode;
  variables?: MaybeVars; // accept void from codegen
};

export const graphqlBaseQuery = (
  url: string,
  { headers: defaultHeaders }: { headers?: HeadersInit } = {},
): BaseQueryFn<GraphQLRequest, unknown, unknown> => {
  return async ({ document, variables }) => {
    try {
      const query = typeof document === 'string' ? document : print(document);

      const body =
        variables === undefined ? { query } : { query, variables: variables };

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'content-type': 'application/json', ...defaultHeaders },
        body: JSON.stringify(body),
      });

      const json = await res.json();

      if (json.errors?.length) {
        return { error: { status: res.status, data: json.errors } };
      }
      return { data: json.data };
    } catch (e) {
      return { error: { status: 'FETCH_ERROR', data: String(e) } };
    }
  };
};
