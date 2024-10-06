// import React from 'react';
import '../App.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
function Register() {
    const navigation = useNavigate();
    const [login, setLogin] = useState({
        username : "",
        password : "",
    })
    const onSubmit = () => 
            {
                const data = {username : login.username, password : login.password}
                if(login.password != '' || login.username != ''){
                    axios.post('http://localhost:3001/user/', data).then((response)=>
                        {
                            if(response.data.error)
                                {
                                     console.log("error Register");
    
                                }else
                                {
                                    console.log(response.data)
                                    navigation('/')
                                }
                        })
                }else
                {
                    console.log("All field are required");
                }
            }
    return (
        <>
        <div className='Formik'> 
        <form>
            <h1>Register Page</h1>
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
    );
}

export default Register;