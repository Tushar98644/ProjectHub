import { Form } from '@/components'
import { useSession } from 'next-auth/react';

const Add_Project = () => {
    const { data: session } = useSession();
    return (
        <div className='flex flex-col'>
            <div className='py-40 sm:px-24 px-8 flex flex-col gap-20'>
                <div className='sm:text-3xl text-2xl font-bold text-start text-gray-500'>We are happy to see you here {session?.user?.name}, add a project and contribute  <br /> to the community</div>
                <Form />
            </div>
        </div>
    );
}

export default Add_Project;