import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider, Outlet,
} from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Hero from "./routes/Hero.jsx";
import Login from "./routes/Login.jsx";
import Register from "./routes/Register.jsx";
import Logout from "./routes/Logout.jsx";
import './index.css'
import {AuthContextProvider} from "./AuthContext.jsx";

const App = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}

const routes = [
        { path: '/', element: <Hero />, index: true },
    ]

const router = createBrowserRouter([{element: <App />, children: routes},{ path: '/login', element: <Login /> },{ path: '/logout', element: <Logout /> },{ path: '/register', element: <Register />},])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
        <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>,
)
