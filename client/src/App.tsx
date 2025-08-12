import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage.tsx';
import FormBuilder from './pages/FormBuilder/FormBuilderPage.tsx';
import FormFiller from './pages/FormFiller/FormFillerPage.tsx';
import FormResponsesPage from './pages/FormResponses/FormResponsesPage.tsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/forms/new" element={<FormBuilder />} />
      <Route path="/forms/:id/fill" element={<FormFiller />} />
      <Route path="/forms/:id/responses" element={<FormResponsesPage />} />
    </Routes>
  );
}
