import {forms} from "../data/forms.js";
import {responses} from "../data/responses.js";

export const queryResolvers = {
    forms: () => forms,
    form: (_, { id }) => forms.find(f => f.id === id),
    responses: (_, { formId }) => responses.filter(r => r.formId === formId),
};
