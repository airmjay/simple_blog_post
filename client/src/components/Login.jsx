// import React from 'react';
import '../App.css';
import axios from 'axios';
import { useState,useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
function Login() {
    const authValue = useContext(AuthContext);
    const navigation = useNavigate();
    const [login, setLogin] = useState({
        username : "",
        password : "",
    })
    const onSubmit = () => 
            {
                const data = {username : login.username, password : login.password}
                axios.post('http://localhost:3001/user/login', data).then((response)=>
                    { 
                        if(response.data.error)
                            {
                                 console.log("error login");

                            }else
                            {
                                console.log(response.data)
                                localStorage.setItem("accessToken",response.data.token)
                                authValue.SetAuth(

                                    {  
                                        ...authValue.Auth,
                                        username: response.data.username,
                                        id: response.data.id,
                                        status: 1
                                    })
                                navigation('/')
                            }
                    })
            }
    
    return (
        <>
        <div className='Formik'> 
        <form>
            <h1>Login Page</h1>
            <label htmlFor="username"> Username</label>
            <input
            onChange={((e)=>
                {
                    setLogin((current) =>
                        (
                            {
                             ...current,
                             username : e.target.value
                            }
                        ))
                })}
            value={login.username}
            className='field'
            id="username"
            name="username"
            placeholder= "enter your username"
            />
            <label htmlFor="password"> Password</label>
            <input
            className='field'
            id="password"
            name="password"
            value={login.password}
            onChange={((e)=>
                {
                    setLogin((current) =>
                        (
                            {
                             ...current,
                             password : e.target.value
                            }
                        ))
                })}
            placeholder= "enter your password"
            type= "password"
            />
            
            <button onClick={onSubmit} className='form-submit' type='button'>Login</button>
                
        </form>
        </div>
        </>
    )
}

export default Login;