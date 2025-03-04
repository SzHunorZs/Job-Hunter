/* eslint-disable react/prop-types */
import {
  selectIsAuthenticated,
  selectUserRole,
} from "../../state/authSlice.js";
import { useApplyMutation } from "../../state/api/jobsApiSlice.js";
import { useSelector } from "react-redux";
import { useState } from "react";

const Selectedjob = ({ job, setSelectedJob }) => {
  const auth = useSelector(selectIsAuthenticated);
  const role = useSelector(selectUserRole);
  const [apply, mutationDetails] = useApplyMutation();
  const [applySucces, setApplySucces] = useState(false);
  const applyData = { jobId: job.id };

  const handleClick = async () => {
    try {
      await apply(applyData).unwrap();
      setApplySucces(true);
    } catch (error) {
      console.error("Hiba a munkára jelentkezésnél:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col w-full justify-center">
        <div className="flex flex-row w-full h-1/5 shadow-md gap-3 justify-between">
        <div className="flex flex-row px-5 mt-3 gap-3">

          <span className="font-bold text-4xl">
            {job.company} Kft. 
          </span>
          {job.homeOffice == 0 && <span className="flex h-8 mt-1 rounded-md bg-emerald-300 text-emerald-700 p-1">Home office </span>}
        </div>
        <div className="flex flex-col px-5">
        <span className="font-semibold text-lg ">
            {job.salaryFrom}-{job.salaryTo} Ft 
          </span>
          {job.type === "full-time" && (
              <p className="h-10 text-slate-500  pl-3 gap-0 p-2">
                Teljes munkaidős
              </p>
            )}
            {job.type === "part-time" && (
              <p className="h-10   pl-3 gap-0 p-2">Részmunkaidős</p>
            )}
            {job.type === "internship" && (
              <p className="h-10   pl-3 gap-0 p-2">Gyakorlat</p>
            )}
        </div>
        </div>
        <div className="flex w-2/3 flex-col self-center shadow-xl m-5 p-10">
          <div>
            {!mutationDetails.isError && applySucces && (
              <p className="text-white rounded-md bg-green-600 mb-3 text-center">
                Sikeresen jelentkezett az állásra.
              </p>
            )}
          </div>
          <div className="flex w-full justify-between mb-3 ">
            <p className="font-bold ">Cég részletei</p>
            {auth && role === "jobseeker" && (
              <button
                className="bg-violet-700 hover:bg-violet-400 ease-linear transition-all duration-150 rounded-md h-8 outline-2 w-28 outline outline-black text-md text-white ml-3"
                onClick={handleClick}
              >
                Jelentkezés
              </button>
            )}
          </div>

          <div className="w-full h-auto grid grid-flow-row grid-cols-2 self-center">
            <p className=" h-10 text-gray-500 bg-slate-200 pl-3 gap-0 p-2">
              Név
            </p>
            <p className=" h-10   bg-slate-200 pl-3 gap-0 p-2">{job.company}</p>
            <p className="h-10  text-gray-500 pl-3 gap-0 p-2">Pozíció</p>
            <p className="h-10  pl-3 gap-0 p-2">{job.position}</p>
            <p className="h-10  text-gray-500 bg-slate-200 pl-3 gap-0 p-2">
              Leírás
            </p>
            <p className="h-10  bg-slate-200 pl-3 gap-0 p-2">
              {job.description}
            </p>
            <p className="h-10  text-gray-500 pl-3 gap-0 p-2">Fizetési sáv</p>
            <p className="h-10  pl-3 gap-0 p-2">
              {job.salaryFrom}-{job.salaryTo} Ft
            </p>
            <p className="h-10  text-gray-500 bg-slate-200 pl-3 gap-0 p-2">
              Foglalkozás típusa
            </p>
            {job.type === "full-time" && (
              <p className="h-10  bg-slate-200 pl-3 gap-0 p-2">
                Teljes munkaidős
              </p>
            )}
            {job.type === "part-time" && (
              <p className="h-10  bg-slate-200 pl-3 gap-0 p-2">Részmunkaidős</p>
            )}
            {job.type === "internship" && (
              <p className="h-10  bg-slate-200 pl-3 gap-0 p-2">Gyakorlat</p>
            )}
            <p className="h-10  text-gray-500 pl-3 gap-0 p-2">Település</p>
            <p className="h-10 pl-3 gap-0 p-2">{job.city}</p>
            <p className="h-10  text-gray-500 bg-slate-200 pl-3 gap-0 p-2">
              Home Office
            </p>
            {job.homeOffice == 1 ? (
              <p className="h-10  text-gray-500 bg-slate-200 pl-3 gap-0 p-2">
                Van
              </p>
            ) : (
              <p className="h-10  bg-slate-200 pl-3 gap-0 p-2">Nincs</p>
            )}
          </div>
          <div className="self-center mt-5">
            <button
              className="bg-slate-300 hover:bg-slate-600 hover:text-white ease-linear transition-all duration-150 rounded-md h-8 outline-2 w-28 outline outline-black text-md text-black ml-3"
              onClick={() => setSelectedJob(null)}
            >
              Vissza
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Selectedjob;
