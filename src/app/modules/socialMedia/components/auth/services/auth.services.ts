import { authAPI } from '../../../../../services/api';
import apiUrls from '../../../../../services/api-urls';

const signUp = async ({
    email,
    username,
    password,
    isArtist = false,
}: {
    email: string;
    username: string;
    password: string;
    isArtist: boolean;
}) => {
    if (!email || !username || !password) {
        return;
    }
    try {
        const data = {
            email,
            username,
            password,
            isArtist,
            profileConnected: false,
        };
        console.log(data);
        const response = await authAPI.post(apiUrls.auth.signup, data);
        console.log(response);
    } catch (err) {
        console.log(err, '******* check error here');
    }
};

export { signUp };
