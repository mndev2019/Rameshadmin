//import React from 'react'

import { Outlet, useNavigate } from "react-router-dom"

import Footer from "./Footer"
import Sidebar from "./Sidebar"
import { useEffect } from "react";


const Layout = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token") ?? null;
    useEffect(() => {
        if (token) {
            navigate('/google-form')
        } else {
            navigate('/login');
        }
    }, [token, navigate]);
    return (
        <>
            {/* <Header/>  */}
            {/* <div className="flex">
                <div className={` overflow-x-hidden bg-transparent transition-all duration-300 w-[15%] min-h-screen sticky`}>
                    <Sidebar />
                </div>
                <div className="w-[85%]">
                    <main className=''>
                        {<Outlet />}
                    </main>
                </div>
            </div> */}
            <div className="flex">
                {/* Sidebar */}
                <div className="w-[15%] fixed top-0 left-0 h-screen bg-transparent">
                    <Sidebar />
                </div>

                {/* Main Content */}
                <div className="w-[85%] ml-[15%]">
                    <main>
                        <Outlet />
                    </main>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Layout