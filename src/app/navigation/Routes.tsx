import { Routes, Route } from 'react-router-dom';
import Login from '../modules/socialMedia/components/auth/components/login/Login';
import Home from '../modules/socialMedia/components/home/Home';
import SignUpFlow from '../modules/socialMedia/components/auth/components/signUpFlow/SignUpFlow';
import ProfilePage from '../modules/socialMedia/profile/components/ProfilePage';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUpFlow />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<ProfilePage/>}/>
        </Routes>
    );
};

export default AppRoutes;
