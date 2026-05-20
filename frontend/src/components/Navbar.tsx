import { NavLink } from 'react-router-dom';
import ProfileMenu from './ProfileMenu';

export default function Navbar() {
    const navClass = ({ isActive }: any) =>
        `px-4 py-2 rounded-lg transition ${isActive
            ? 'bg-white text-black'
            : 'text-zinc-400 hover:text-white'
        }`;

    return (
        <nav className="border-b border-zinc-800 px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-8">
                <h1 className="text-2xl font-bold">
                    TradeSim
                </h1>

                <div className="flex gap-3">
                    <NavLink
                        to="/explore"
                        className={navClass}
                    >
                        Explore
                    </NavLink>

                    <NavLink
                        to="/holdings"
                        className={navClass}
                    >
                        Holdings
                    </NavLink>

                    <NavLink
                        to="/transactions"
                        className={navClass}
                    >
                        Transactions
                    </NavLink>
                </div>
            </div>

            <ProfileMenu />
        </nav>
    );
}