import React from 'react';
import UserMenu from '../userMenu/UserMenu';

type Props = {};

const Navbar = (props: Props) => {
    return (
        <header className="bg-slate-900 px-4 py-2">
            <nav className="flex items-center justify-between max-w-screen-xl mx-auto">
                {/* Logo */}
                <img src="prnts-logo.svg" alt="prnts" className="h-10" />
                {/* User Menu */}

                <UserMenu />
            </nav>
        </header>
    );
};

export default Navbar;
