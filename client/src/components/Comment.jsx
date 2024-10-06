import axios from 'axios'
import '../App.css'
import { useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import {AuthContext} from "../context/AuthContext"
export function Comment(param)
{ 
  const {Auth} = useContext(AuthContext);
  const navigation = useNavigate()
  const use = useParams();  
  const [Getcomment, setComment] = useState("")
  const addComment = () =>
  {
    axios.post('http://localhost:3001/comment/',{comments: Getcomment, username: "airmjay" , postId : use.id},
      {
        headers: { accessToken: localStorage.getItem('accessToken')}
    }
    ).then(
      (response) =>{
        if(response.data.error)
          {
            console.log(response.data.error) 
            localStorage.removeItem('accessToken')
            navigation('/login')
          }else
          {
            param.set([...param.comment,
              {
                comments: response.data.comments,
                username : response.data.username,
                id: response.data.id
              }])
              setComment("")
          }
    
    })
  }
  const deletePost = (id) =>
    {
      axios.delete(`http://localhost:3001/comment/${id}`,{headers:
        {
          accessToken : localStorage.getItem("accessToken")
        }}).then(()=> 
          {
              param.set(param.comment.filter((val)=>
                {
                  return val.id != id;
                }))
          })
    }
  return (
    <>
    <div>Comment </div>
    <input value={Getcomment}  onChange={
      ((e)=> {
        (setComment(e.target.value))
      })
    }type="text" className='field' placeholder='Enter your comment'/>
    <button onClick={addComment}  className='form-submit'>Send Message </button>
    <div className='comment'>
     {param.comment.map((comment,key)=>
      {
        return (
          <div key={key} className="comment-div">
          <div className="comment-comment"> {comment.comments} </div>
          <div className="comment-username">@{comment.username} </div>
          {Auth.username === comment.username &&
           <button onClick={()=>
            {
              deletePost(comment.id)
            }}>Delete Post</button>
          }
          </div>
        )
      })}
    </div>
    </>
    )
}
