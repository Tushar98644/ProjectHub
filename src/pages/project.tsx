import { Navbar, Form } from '@/components'

const Add_Project = () => {
    return (
        <div className='flex flex-col'>
            <Navbar />
            <div className='py-60 sm:px-20 px-8'>
                <Form />
            </div>
        </div>
    );
}

export default Add_Project;