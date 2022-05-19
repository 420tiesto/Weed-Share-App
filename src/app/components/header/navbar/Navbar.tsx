import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import UserMenu from '../userMenu/UserMenu';
import Navlink from './Navlink';
import { CREATE_PROJECT, EXPLORE, LOGIN } from '../../../routes/Routes';
import { getUserAuthenticated, getUserHandle } from '../../../../modules/auth/state/auth.reducer';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../common-ui/atoms/Button';
import { PlusIcon } from '@heroicons/react/outline';

export type NavlinkType = {
    name: string;
    href: string;
};

const Navbar: React.FC = ({}) => {
    const navigate = useNavigate();

    //Redux State
    const userHandle = useSelector(getUserHandle);
    const authenticatedState = useSelector(getUserAuthenticated);

    const NAVBAR_LINKS: NavlinkType[] = [
        { name: 'Home', href: '/' },
        { name: 'Explore', href: EXPLORE },
        // { name: 'Upload Album', href: CREATE_PROJECT },
        // {name:'Communities',href:'/communities'},
        // {name:'More',href:'/more'},
    ];

    useEffect(() => {}, [authenticatedState]);


    const handleNavigate = () => {
        navigate(LOGIN);
    };
    return (
        <header className="bg-dark-gray px-4 fixed w-full shadow h-16 top-0 z-40 py-2">
            <nav className="flex items-center h-full justify-between">
                {/* Logo */}
                <img src="/prnts-logo.svg" alt="prnts" className="h-10" />
                {/* User Menu */}
                <div className="inline-flex pl-8 gap-2 flex-grow">
                    {NAVBAR_LINKS.map(({ name, href }: NavlinkType) => (
                        <Navlink href={href} name={name} key={name} />
                    ))}
                </div>
                {authenticatedState ? (
                    <div className="flex items-center gap-4">
                       <Link to={'upload-album'}>
                           <Button icon={<PlusIcon className='h-5 w-5' />} className='px-3 rounded-lg' >Create Project</Button>
                       </Link> 
                        <UserMenu />
                    </div>
                ) : (
                    <Button onClick={handleNavigate}>Login</Button>
                )}
            </nav>
        </header>
    );
};

export default Navbar;
