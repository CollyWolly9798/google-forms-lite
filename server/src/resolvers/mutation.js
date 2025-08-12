import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateId } from '../utils/uuid.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.resolve(__dirname, '../data');
const FORMS_FILE = path.join(DATA_DIR, 'forms.json');
const RESPONSES_FILE = path.join(DATA_DIR, 'responses.json');

async function ensureDataDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

async function readJson(file, fallback) {
  try {
    const txt = await fs.readFile(file, 'utf8');
    return JSON.parse(txt);
  } catch (e) {
    if (e.code === 'ENOENT') return fallback; // file not found → fallback
    throw e;
  }
}

async function writeJson(file, data) {
  const tmp = `${file}.tmp`;
  const json = JSON.stringify(data, null, 2);
  await fs.writeFile(tmp, json, 'utf8');
  await fs.rename(tmp, file);
}

export const mutationResolvers = {
  createForm: async (_, { title, description, questions }) => {
    await ensureDataDir();

    const forms = await readJson(FORMS_FILE, []);

    const newForm = {
      id: generateId(),
      title,
      description: description ?? '',
      questions: (questions ?? []).map((q) => ({
        id: generateId(),
        text: q.text,
        type: q.type,
        options: q.options ?? null,
      })),
    };

    forms.push(newForm);
    await writeJson(FORMS_FILE, forms);

    return newForm;
  },

  submitResponse: async (_, { formId, answers }) => {
    await ensureDataDir();

    const [forms, responses] = await Promise.all([
      readJson(FORMS_FILE, []),
      readJson(RESPONSES_FILE, []),
    ]);

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
    await writeJson(RESPONSES_FILE, responses);

    return newResponse;
  },
};
