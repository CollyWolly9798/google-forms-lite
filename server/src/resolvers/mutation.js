import { forms } from '../data/forms.js';
import { responses } from '../data/responses.js';
import { generateId } from '../utils/uuid.js';

export const mutationResolvers = {
  createForm: (_, { title, description, questions }) => {
    const newForm = {
      id: generateId(),
      title,
      description: description || '',
      questions: (questions || []).map((q) => ({
        id: generateId(),
        text: q.text,
      })),
    };
    forms.push(newForm);
    return newForm;
  },

  submitResponse: (_, { formId, answers }) => {
    const formExists = forms.some((f) => f.id === formId);
    if (!formExists) {
      throw new Error(`Form with ID ${formId} does not exist`);
    }

    const newResponse = {
      id: generateId(),
      formId,
      answers,
    };
    responses.push(newResponse);
    return newResponse;
  },
};
