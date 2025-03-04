import { useState} from "react";
import { useGetJobsQuery } from '../../state/api/jobsApiSlice.js';
import {selectUserId} from '../../state/authSlice.js';
import {useSelector} from 'react-redux';
import ApplicantsListModal from "./ApplicantsListModal.jsx";

const CompanyProfile = () => {
    const {data, error ,isLoading} = useGetJobsQuery();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedJobId, setSelectedJobId] = useState(-1);
    const userId = useSelector(selectUserId);
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const handleClick=(jobId)=>{
        setSelectedJobId(jobId);
        setModalIsOpen(true);

    }

    return (
        <>
        <div className="flex flex-col w-full justify-center">
        {modalIsOpen && selectedJobId!=-1 && <ApplicantsListModal jobId={selectedJobId} modalIsOpen = {modalIsOpen} setModalIsOpen={setModalIsOpen}></ApplicantsListModal>}
            <div className="w-3/4 self-center">
            <ul>
          {data.map((job) => ( job.userId == userId &&
            <li key={job.id} >
              <div className="flex flex-row h-32 w-full hover:bg-slate-200  ease-linear transition-all duration-150 justify-between shadow-md py-8">
                <div className="flex flex-col w-full justify-start px-5">
                  <span className="font-bold text-3xl mb-2">
                    {job.position}
                  </span>
                  <div className="flex flex-row gap-3 text-slate-600">  
                  {job.type === "full-time" && <span>Teljes munkaidős</span>}
                  {job.type === "part-time" && <span>Részmunkaidős</span>}
                  {job.type === "internship" && <span>Gyakorlat</span>}
                  {job.homeOffice == 0? <span>Helyi</span>:<span>Távoli</span>}
                  <span>
                    {job.salaryFrom}-{job.salaryTo} Ft
                  </span>
                  </div>
                </div>
                <div className="flex flex-row justify-end mt-3 px-5 font-semibold">
                <button
              className="bg-slate-300 hover:bg-slate-600 hover:text-white ease-linear transition-all duration-150 rounded-md h-8 outline-2 w-28 outline outline-black text-md text-black ml-3"
              >
              Szerkesztés
            </button>
            <button
              className="bg-slate-300 hover:bg-slate-600 hover:text-white ease-linear transition-all duration-150 rounded-md h-8 outline-2 w-28 outline outline-black text-md text-black ml-3"
              onClick={() =>handleClick(job.id)}>
              Megtekintés
            </button>
            <button
              className=" bg-red-600 hover:bg-red-800 hover:text-white ease-linear transition-all duration-150 rounded-md h-8 outline-2 w-28 outline outline-black text-md text-black ml-3"
              >
              Törlés
            </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
        </div>
        <button className='self-center bg-violet-700 hover:bg-violet-500  ease-linear transition-all duration-150 rounded-md h-10 outline-2 w-50 outline outline-black text-xl text-white my-7 p-1' >Hírdetés hozzáadása</button>
        </div>
        
        </>
    );
}
 
export default CompanyProfile;