import { useState, useEffect } from 'react';
import axios from 'axios';

const Form = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [ image, setImage] = useState(''); 

    const handleSubmit = async(e) => {
        e.preventDefault();
        const data = {title, description, image}
        console.log(data);
        await axios.post('/api/project', data);
    }

    return (
         <form onSubmit={handleSubmit} className='text-black'>
                <input type="text" placeholder='title here' onChange={(e) => setTitle(e.target.value)} required/>
                <input type="text" placeholder='description here' onChange={(e) => setDescription(e.target.value)} required/>
                <input type="text" placeholder='url here' onChange={(e) => setImage(e.target.value)} required/>
                <button type="submit" className='text-white'>submit </button>
         </form>
    );
}

export default Form;