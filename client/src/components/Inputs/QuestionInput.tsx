import React from 'react';
import type { Question } from '../../api/generated/graphqlApi';
import { QuestionType } from '../../api/generated/graphqlApi.ts';

import { TextInput } from '../../components/Inputs/TextInput';
import { RadioInput } from '../../components/Inputs/RadioInput';
import { CheckboxInput } from '../../components/Inputs/CheckboxInput';
import { DateInput } from '../../components/Inputs/DateInput';

interface Props {
  question: Question & { options?: string[] };
  value: string | string[];
  onChange: (value: string | string[]) => void;
}

const inputComponents = {
  [QuestionType.Text]: TextInput,
  [QuestionType.Radio]: RadioInput,
  [QuestionType.Checkbox]: CheckboxInput,
  [QuestionType.Date]: DateInput,
} as const;

export const QuestionInput: React.FC<Props> = ({
  question,
  value,
  onChange,
}) => {
  const Component = inputComponents[question.type];

  if (!Component) return null;

  return (
    <Component
      questionId={question.id}
      text={question.text}
      options={question.options ?? []}
      value={value as any}
      onChange={onChange as any}
    />
  );
};
