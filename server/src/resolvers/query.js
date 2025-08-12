import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.resolve(__dirname, '../data');
const FORMS_FILE = path.join(DATA_DIR, 'forms.json');
const RESPONSES_FILE = path.join(DATA_DIR, 'responses.json');

async function readJson(file) {
  try {
    const txt = await fs.readFile(file, 'utf8');
    return JSON.parse(txt);
  } catch (e) {
    if (e.code === 'ENOENT') return [];
    throw e;
  }
}

export const queryResolvers = {
  forms: async () => {
    return readJson(FORMS_FILE);
  },

  form: async (_parent, { id }) => {
    const forms = await readJson(FORMS_FILE);
    return forms.find((f) => f.id === id) ?? null;
  },

  responses: async (_parent, { formId }) => {
    const all = await readJson(RESPONSES_FILE);
    return all.filter((r) => r.formId === formId);
  },
};
