import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Layout from './layout/Layout.jsx'
import Home from './Home.jsx';
import Login from './auth/Login.jsx';
import Register from './auth/Register.jsx';
import Profile from './Profile.jsx';
import Addjob from './Addjob.jsx';
import {ProtectedRoute} from './routing/ProtectedRoute';

import './App.css'

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout/>}>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/register' element={<Register/>}/>
                    <Route path='/profile' element={<ProtectedRoute redirectTo='/login'><Profile/></ProtectedRoute>}/>
                    <Route path='/addjob' element={<ProtectedRoute redirectTo='/login'><Addjob/></ProtectedRoute>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
