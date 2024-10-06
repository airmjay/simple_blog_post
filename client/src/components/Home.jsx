import '../App.css'
import {useEffect, useState} from 'react'
import axios from 'axios';
import {useNavigate} from "react-router-dom";
export function Home() {
  const navigation = useNavigate();
  const [getPost, setPost] = useState([])
  const [likedPost, setLikedPost] = useState([]);
  useEffect(  ()=>
    {
      axios.get('http://localhost:3001/post',{headers: { accessToken: localStorage.getItem('accessToken')}
      }).then((response)=>
        {
          setPost(response.data.data)
          setLikedPost(response.data.listOfLike.map((like)=>
            {
              return like.postId; 
            }))
        })
    }, [])
    const likeComment = (postId) =>
      {
          axios.post('http://localhost:3001/like',{postId: postId},{ headers: 
            {
              accessToken : localStorage.getItem('accessToken')
            }}).then((response)=>
              {
                  // alert(response.data);
                  setPost(getPost.map((post)=>
                    {
                      if(post.id === postId)
                        {
                          
                          if(!response.data.like === true)
                            {
                                const likeList = post.Likes;
                                likeList.pop();
                                return {...post, Likes : likeList}
                                
                            }else
                            {
                              return {...post, Likes : [...post.Likes, 1]}
                            }
                        }else
                        {
                            return post;
                        }
                    }))
                    
              })
              if(likedPost.includes(postId)){
              setLikedPost(likedPost.filter((post)=>
                {
                      return post != postId;
                }))
              }else
                    {
                      setLikedPost([...likedPost, postId]);
                      
                      
                    }
                
       }
       
    return  (
      <div className="container">
        {getPost.map((user,key)=>
          {
          return (
            <div key={key} className='post-card' >
              <div className='card-title'>{user.title}</div>
              <div className='card-body'
              onClick={
                (()=>
                  {
                    navigation(`/post/${user.id}`)
                  })
              } 
              >{user.PostBody}</div>
              <div className='card-name'>@{user.username} <button
                className={likedPost.includes(user.id) ? "form-submit" : 
                  ""
                }
                onClick={(()=>
                {
                  likeComment(user.id)
                })}
              >Like</button> {user.Likes.length}</div>
            </div>
         
          )
          })}
      </div>
    )
}


