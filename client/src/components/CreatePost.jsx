// import React from 'react';
import '../App.css';
import {Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import { useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
export function CreatePost() {
    const {Auth} = useContext(AuthContext);
    
    const navigation = useNavigate();
    const initialValues = 
    {
        title : '',
        PostBody : '',
  
    }
    const validationSchema = Yup.object().shape(
        {
            title : Yup.string().required(),
            PostBody : Yup.string().required(),
         
        })
    const onSubmit = (data) => 
            {
               const get = {PostBody: data.PostBody, title: data.title, username: Auth.username, UserId : Auth.id}
                axios.post('http://localhost:3001/post', get, {headers : 
                    {
                        accessToken : localStorage.getItem('accessToken')
                    }}).then((response)=>
                    {
                        console.log(response.data);
                        navigation('/')
                    })
            }
    
    return (
        <>
        <div className='Formik'>
            <Formik onSubmit={onSubmit} initialValues={initialValues} validationSchema={validationSchema}>
            <Form>
            <label htmlFor="title"> Title</label>
            <ErrorMessage name="title" component="span"/>
            <Field
            className='field'
            id="title"
            name="title"
            placeholder= "enter your title of your post"
            />
            <label htmlFor="PostBody"> Post Body</label>
            <ErrorMessage name="PostBody" component="span"/>
            <Field
            className='field'
            id="Postbody"
            name="PostBody"
            placeholder= "enter your title of your post"
            />
            <button className='form-submit' type='submit'>Submit Post</button>
            </Form>
            </Formik>
        </div>
        </>
    );
}
