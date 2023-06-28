import { useState, useEffect } from 'react';
import axios from 'axios';

const Form = () => {
    const [title, setTitle] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();
        const data = {title}
        console.log(data);
        await axios.post('/api/project', data);
    }

    return (
         <form onSubmit={handleSubmit} className='text-black'>
                <input type="text" placeholder='title here' onChange={(e) => setTitle(e.target.value)} />
                <button type="submit" className='text-white'>submit </button>
         </form>
    );
}

export default Form;