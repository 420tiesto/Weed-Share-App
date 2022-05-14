import { Routes, Route } from 'react-router-dom';
import Login from '../modules/socialMedia/components/auth/components/login/Login';
// import Home from '../modules/socialMedia/components/home/Home';
import SignUpFlow from '../modules/socialMedia/components/auth/components/signUpFlow/SignUpFlow';
import Container from '../components/common-ui/container/Container';
import ProfilePage from '../modules/socialMedia/components/profile/pages/ProfilePage';
import ProfileSettingsPage from '../modules/socialMedia/components/profile/pages/ProfileSettingsPage';
import CreateProjectFlow from '../modules/socialMedia/components/project/createProject/createProjectFlow';
import ProjectPage from '../modules/socialMedia/components/project/projectPage/components/ProjectPage';
import SignUp from '../modules/socialMedia/components/auth/components/signUp/SignUp';
import Home from '../modules/socialMedia/components/home/pages/Home';
import DesignSystem from '../components/common-ui/DesignSystem';

export const HOME_PAGE = '/';
export const LOGIN = '/login';
export const SIGNUP = '/signup';
export const PROFILE = '/profile/:handle';
export const CREATE_PROJECT = '/upload-music';
export const PROFILE_SETTINGS = '/profile/settings';
export const PROJECT = '/project';

interface Props {
    authenthicated: boolean;
}

const AppRoutes: React.FC<Props> = (props: Props) => {
    const { authenthicated } = props;
    return (
        <Container>
            <Routes>
                {/* <Route path="/" element={<Home />} /> */}
                <Route path={SIGNUP} element={<SignUp />} />
                <Route path={LOGIN} element={<Login />} />
                <Route path={PROFILE} element={<ProfilePage authenthicated={authenthicated} />} />
                <Route
                    path={PROFILE_SETTINGS}
                    element={<ProfileSettingsPage authenticated={authenthicated} />}
                />
                <Route path="/upload-music" element={<CreateProjectFlow />} />
                <Route path="/project" element={<ProjectPage />} />
                <Route path={HOME_PAGE} element={<Home />} />
                {/* Dev Route for Design System reference */}
                <Route path="/design" element={<DesignSystem />} />
            </Routes>
        </Container>
    );
};

export default AppRoutes;
