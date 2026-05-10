import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';

import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';

import { useUserStore } from './store/useUserStore';

function App() {
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    const savedUser = localStorage.getItem('simulation-user');

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/dashboard"
          element={<DashboardPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;