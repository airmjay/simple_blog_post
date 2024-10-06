import {Nav} from './components/Nav';
import {CreatePost}  from  './components/CreatePost';
import {Post} from './components/Post';
import Register from './components/Register';
import Login from './components/Login';
import { AuthContext } from './context/AuthContext.jsx';
import {Home} from './components/Home';
import NotFound from './components/NotFound'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
export default function App()
{
  const [Auth, SetAuth] = useState(
    {
      status: false,
      id: 0,
      username : "",
    })
    useEffect(()=>
      {
        axios.get('http://localhost:3001/user',{
          headers:
          {
            accessToken  : localStorage.getItem('accessToken')
          } }).then((response)=>
            {
              if(response.data.error)
                {
                  SetAuth({
                      ...Auth,
                      status: false,
                      username: "",
                      id : 0
                    })
                }else
                {
                  SetAuth({
                      ...Auth,
                      status:true,
                      username: response.data.username,
                      id : response.data.id
                    })
                    
                }
            })
      }, [])
      console.log(Auth);
  return(
    <AuthContext.Provider value={{SetAuth,Auth}}>
     <Router>
      <Nav auth={{Auth,SetAuth}}/>
      <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/post/:id" element={<Post />} />
      <Route path="/create" element={<CreatePost />} />
      <Route path="*" element={<NotFound />} />
      </Routes>
     </Router>
     </AuthContext.Provider>
  )
}