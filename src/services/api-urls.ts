const authBaseURL = process.env.REACT_APP_API_BASE_URL;

const apiUrls = {
    auth: {
        signup: `/api/auth/signup`,
        login: `/api/auth/signin`,
        refreshToken: `/api/auth/refreshToken`,
    },
    user: {
        getUser: `/api/test/user`,
        getAllUsers: `/api/test/all`,
    },
};

export default apiUrls;