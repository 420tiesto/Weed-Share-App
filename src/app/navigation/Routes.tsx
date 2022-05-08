import { Routes, Route } from 'react-router-dom';
import Login from '../modules/socialMedia/components/auth/components/login/Login';
import Home from '../modules/socialMedia/components/home/Home';
import SignUpFlow from '../modules/socialMedia/components/auth/components/signUpFlow/SignUpFlow';
import ProfilePage from '../modules/socialMedia/profile/pages/ProfilePage';
import CreateProjectFlow from '../modules/project/createProject/createProjectFlow';
import ProfileSettings from '../modules/socialMedia/profile/pages/ProfileSettings';
import ProjectPage from '../modules/project/projectPage/components/ProjectPage';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUpFlow />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<ProfilePage/>}/>
            <Route path="/profile-settings" element={<ProfileSettings/>} />
            <Route path="/upload-music" element={<CreateProjectFlow />} />
            <Route path="/project" element={<ProjectPage />} />
        </Routes>
    );
};

export default AppRoutes;
