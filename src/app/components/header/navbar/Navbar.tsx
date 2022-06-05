import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import UserMenu from '../userMenu/UserMenu';
import Navlink, { AuthenticatedNavlink } from './Navlink';
import { CREATE_PROJECT, EXPLORE, LOGIN } from '../../../routes/Routes';
import { getUserAuthenticated, getUserHandle } from '../../../../modules/auth/state/auth.reducer';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../common-ui/atoms/Button';
import { PlusIcon, SearchIcon, UserCircleIcon } from '@heroicons/react/outline';
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
                <Link to="/">
                    <img src="/prnts-logo.svg" alt="prnts" className="h-10 pr-24 p-1" />
                </Link>
                <div className="flex gap-6  items-center flex-1 justify-end ">
                    <div className="flex-grow ">
                        <Input
                            leftIcon={<SearchIcon className="h-5 w-5" />}
                            placeholder="Search music, projects, and accounts"
                            className="w-full"
                        />
                    </div>
                    <div className="inline-flex pl-8 gap-6">
                        {NAVBAR_LINKS.map(({ name, href }: NavlinkType) => (
                            <Navlink href={href} key={name}>
                                {name}
                            </Navlink>
                        ))}
                        {AUTHENTICATED_NAV_LINKS.map(({ name, href }: NavlinkType) => (
                            <AuthenticatedNavlink authState={authenticatedState} href={href}>
                                {name}
                            </AuthenticatedNavlink>
                        ))}
                    </div>
                    {authenticatedState ? (
                        <UserMenu />
                    ) : (
                        <UserCircleIcon
                            onClick={handleNavigate}
                            className="h-8 w-8 hover:bg-white/10  rounded-lg cursor-pointer"
                        />
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
