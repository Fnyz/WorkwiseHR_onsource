import React, { useEffect } from 'react'
import { Outlet, Navigate, useParams } from 'react-router-dom'
import { useAuth } from '../context';
import { links } from '../links';
import { useLocation } from 'react-router-dom'
import axiosClient from '../axiosClient';
import "./../App.css"
import { googleLogout } from '@react-oauth/google';
import { Link } from 'react-router-dom';


function DefaultLayout() {

  
  const location = useLocation();
  const {id} = useParams();
  const { pathname } = location;
  const {setToken, setUser, user} = useAuth();

  const logOut = () => {

    axiosClient.post("/logout")
    .then(()=>{
        googleLogout();
        setUser({});
        setToken(null);
    })
  }


  useEffect(()=>{
    axiosClient.get("/user")
    .then(({data}) => {
        setUser(data);
      
    })

  },[])

  const {token} = useAuth();
  if(!token) {
    return <Navigate to='/login' />
  }

  return (
    <div className="App ">
       <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
          <div>
              <div className="-mx-6 px-6 py-4 text-center">
                  <a href="#" title="home">
                  <h4 className="block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                  Workwise<span className=' text-[#00b894] font-bold'>HR.</span>
                  </h4>
                  </a>
              </div>

              <div className="mt-2 text-center flex justify-center items-center flex-col">
                 {user.image ? (
                    <div className="avatar">
                    <div className="w-24 rounded-full">
                      <img src={user &&user.image} />
                    </div>
                  </div>
                 ): (

                  <div className="avatar placeholder">
                    <div className=" bg-[#00b894] rounded-full w-24 from-[#00b894] to-[#00b894] text-white shadow-[#00b894]/20 shadow-lg">
                        <span className="text-3xl">{user.name && user.name.split("")[0]}</span>
                    </div>
                    </div> 
                 )}
                  <div className=' max-md:hidden flex mt-4 justify-center items-center gap-2'>
              
                    <h5 className="hidden  text-xl font-semibold text-gray-600 lg:block">{user.name}</h5>
                    /
                    <span className="hidden text-gray-400 lg:block">Admin</span>
                  </div>
              </div>

              <ul className="space-y-2 tracking-wide mt-8">
                {links.map((link, i) =>{
                  return (
                    <li key={i}>
                    <Link to={`${link.path}`} aria-label="dashboard" className={`relative px-4 py-3 flex items-center space-x-4 rounded-xl ${link.name.toLowerCase()=== pathname.split('/')[1] ? "rounded-xl text-white bg-gradient-to-r from-[#00b894] to-[#00b894]" : "text-gray-600 group"} `}>
                        {link.icons}
                        <span className="-mr-1 font-medium">{link.name}</span>
                    </Link>
                </li>
                  )
                })}
                
              </ul>
          </div>

          <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
              <button onClick={logOut} className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span className="group-hover:text-gray-700">Logout</span>
              </button>
          </div>
      </aside>

      <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%] bg-white">
          <div className="sticky z-10 top-0 h-16 border-b bg-white lg:py-2.5">
              <div className="px-6 flex items-center justify-between space-x-4 2xl:container">
                <div className='flex  justify-center items-center gap-1'>
                <svg className="-ml-1 h-5 w-5" viewBox="0 0 24 24" fill="none">
              <path d="M6 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8ZM6 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-1Z" className="fill-current text-cyan-400 dark:fill-slate-600"></path>
              <path d="M13 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2V8Z" className="fill-current text-cyan-200 group-hover:text-cyan-300"></path>
              <path d="M13 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-1Z" className="fill-current group-hover:text-sky-300"></path>
      </svg>

                  <div className="text-sm breadcrumbs ">
                        <ul>
                           {pathname.split("/").slice(1, pathname.split("/").length).map((pt, i)=>{
                              return (
                                <li   key={i}>
                                  <Link  to={pathname.split("/").slice(1, pathname.split("/").length)[0] === pt ? `/${pt}`: `${pathname.split("/").slice(1, pathname.split("/").length)[0]}/${pt}` }>
                                       <h5  hidden className={`text-sm text-gray-600 font-medium lg:block capitalize ${pt === id ? "cursor-not-allowed" : "cursor-pointer"}`} >{pt}</h5>
                                  </Link>
                                </li> 
                              )
                           })}
                        </ul>
                  </div>
              
                </div>
                  <button className="w-12 h-16 -mr-2 border-r lg:hidden">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 my-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                  </button>
                  <div className="flex space-x-4">
                     
                      <div hidden className="md:block">
                          <div className="relative flex items-center text-gray-400 focus-within:text-[#00b894]">
                              <span className="absolute left-4 h-6 flex items-center pr-3 border-r border-gray-300">
                              <svg xmlns="http://ww50w3.org/2000/svg" className="w-4 fill-current" viewBox="0 0 35.997 36.004">
                                  <path id="Icon_awesome-search" data-name="search" d="M35.508,31.127l-7.01-7.01a1.686,1.686,0,0,0-1.2-.492H26.156a14.618,14.618,0,1,0-2.531,2.531V27.3a1.686,1.686,0,0,0,.492,1.2l7.01,7.01a1.681,1.681,0,0,0,2.384,0l1.99-1.99a1.7,1.7,0,0,0,.007-2.391Zm-20.883-7.5a9,9,0,1,1,9-9A8.995,8.995,0,0,1,14.625,23.625Z"></path>
                              </svg>
                              </span>
                              <input type="search" name="leadingIcon" id="leadingIcon" placeholder="Search here" className="w-full pl-14 pr-4 py-2.5 rounded-xl text-sm text-gray-600 outline-none border border-gray-300 focus:border-cyan-300 transition"/>
                          </div>
                      </div>
                
                      <button aria-label="search" className="w-10 h-10 rounded-xl border bg-gray-100 focus:bg-gray-100 active:bg-gray-200 md:hidden">
                          <svg xmlns="http://ww50w3.org/2000/svg" className="w-4 mx-auto fill-current text-gray-600" viewBox="0 0 35.997 36.004">
                              <path id="Icon_awesome-search" data-name="search" d="M35.508,31.127l-7.01-7.01a1.686,1.686,0,0,0-1.2-.492H26.156a14.618,14.618,0,1,0-2.531,2.531V27.3a1.686,1.686,0,0,0,.492,1.2l7.01,7.01a1.681,1.681,0,0,0,2.384,0l1.99-1.99a1.7,1.7,0,0,0,.007-2.391Zm-20.883-7.5a9,9,0,1,1,9-9A8.995,8.995,0,0,1,14.625,23.625Z"></path>
                          </svg>
                      </button>
                      <button aria-label="chat" className="w-10 h-10 rounded-xl border bg-gray-100 focus:bg-gray-100 active:bg-gray-200">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 m-auto text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                          </svg>
                      </button>
                      <button aria-label="notification" className="w-10 h-10 rounded-xl border bg-gray-100 focus:bg-gray-100 active:bg-gray-200">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 m-auto text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                          </svg>
                      </button>
                  </div>
              </div>
          </div>
      </div> 
      <Outlet/>
    </div>
  )
}

export default DefaultLayout