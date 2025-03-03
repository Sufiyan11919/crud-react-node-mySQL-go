//frontend/src/pages/Add.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Add = () => {
  const [book, setBook] = useState({
    title: "",
    description: "",
    price: null,
    cover: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setBook(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8800";
    try {
      await axios.post(`${API_BASE_URL}/books`, book);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  console.log(book);

  return (
    <div className='form'>
      <h1>Add New Book Testing</h1>
      <input type="text" placeholder="title" onChange={handleChange} name="title"/>
      <input type="text" placeholder="description" onChange={handleChange} name="description"/>
      <input type="number" placeholder="price" onChange={handleChange} name="price"/>
      <input type="text" placeholder="cover" onChange={handleChange} name="cover"/>
      <button onClick={handleClick} className='addButton'>Add</button>
    </div>
  );
};

export default Add;