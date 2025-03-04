import { Link, NavLink } from "react-router-dom";
import {Container} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import {logout, selectIsAuthenticated, selectUserFullname, selectUserRole} from '../../state/authSlice.js';

const Navbar = () => {
    const dispatch = useDispatch();

    const auth = useSelector(selectIsAuthenticated);
    const username = useSelector(selectUserFullname);
    const role = useSelector(selectUserRole);

    return (
        <Container maxWidth={false} component='nav' className="bg-slate-800 w-auto p-0 h-11">
                <div className="w-full flex flex-row gap-5 bg-slate-800 justify-start text-1xl text-center">
                    <Link className="flex justify-start font-sans  hover:text-sky-500 text-white text-3xl" to="/">JH</Link>
                    {auth && <NavLink className="py-2 flex justify-start  hover:text-sky-500 font-sans text-white" to="/">Álláshírdetések</NavLink>}

                    {!auth && <NavLink className="py-2 flex justify-start hover:text-sky-500  font-sans text-white" to="/login">Bejelentkezés</NavLink>}
                    {!auth && <NavLink className="py-2 flex justify-start  hover:text-sky-500 font-sans text-white" to="/register">Regisztráció</NavLink>}
                    {auth && <NavLink className=" py-2 flex justify-start  hover:text-sky-500 font-sans text-white" to="/profile">Profilom</NavLink>}
                    {auth && (role === "company") && <NavLink className=" py-2 flex justify-start  hover:text-sky-500 font-sans text-white" to="/addjob">Álláshirdetés hozzáadása</NavLink>}
                    {auth && <NavLink onClick={() => {dispatch(logout());}} className="py-2 flex justify-start  hover:text-sky-500 font-sans text-white" to="/">Kijelentkezés</NavLink>}
                    {auth && <NavLink className="absolute right-4 py-2 flex justify-start  hover:text-sky-500 font-sans text-white" to="/profile">Üdv {username}</NavLink>}
                </div>
        </Container>
    );
}
 
export default Navbar;