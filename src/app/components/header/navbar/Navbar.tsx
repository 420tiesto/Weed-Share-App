import React from 'react';
import UserMenu from '../userMenu/UserMenu';

type Props = {};

const Navbar = (props: Props) => {
    return (
        <header className="bg-dark-gray px-4 fixed w-full shadow h-16 top-0 z-40 py-2">
            <nav className="flex items-center h-full justify-between max-w-screen-xl mx-auto">
                {/* Logo */}
                <img src="prnts-logo.svg" alt="prnts" className="h-10" />
                {/* User Menu */}

                <UserMenu />
            </nav>
        </header>
    );
};

export default Navbar;
