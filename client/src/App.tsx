import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const FormBuilderPage = lazy(
  () => import('./pages/FormBuilder/FormBuilderPage.tsx'),
);
const FormFillerPage = lazy(
  () => import('./pages/FormFiller/FormFillerPage.tsx'),
);
const FormResponsesPage = lazy(
  () => import('./pages/FormResponses/FormResponsesPage.tsx'),
);
const NotFoundPage = lazy(
  () => import('./pages/NotFoundPage/NotFoundPage.tsx'),
);

export default function App() {
  return (
    <Suspense
      fallback={<div className="text-center text-gray-500 mt-10">Loading</div>}
    >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/forms/new" element={<FormBuilderPage />} />
        <Route path="/forms/:id/fill" element={<FormFillerPage />} />
        <Route path="/forms/:id/responses" element={<FormResponsesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
