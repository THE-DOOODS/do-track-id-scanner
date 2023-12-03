import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login, Dashboard } from '@/pages';
import AuthContextProvider from '@/context/AuthContextProvider';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <Fragment>
              <AuthContextProvider>
                <Dashboard />
              </AuthContextProvider>
            </Fragment>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
