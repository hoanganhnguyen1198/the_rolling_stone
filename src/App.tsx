import { Routes, Route, useNavigate } from "react-router-dom";

import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import NoPage from "./pages/NoPage";
import SignUpPage from "./pages/SignUpPage";
import { useEffect, useState } from "react";

function App() {
  const [token, setToken] = useState(false);
  const [tokenSignUp, setTokenSignUp] = useState(false);

  const navigate = useNavigate();

  const handleSuccessLogin = (newToken: boolean) => {
    setToken(newToken);
    navigate("/main", { replace: true });
  };
  const handleSignOut = () => {
    setToken(false);
    navigate("/", { replace: true });
  };
  const handleSignUp = () => {
    setTokenSignUp(true);
    navigate("/signup", { replace: true });
  };

  useEffect(() => {
    if (!token && !tokenSignUp) {
      navigate("/", { replace: true });
      setTokenSignUp(false);
    }
  }, [navigate]);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <LoginPage
              onSuccessLogin={handleSuccessLogin}
              onSignUp={handleSignUp}
            />
          }
        ></Route>
        <Route
          path="/main"
          element={<MainPage onSignOut={handleSignOut} />}
        ></Route>
        <Route path="/signup" element={<SignUpPage />}></Route>
        <Route path="/*" element={<NoPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
