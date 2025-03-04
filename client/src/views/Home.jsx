import { useGetJobsQuery } from '../state/api/jobsApiSlice.js';
import { useState } from 'react';
import Selectedjob from "./components/Selectedjob";
import Joblist from "./components/Joblist";


const Home = () => {
    const { data, error, isLoading } = useGetJobsQuery();
    const [selectedJob, setSelectedJob] = useState(null);
   


    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <>
            <div className='flex w-full justify-center'>
            {selectedJob && <Selectedjob job={selectedJob} setSelectedJob={setSelectedJob}/>}
            {!selectedJob && <Joblist data={data} setSelectedJob={setSelectedJob}/>}          
            </div>
        </>
    );
}

export default Home;