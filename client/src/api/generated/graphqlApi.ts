import { api } from '../baseApi';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Answer = {
  __typename?: 'Answer';
  questionId: Scalars['ID']['output'];
  text: Scalars['String']['output'];
};

export type AnswerInput = {
  questionId: Scalars['ID']['input'];
  text: Scalars['String']['input'];
};

export type Form = {
  __typename?: 'Form';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  questions: Array<Question>;
  responses: Array<Response>;
  title: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createForm: Form;
  submitResponse: Response;
};


export type MutationCreateFormArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  questions?: InputMaybe<Array<InputMaybe<QuestionInput>>>;
  title: Scalars['String']['input'];
};


export type MutationSubmitResponseArgs = {
  answers: Array<InputMaybe<AnswerInput>>;
  formId: Scalars['ID']['input'];
};

export type Query = {
  __typename?: 'Query';
  form: Form;
  forms: Array<Form>;
  responses: Array<Response>;
};


export type QueryFormArgs = {
  id: Scalars['ID']['input'];
};


export type QueryResponsesArgs = {
  formId: Scalars['ID']['input'];
};

export type Question = {
  __typename?: 'Question';
  id: Scalars['ID']['output'];
  options?: Maybe<Array<Scalars['String']['output']>>;
  text: Scalars['String']['output'];
  type: QuestionType;
};

export type QuestionInput = {
  options?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  text: Scalars['String']['input'];
  type: QuestionType;
};

export enum QuestionType {
  Checkbox = 'CHECKBOX',
  Radio = 'RADIO',
  Text = 'TEXT'
}

export type Response = {
  __typename?: 'Response';
  answers: Array<Answer>;
  id: Scalars['ID']['output'];
  text: Scalars['String']['output'];
};

export type CreateFormMutationVariables = Exact<{
  title: Scalars['String']['input'];
  description: Scalars['String']['input'];
  questions: Array<QuestionInput> | QuestionInput;
}>;


export type CreateFormMutation = { __typename?: 'Mutation', createForm: { __typename?: 'Form', id: string, title: string, questions: Array<{ __typename?: 'Question', id: string, text: string, type: QuestionType }> } };

export type GetFormResponsesQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetFormResponsesQuery = { __typename?: 'Query', form: { __typename?: 'Form', id: string, title: string, questions: Array<{ __typename?: 'Question', id: string, text: string }>, responses: Array<{ __typename?: 'Response', id: string, answers: Array<{ __typename?: 'Answer', questionId: string }> }> } };

export type SubmitResponseMutationVariables = Exact<{
  formId: Scalars['ID']['input'];
  answers: Array<AnswerInput> | AnswerInput;
}>;


export type SubmitResponseMutation = { __typename?: 'Mutation', submitResponse: { __typename?: 'Response', id: string } };

export type FormQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type FormQuery = { __typename?: 'Query', form: { __typename?: 'Form', id: string, title: string, description?: string | null, questions: Array<{ __typename?: 'Question', id: string, text: string, type: QuestionType, options?: Array<string> | null }> } };

export type FormByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type FormByIdQuery = { __typename?: 'Query', form: { __typename?: 'Form', id: string, title: string, description?: string | null, questions: Array<{ __typename?: 'Question', id: string, text: string }> } };

export type FormsQueryVariables = Exact<{ [key: string]: never; }>;


export type FormsQuery = { __typename?: 'Query', forms: Array<{ __typename?: 'Form', id: string, title: string, description?: string | null }> };

export type GetFormsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFormsQuery = { __typename?: 'Query', forms: Array<{ __typename?: 'Form', id: string, title: string, description?: string | null }> };

export type ResponsesQueryVariables = Exact<{
  formId: Scalars['ID']['input'];
}>;


export type ResponsesQuery = { __typename?: 'Query', responses: Array<{ __typename?: 'Response', id: string, answers: Array<{ __typename?: 'Answer', questionId: string, text: string }> }> };


export const CreateFormDocument = `
    mutation CreateForm($title: String!, $description: String!, $questions: [QuestionInput!]!) {
  createForm(title: $title, description: $description, questions: $questions) {
    id
    title
    questions {
      id
      text
      type
    }
  }
}
    `;
export const GetFormResponsesDocument = `
    query GetFormResponses($id: ID!) {
  form(id: $id) {
    id
    title
    questions {
      id
      text
    }
    responses {
      id
      answers {
        questionId
      }
    }
  }
}
    `;
export const SubmitResponseDocument = `
    mutation SubmitResponse($formId: ID!, $answers: [AnswerInput!]!) {
  submitResponse(formId: $formId, answers: $answers) {
    id
  }
}
    `;
export const FormDocument = `
    query Form($id: ID!) {
  form(id: $id) {
    id
    title
    description
    questions {
      id
      text
      type
      options
    }
  }
}
    `;
export const FormByIdDocument = `
    query FormById($id: ID!) {
  form(id: $id) {
    id
    title
    description
    questions {
      id
      text
    }
  }
}
    `;
export const FormsDocument = `
    query Forms {
  forms {
    id
    title
    description
  }
}
    `;
export const GetFormsDocument = `
    query getForms {
  forms {
    id
    title
    description
  }
}
    `;
export const ResponsesDocument = `
    query Responses($formId: ID!) {
  responses(formId: $formId) {
    id
    answers {
      questionId
      text
    }
  }
}
    `;

const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    CreateForm: build.mutation<CreateFormMutation, CreateFormMutationVariables>({
      query: (variables) => ({ document: CreateFormDocument, variables })
    }),
    GetFormResponses: build.query<GetFormResponsesQuery, GetFormResponsesQueryVariables>({
      query: (variables) => ({ document: GetFormResponsesDocument, variables })
    }),
    SubmitResponse: build.mutation<SubmitResponseMutation, SubmitResponseMutationVariables>({
      query: (variables) => ({ document: SubmitResponseDocument, variables })
    }),
    Form: build.query<FormQuery, FormQueryVariables>({
      query: (variables) => ({ document: FormDocument, variables })
    }),
    FormById: build.query<FormByIdQuery, FormByIdQueryVariables>({
      query: (variables) => ({ document: FormByIdDocument, variables })
    }),
    Forms: build.query<FormsQuery, FormsQueryVariables | void>({
      query: (variables) => ({ document: FormsDocument, variables })
    }),
    getForms: build.query<GetFormsQuery, GetFormsQueryVariables | void>({
      query: (variables) => ({ document: GetFormsDocument, variables })
    }),
    Responses: build.query<ResponsesQuery, ResponsesQueryVariables>({
      query: (variables) => ({ document: ResponsesDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useCreateFormMutation, useGetFormResponsesQuery, useLazyGetFormResponsesQuery, useSubmitResponseMutation, useFormQuery, useLazyFormQuery, useFormByIdQuery, useLazyFormByIdQuery, useFormsQuery, useLazyFormsQuery, useGetFormsQuery, useLazyGetFormsQuery, useResponsesQuery, useLazyResponsesQuery } = injectedRtkApi;

