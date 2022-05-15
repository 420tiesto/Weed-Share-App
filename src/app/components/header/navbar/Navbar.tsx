import React from 'react';
import { useSelector } from 'react-redux';

import UserMenu from '../userMenu/UserMenu';
import Navlink from './Navlink';
import { CREATE_PROJECT, EXPLORE, LOGIN } from '../../../routes/Routes';
import { getUserHandle } from '../../../../modules/auth/state/auth.reducer';
import { useNavigate } from 'react-router-dom';

export type NavlinkType = {
    name: string;
    href: string;
};

const Navbar: React.FC = ({}) => {
    const navigate = useNavigate();
    const userHandle = useSelector(getUserHandle);
    const NAVBAR_LINKS: NavlinkType[] = [
        { name: 'Home', href: '/' },
        { name: 'Explore', href: EXPLORE },
        // { name: 'Upload Album', href: CREATE_PROJECT },
        // {name:'Communities',href:'/communities'},
        // {name:'More',href:'/more'},
    ];
    if (userHandle) {
        NAVBAR_LINKS.push({ name: 'Upload Album', href: CREATE_PROJECT });
    }

    const handleNavigate = () => {
        navigate(LOGIN);
    };
    return (
        <header className="bg-dark-gray px-4 fixed w-full shadow h-16 top-0 z-40 py-2">
            <nav className="flex items-center h-full justify-between max-w-screen-xl mx-auto">
                {/* Logo */}
                <img src="prnts-logo.svg" alt="prnts" className="h-10" />
                {/* User Menu */}
                <div className="inline-flex pl-8 gap-2 flex-grow">
                    {NAVBAR_LINKS.map(({ name, href }: NavlinkType) => (
                        <Navlink href={href} name={name} key={name} />
                    ))}
                </div>
                {userHandle ? <UserMenu /> : <button onClick={handleNavigate}>Login</button>}
            </nav>
        </header>
    );
};

export default Navbar;
