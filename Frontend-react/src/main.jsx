import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider, Outlet,
} from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Hero, {dataLoader}from "./routes/Hero.jsx";
import Login from "./routes/Login.jsx";
import Register from "./routes/Register.jsx";
import Logout from "./routes/Logout.jsx";
import './index.css'
import {AuthProvider} from "./AuthContext.jsx";

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
        { path: '/', element: <Hero />, index: true, loader: dataLoader },
        { path: '/register', element: <Register />},
        { path: '/login', element: <Login /> },
        { path: '/logout', element: <Logout /> },
    ]

const router = createBrowserRouter([{element: <App />, children: routes}])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
        <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
