import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const Form = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [ image, setImage] = useState(''); 
    const [github, setGithub] = useState('');
    const router = useRouter();

    const handleSubmit = async(e:any) => {
        e.preventDefault();
        const data = {title, description, image,github}
        await axios.post('/api/project', data);
        console.log(data);
        router.push('/');
    }

    return (
         <form onSubmit={handleSubmit} className='text-black'>
                <input type="text" placeholder='title here' onChange={(e) => setTitle(e.target.value)} required/>
                <input type="text" placeholder='description here' onChange={(e) => setDescription(e.target.value)} required/>
                <input type="url" placeholder='image url' onChange={(e) => setImage(e.target.value)} required/>
                <input type="url" placeholder='github ' onChange={(e)=>setGithub(e.target.value)} required/>
                <button type="submit" className='text-white'>submit </button>
         </form>
    );
}

export default Form;