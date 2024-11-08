import React from "react";
import LoginForm from "./components/LoginForm";

const App: React.FC = () => {
  const handleLogin = (email: string, password: string) => {
    console.log("email:", email, "password", password);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
};
export default App;
