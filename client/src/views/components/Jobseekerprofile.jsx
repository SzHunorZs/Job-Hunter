/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { useGetExperiencesQuery } from "../../state/api/jobsApiSlice.js";
import {
  selectUserId,
  selectUserFullname,
  selectUserRole,
  selectUserEmail,
} from "../../state/authSlice.js";

const Jobseekerprofile = () => {
  const { data, error, isLoading } = useGetExperiencesQuery();
  const id = useSelector(selectUserId);
  const username = useSelector(selectUserFullname);
  const useremail = useSelector(selectUserEmail);
  const userrole = useSelector(selectUserRole);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <div className="flex flex-col w-full justify-center ">
        <div className="flex w-2/3 flex-col self-center shadow-xl m-5 p-10">

        <div className="flex w-full justify-between mb-3 ">
          <p className="font-bold ">Személyes adatok</p>
          <button className="shadow-md outline-1 outline outline-gray-400 rounded-sm p-0.5 text-sm ">Tapasztalatok szerkesztése</button>
        </div>

        <div className="w-full h-auto grid grid-flow-row grid-cols-2 self-center">
          <p className=" h-10 text-gray-500 bg-slate-200 pl-3 gap-0 p-2">
            Név
          </p>
          <p className=" h-10   bg-slate-200 pl-3 gap-0 p-2">
            {username}
          </p>
          <p className="h-10  text-gray-500 pl-3 gap-0 p-2">
            E-mail
          </p>
          <p className="h-10  pl-3 gap-0 p-2">
            {useremail}
          </p>
          <p className="h-10  text-gray-500 bg-slate-200 pl-3 gap-0 p-2">
            Státusz
          </p>
          <p className="h-10  bg-slate-200 pl-3 gap-0 p-2">
            {userrole=="jobseeker"? "Munkakereső": "Munkáltató"}
          </p>
        </div>
        <div className="flex flex-col w-full self-center mt-3">
        <p className="mb-5">Előző tapasztalatok</p>
        <ul>
            {data.map((exp) => ( exp.userId == id &&
              <li className="h-10 mb-3" key={exp.id} >
                <div className=" h-10 flex flex-row justify-between shadow-md">
                <div className="flex flex-col w-1/2 justify-start">
                  <p className="p-2  text-gray-500">
                    {exp.company}
                  </p>
                </div>
                <div className="flex flex-col w-1/2">
                    <span className="p-2">
                      {exp.interval} {exp.title}
                    </span>
                </div>
                </div>
              </li>
            ))}
          </ul>
          </div>
          </div>
      </div>
    </>
  );
};

export default Jobseekerprofile;
