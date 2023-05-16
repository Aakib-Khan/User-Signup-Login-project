import {
  
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import "./App.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import SignUp from "./Components/Signup";
import LogIn from "./Components/LogIn";
import { useEffect } from "react";
import Home from "./Components/Home";

function App() {
  const redirect = useNavigate()

  const queryClient = new QueryClient();
  const auth = localStorage.getItem('user')
    useEffect(() => {
        if (!auth) {
          redirect('/')
        }
      }, [auth])
  return (
    <>
      <QueryClientProvider client={queryClient}>

          {/* <Navbar /> */}
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/" element={<SignUp />} />
          </Routes>
          {/* <Footer /> */}
        
      </QueryClientProvider>
    </>
  );
}

export default App;
