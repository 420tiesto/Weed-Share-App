import { Console } from 'console';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../../../state/configure-store';
import { getUserProfile } from '../../auth/state/auth.reducer';

type Props = {};

const Home: React.FC<Props> = (props: Props) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const profileDetails = useSelector(getUserProfile);
    useEffect(() => {
        console.log(profileDetails, 'profileDetails');
    }, []);

    return <div>{profileDetails.handle}Home page</div>;
};

export default Home;
