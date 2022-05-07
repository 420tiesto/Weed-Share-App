import { Routes, Route } from 'react-router-dom';
import Login from '../modules/socialMedia/components/auth/components/login/Login';
import Home from '../modules/socialMedia/components/home/Home';
import SignUpFlow from '../modules/socialMedia/components/auth/components/signUpFlow/SignUpFlow';
import ProfilePage from '../modules/socialMedia/profile/components/ProfilePage';
import UploadMusic from '../modules/project/createProject/uploadMusic/UploadMusic';
import AddTrack from '../modules/project/createProject/addTrack/AddTrack';
import ProfileSettings from '../modules/socialMedia/profile/components/ProfileSettings';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUpFlow />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<ProfilePage/>}/>
            <Route path="/profile-settings" element={<ProfileSettings/>} />
            <Route path="/upload-music" element={<UploadMusic />} />
            <Route path="/add-track" element={<AddTrack />} />
        </Routes>
    );
};

export default AppRoutes;
