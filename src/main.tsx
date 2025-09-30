import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// Try to import routes, fallback to direct component
let AppComponent;

try {
  // Check if we're in a routing environment
  if (window.location.pathname === '/' || window.location.pathname.endsWith('.html')) {
    // Import your main artifact directly
    const { default: MainArtifact } = await import('./artifacts/index');
    AppComponent = MainArtifact;
  } else {
    // Use router for multi-page
    const { RouterProvider, createBrowserRouter, createHashRouter } = await import('react-router-dom');
    const { default: routes } = await import('virtual:generated-pages-react');
    const { default: Layout } = await import('./components/layout');
    
    const useHash = typeof window !== 'undefined' && window.location?.protocol === 'file:';
    
    const mkRoutes = routes.map((route: any) => ({
      ...route,
      element: <Layout>{route.element}</Layout>,
    }));
    
    const router = useHash ? createHashRouter(mkRoutes) : createBrowserRouter(mkRoutes);
    AppComponent = () => <RouterProvider router={router} />;
  }
} catch (error) {
  // Fallback to main artifact
  const { default: MainArtifact } = await import('./artifacts/index');
  AppComponent = MainArtifact;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppComponent />
  </React.StrictMode>,
);