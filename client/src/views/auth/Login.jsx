import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {useState} from "react";
import {useLoginMutation} from '../../state/api/authApiSlice.js';
import {login} from '../../state/authSlice.js';

const Login = () => {
    // TODO: css
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({email: '', password: ''});

    const [apiLogin, mutationDetails] = useLoginMutation();

    const handleClick = async () => {
        const get = await apiLogin({ strategy: 'local', email: formData.email, password: formData.password }).unwrap();

        //console.log("result")
        //console.log(result)

        dispatch(
            login({
                email: get.user.email,
                fullname: get.user.fullname,
                id: get.user.id,
                role: get.user.role,
                token: get.accessToken,
            })
        );

        return navigate('/');
    };

    const handleChange = event => {
        setFormData({...formData, [event.target.name]: event.target.value});
    };

    /*const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleClick();
        }
    };*/

    return ( 
        <>
            <div className='w-full h-1/5 p-5 shadow-md mb-20'>
            <span className='font-bold text-4xl '>Bejelentkezés</span>
            </div>
            <div
            className='flex justify-center'>
            <div className='flex flex-col gap-3'>
                <div className='flex flex-col'>
                    <span className='text-gray-700 font-bold text-xl  my-2'>E-mail</span>
                    <input className='bg-white rounded-md h-10 outline-2 outline outline-slate-200 text-xl px-1' name='email' onChange={handleChange} value={formData.email ?? ''} type="text" placeholder='E-mail'/>
                </div>

                <div className='flex flex-col'>
                <span className='text-gray-700 font-bold text-xl my-2'>Jelszó</span>
                    <input className='bg-white rounded-md h-10 outline-2 outline outline-slate-200 text-xl px-1' name='password' onChange={handleChange} value={formData.password ?? ''} type="password" placeholder='Jelszó'/>
                </div>

                <button className=' bg-violet-700 rounded-md h-10 outline-2 w-50 outline outline-black text-xl text-white my-7' onClick={handleClick}>Bejelentkezés</button>

                {mutationDetails.isError && <p className='flex justify-center text-red-600'>Sikertelen bejelentkezés.</p>}
            </div>
            </div>
        </>
    );
}
 
export default Login;