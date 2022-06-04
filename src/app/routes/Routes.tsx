import { Routes, Route, useNavigate } from 'react-router-dom';
import DesignSystem from '../components/common-ui/DesignSystem';
import Login from '../../modules/auth/components/login/Login';
import SignUp from '../../modules/auth/components/signUp/SignUp';
import ExplorePage from '../../modules/explore/components/ExplorePage';
import Home from '../../modules/home/Home';
import ProfilePage from '../../modules/profile/pages/ProfilePage';
import ProfileSettingsPage from '../../modules/profile/pages/ProfileSettingsPage';
import CreateProjectFlow from '../../modules/project/createProject/createProjectFlow';
import ProjectPage from '../../modules/project/projectPage/components/ProjectPage';
import { useAppDispatch } from '../../state/configure-store';
import { useEffect } from 'react';
import { getUserAuthenticated } from '../../modules/auth/state/auth.reducer';
import { useSelector } from 'react-redux';
import { LENS_TOKENS, PRNTS_PUBLIC_KEY } from '../../utils/local-storage/keys';
import { getStorageValue } from '../../utils/local-storage/local-storage';
import { setUserAuthenticated } from '../../modules/auth/state/auth.action';
import NewsFeed from '../../modules/news-feed/pages/NewsFeed';

export const HOME_PAGE = '/';
export const LOGIN = '/login';
export const SIGNUP = '/signup';
export const PROFILE = '/profile/:handle';
export const CREATE_PROJECT = '/upload-album';
export const PROFILE_SETTINGS = '/profile/settings';
export const PROJECT = '/project/:projectId';
export const EXPLORE = '/explore';
export const NEWSFEED = '/newsfeed';

interface Props {
    // authenticated: boolean;
}

const AppRoutes: React.FC<Props> = (props: Props) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const authenticated = useSelector(getUserAuthenticated);
    const auth = getStorageValue(LENS_TOKENS);
    const address = getStorageValue(PRNTS_PUBLIC_KEY);

    useEffect(() => {
        console.log('routes');
    }, []);

    return (
        <Routes>
            <Route path={SIGNUP} element={<SignUp />} />
            <Route path={LOGIN} element={<Login />} />
            <Route path={PROFILE} element={<ProfilePage />} />
            <Route path={PROFILE_SETTINGS} element={<ProfileSettingsPage />} />
            <Route path={CREATE_PROJECT} element={<CreateProjectFlow />} />
            <Route path={PROJECT} element={<ProjectPage />} />
            <Route path={EXPLORE} element={<ExplorePage />} />
            <Route path={HOME_PAGE} element={<Home />} />
            <Route path={NEWSFEED} element={<NewsFeed />} />
            {/* Dev Route for Design System reference */}
            <Route path="/design" element={<DesignSystem />} />
        </Routes>
    );
};

export default AppRoutes;
