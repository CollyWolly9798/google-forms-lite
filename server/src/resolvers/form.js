import path from 'path';
import { fileURLToPath } from 'url';
import { promises as fs } from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RESPONSES_FILE = path.join(__dirname, '../data/responses.json');

async function readJson(file, fallback) {
  try {
    const txt = await fs.readFile(file, 'utf8');
    return JSON.parse(txt);
  } catch (e) {
    if (e.code === 'ENOENT') return fallback;
    throw e;
  }
}

export const formResolvers = {
  Form: {
    responses: async (parent) => {
      const responses = await readJson(RESPONSES_FILE, []);
      return responses.filter((r) => r.formId === parent.id);
    },
  },
};
