import { Routes, Route } from 'react-router-dom';
import Login from '../modules/socialMedia/components/auth/components/login/Login';
import Home from '../modules/socialMedia/components/home/Home';
import SignUpFlow from '../modules/socialMedia/components/auth/components/signUpFlow/SignUpFlow';
import Container from '../components/common-ui/container/Container';
import ProfilePage from '../modules/socialMedia/components/profile/pages/ProfilePage';
import ProfileSettingsPage from '../modules/socialMedia/components/profile/pages/ProfileSettingsPage';
import CreateProjectFlow from '../modules/socialMedia/components/project/createProject/createProjectFlow';
import ProjectPage from '../modules/socialMedia/components/project/projectPage/components/ProjectPage';
import DesignSystem from '../components/common-ui/DesignSystem';

const AppRoutes = () => {
    return (
        <Container>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<SignUpFlow />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/profile-settings" element={<ProfileSettingsPage />} />
                <Route path="/upload-music" element={<CreateProjectFlow />} />
                <Route path="/project" element={<ProjectPage />} />
                {/* Dev Route for Design System reference */}
                <Route path="/design" element={<DesignSystem />} />
            </Routes>
        </Container>
    );
};

export default AppRoutes;
