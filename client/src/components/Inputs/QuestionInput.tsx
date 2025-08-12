import React from 'react';
import type { Question } from '../../api/generated/graphqlApi';
import { QuestionType } from '../../api/generated/graphqlApi.ts';

import { TextInput } from '../../components/Inputs/TextInput';
import { RadioInput } from '../../components/Inputs/RadioInput';
import { CheckboxInput } from '../../components/Inputs/CheckboxInput';

interface Props {
  question: Question;
  value: string | string[];
  onChange: (value: string | string[]) => void;
}

export const QuestionInput: React.FC<Props> = ({
  question,
  value,
  onChange,
}) => {
  switch (question.type) {
    case QuestionType.Text:
      return (
        <TextInput
          questionId={question.id}
          text={question.text}
          value={value as string}
          onChange={onChange as (value: string) => void}
        />
      );

    case QuestionType.Radio:
      return (
        <RadioInput
          questionId={question.id}
          text={question.text}
          options={question.options || []}
          value={value as string}
          onChange={onChange as (value: string) => void}
        />
      );

    case QuestionType.Checkbox:
      return (
        <CheckboxInput
          text={question.text}
          options={question.options || []}
          value={value as string[]}
          onChange={onChange as (value: string[]) => void}
        />
      );

    default:
      return null;
  }
};
