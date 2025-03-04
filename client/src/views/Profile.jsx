/* eslint-disable react/prop-types */

import {useSelector} from 'react-redux';
import {selectIsAuthenticated, selectUserRole} from '../state/authSlice.js';
import Jobseekerprofile from "./components/Jobseekerprofile";
import CompanyProfile from "./components/CompanyProfile.jsx";

const Profile = () => {
    const auth = useSelector(selectIsAuthenticated);
    const userrole = useSelector(selectUserRole);

    return (
        <>
            <div className='w-full h-1/5 p-5 shadow-md mb-5'>
            <span className='font-bold text-4xl '>Profilom</span>
            </div>

            {auth && (userrole === "jobseeker") && <Jobseekerprofile />}
            {auth && (userrole === "company") && <CompanyProfile />}
        </>
    );
}
 
export default Profile;