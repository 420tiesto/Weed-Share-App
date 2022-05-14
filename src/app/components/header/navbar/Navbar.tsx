import React from 'react';

import UserMenu from '../userMenu/UserMenu';
import Navlink from './Navlink';


export type NavlinkType = {
    name:string
    href:string
};

const NAVBAR_LINKS:NavlinkType[] = [
    {name:'Home',href:'/'},
    {name:'Explore',href:'/explore'},
    {name:'Communities',href:'/communities'},
    {name:'More',href:'/more'},
]

const Navbar:React.FC = (props) => {
    return (
        <header className="bg-dark-gray px-4 fixed w-full shadow h-16 top-0 z-40 py-2">
            <nav className="flex items-center h-full justify-between max-w-screen-xl mx-auto">
                {/* Logo */}
                <img src="prnts-logo.svg" alt="prnts" className="h-10" />
                {/* User Menu */}
                <div className='inline-flex pl-8 gap-2 flex-grow'>
                    {NAVBAR_LINKS.map(({name,href}:NavlinkType)=>(
                        <Navlink href={href} name={name} key={name}/>
                    ))}
                </div>
                <UserMenu />
            </nav>
        </header>
    );
};

export default Navbar;
