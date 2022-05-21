import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import UserMenu from '../userMenu/UserMenu';
import Navlink, { AuthenticatedNavlink } from './Navlink';
import { CREATE_PROJECT, EXPLORE, LOGIN } from '../../../routes/Routes';
import { getUserAuthenticated, getUserHandle } from '../../../../modules/auth/state/auth.reducer';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../common-ui/atoms/Button';
import { PlusIcon, SearchIcon } from '@heroicons/react/outline';
import { Input } from '../../common-ui/atoms/Input';

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
        { name: 'Explore', href: EXPLORE },
        { name: 'Bounty', href: '/bounty' },
        // { name: 'Upload Album', href: CREATE_PROJECT },
        // {name:'Communities',href:'/communities'},
        // {name:'More',href:'/more'},
    ];
    
    const AUTHENTICATED_NAV_LINKS: NavlinkType[] = [
        { name: 'Wallet', href: '/wallet' },
        { name: 'Create', href: CREATE_PROJECT },
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
                <div className="flex gap-8 items-center flex-1 justify-end ">
                    <div className="flex-grow max-w-md ">
                        <Input leftIcon={<SearchIcon className="h-5 w-5" />} placeholder="Search" />
                    </div>
                    <div className="inline-flex pl-8 gap-2">
                        {NAVBAR_LINKS.map(({ name, href }: NavlinkType) => (
                            <Navlink href={href} name={name} key={name} />
                        ))}
                         {AUTHENTICATED_NAV_LINKS.map(({ name, href }: NavlinkType) => (
                            <AuthenticatedNavlink authState={authenticatedState} href={href} name={name} key={name} />
                        ))} 
                    </div>
                    {authenticatedState ? <UserMenu /> : <Button onClick={handleNavigate}>Login</Button> }
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
