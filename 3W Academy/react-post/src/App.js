import './App.css';
import React, { useState } from "react";
import UserBar from "./components/userBar";
import PostList from "./components/postList";
import CreatePost from "./components/createPost";


const postsModel = [
  {
    title: "Title demo",
    content : "Content demo",
    writer: "Admin"
  }
];


function App() {
  const [newPosts, setNewPost] = useState(postsModel);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState();

  const handleLogIn = (e) => {
    e.preventDefault();
    if(e.target.username.value){
      setUserName(e.target.username.value);
      setIsLoggedIn(true);
    }else{
      alert("empty");
    }
  }

  const handleLogOut = (e) => {
    e.preventDefault();
    setIsLoggedIn(false);
  }

  const handlePostCreate = (e) => {
    e.preventDefault();
    if(e.target.title.value && e.target.content.value){
      setNewPost(
        [
          ...newPosts,
          {
            title: e.target.title.value,
            content: e.target.content.value,
            writer: userName,
          }
        ]
      );
      e.target.title.value = null;
      e.target.content.value = null;
    }else{
      alert("empty")
    }
  };

  return (
    <div>
      <UserBar isLogged={isLoggedIn} userName={userName} handleLogIn={handleLogIn} handleLogOut={handleLogOut}/>
      {isLoggedIn ? 
        <React.Fragment>
          <CreatePost userName={userName} handlePostCreate={handlePostCreate}/>
        </React.Fragment> : 
        ""
      }
      <PostList publications={newPosts}/>
    </div>
  );
}

export default App;
