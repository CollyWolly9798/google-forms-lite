import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage.tsx';
import FormBuilder from './pages/FormBuilder/FormBuilder.tsx';
import FormFiller from './pages/FormFiller/FormFiller.tsx';
import FormResponses from './pages/FormResponses/FormResponses.tsx';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/forms/new" element={<FormBuilder />} />
      <Route path="/forms/:id/fill" element={<FormFiller />} />
      <Route path="/forms/:id/responses" element={<FormResponses />} />
    </Routes>
  );
}
