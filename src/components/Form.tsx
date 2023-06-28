import { useState } from 'react';
import axios from 'axios';

const Form = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [ image, setImage] = useState(''); 
    const [github, setGithub] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();
        const data = {title, description, image,github}
        console.log(data);
        await axios.post('/api/project', data);
    }

    return (
         <form onSubmit={handleSubmit} className='text-black'>
                <input type="text" placeholder='title here' onChange={(e) => setTitle(e.target.value)} required/>
                <input type="text" placeholder='description here' onChange={(e) => setDescription(e.target.value)} required/>
                <input type="text" placeholder='image url' onChange={(e) => setImage(e.target.value)} required/>
                <input type="text" placeholder='github ' onChange={(e)=>setGithub(e.target.value)}/>
                <button type="submit" className='text-white'>submit </button>
         </form>
    );
}

export default Form;