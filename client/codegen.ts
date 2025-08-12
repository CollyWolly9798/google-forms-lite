import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:4000/graphql',
  documents: 'src/graphql/**/*.{graphql,gql}',
  generates: {
    'src/api/generated/graphqlApi.ts': {
      plugins: ['typescript', 'typescript-operations', 'typescript-rtk-query'],
      config: {
        importBaseApiFrom: '../baseApi',
        exportHooks: true,
      },
    },
  },
};
export default config;
