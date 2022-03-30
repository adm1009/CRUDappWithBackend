import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import Axios from "axios";
function App() {
  const [moviename, setMoviename] = useState("");
  const [moviereview, setMoviereview] = useState("");
  const [movielist,setMovielist] =useState([]);
  const [newreview,setNewreview] =useState("");
  const submitHandler = () => {
    Axios.post("http://localhost:3001/api/insert", {
      moviename: moviename,
      moviereview: moviereview,
    });
      setMovielist([...movielist,{moviename:moviename,moviereview:moviereview}])
  };
  useEffect(()=>{
     Axios.get("http://localhost:3001/api/get").then((response)=>{
       setMovielist(response.data)
     })
  },[])
const deleteReview = (movie) =>{
  Axios.delete(`http://localhost:3001/api/delete/${movie}`)
}

const updateReview = (movie) =>{
  Axios.put("http://localhost:3001/api/update",{
    moviename: movie,
      moviereview: newreview,
  });
  setNewreview("");
}
  return (
    <div style={{ textAlign: "center" }}>
      <h1 style={{ textDecoration: "underline" }}>CRUD app</h1>
      <label>Movie Name:- </label>
      <input
        type="text"
        name="moviename"
        style={{ width: "300px", height: "30px" }}
        onChange={(e) => setMoviename(e.target.value)}
      />
      <br />
      <br />
      <label>Review:- </label>
      <input
        type="text"
        name="review"
        style={{ width: "280px", height: "100px" }}
        onChange={(e) => setMoviereview(e.target.value)}
      />
      <br />
      <br />
      <button onClick={submitHandler}>Submit</button>
      {movielist.map((val)=>{
        return<div className="card">
            <h1>{val.moviename}</h1>
            <p>{val.moviereview}</p>
            <button onClick={()=>{deleteReview(val.moviename)}}>Delete</button>
            <input type="text" style={{width:"120px"}} onChange={(e)=>setNewreview(e.target.value)}/>
            <button onClick={()=>{updateReview(val.moviename)}}>Update</button>
            </div>
      })}
      
    </div>
  );
}

export default App;
