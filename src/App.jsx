
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './Layout/Layout'


import Googleform from './Pages/Googleform'
import { ToastContainer } from 'react-toastify'
import Faq from './Pages/Faq'
import ContactEnquiry from './Pages/ContactEnquiry'
import Login from './Auth/Login'
import Blog from './Pages/Blog'






function App() {
  const ThemeRoutes = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<Navigate to="/login" replace />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Layout />}>
          <Route path='/google-form' element={<Googleform />} />
          <Route path='/faq' element={<Faq/>}/>
          <Route path='/contact-enquiry' element={<ContactEnquiry/>}/>
          <Route path='/blog' element={<Blog/>}/>



        </Route>


      </>
    )
  )

  return (
    <>
       <ToastContainer position="top-right" autoClose={2000} />
      <RouterProvider router={ThemeRoutes} />
    </>
  )
}

export default App
