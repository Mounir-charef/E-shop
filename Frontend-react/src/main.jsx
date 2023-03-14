import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider, Outlet,
} from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Hero from "./routes/Hero.jsx";


// const routes = [
//         { path: '/', element: <Home />},
//         { path: 'services', element: <Services /> },
//         { path: 'sign-up', element: <SignUp /> },
//         {
//             path: 'contact', element: (
//                 <Suspense fallback={<p style={{textAlign: "center"}}> Loading ... </p>}>
//                     <Contact />
//                 </Suspense>
//             ),
//         },
// ]
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
        { path: '/', element: <Hero />},
    ]

const router = createBrowserRouter([{element: <App />, children: routes}])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
        <RouterProvider router={router} />
  </React.StrictMode>,
)
