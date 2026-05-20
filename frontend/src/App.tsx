import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import AppLayout from './layouts/AppLayout';

import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import HoldingsPage from './pages/HoldingsPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />

        <Route element={<AppLayout />}>
          <Route
            path="/explore"
            element={<ExplorePage />}
          />

          <Route
            path="/holdings"
            element={<HoldingsPage />}
          />

          <Route
            path="/dashboard"
            element={
              <Navigate to="/explore" />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}