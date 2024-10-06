import axios from 'axios';
import { useEffect, useState , useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Comment } from './comment';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
export function Post() {
    const {Auth} = useContext(AuthContext); 
    const [GetPost, SetPost] = useState({})
    const [Comments, setComment] = useState([{}]);
    const param = useParams();
    const navigation = useNavigate()
   
    useEffect(() => {
    axios.get(`http://localhost:3001/post/ById/${param.id}`).then((response) => {
            SetPost(response.data);
            // console.log(GetPost)
        }).catch((err)=>
            {
                console.log(err)
            })
    axios.get(`http://localhost:3001/comment/${param.id}`).then((response)=>
    {
         setComment(response.data);           
     })
    },[])
    const postDelete  = (id) =>
        {
            axios.delete(`http://localhost:3001/post/${id}`).then((response) => 
                {
                    alert(response.data)
                    navigation('/')
                })
        } 
        let edit = (content,oldContent) =>
            {
                const dataContent = prompt("Enter the new content",oldContent);
                if(content === "title")
                {
                    const data = {title: dataContent, id: param.id}
                    axios.post('http://localhost:3001/post/changeTitle', data,{headers: {accessToken: 
                        localStorage.getItem('accessToken')}}).then((response)=>
                        {
                            alert(response.data);
                            SetPost({...GetPost,title: dataContent})
                        })
                }else
                {   
                    const data = {PostBody: dataContent, id: param.id}
                    axios.post('http://localhost:3001/post/changeBody', data, {headers: {accessToken: 
                        localStorage.getItem('accessToken')}}).then((response)=>
                        {
                            alert(response.data);
                            SetPost({...GetPost,PostBody: dataContent})
                        })
                }
            
            }
    return (
        <>
        <div className='post-display'>
            
            <div className='leftSide'>
            <div  className='post-card-1'>
              <div className='card-title'>
              {Auth.username ===  GetPost.username && <button onClick={(()=>
              {
                postDelete(GetPost.id)
              })} 
              className='form-submit'>Delete Post</button>}
                <br/>{GetPost.title}
                {Auth.username === GetPost.username &&
                <button className='form-submit' style={{marginLeft: "10px"}} onClick={(()=>
                    {
                        edit("title",GetPost.title)
                    })}>Edit Post Title</button>}</div>
              <div className='card-body-1'>{GetPost.PostBody}   
             <div>
             {Auth.username === GetPost.username &&
             <button className='form-submit'
              onClick={(()=>
                { 
                
                    edit("body",GetPost.PostBody)
                })}> Edit post body </button> }
                </div> </div>
              <div className='card-name'>@{GetPost.username}</div>
              
            </div>
            </div>
            <div className='rightSide'>
            <Comment comment={Comments} set={setComment}/>
            </div>
        </div>
        </>
    );
}

