// import { useEffect, useState } from "react";
import { AuthProvider } from "./context/AuthContext";
import Router from "./shared/Router";
// import axios from "axios";

const App = () => {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
};

export default App;
