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
import TransactionsPage from './pages/TransactionsPage';

import ProtectedRoute from './components/ProtectedRoute';

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
            element={
              <ProtectedRoute>
                <ExplorePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/holdings"
            element={
              <ProtectedRoute>
                <HoldingsPage />
              </ProtectedRoute>}
          />

          <Route
            path="/dashboard"
            element={
              <Navigate to="/explore" />
            }
          />

          <Route
            path="/transactions"
            element={<ProtectedRoute>
              <TransactionsPage />
            </ProtectedRoute>
            }
          />


        </Route>
      </Routes>
    </BrowserRouter>
  );
}