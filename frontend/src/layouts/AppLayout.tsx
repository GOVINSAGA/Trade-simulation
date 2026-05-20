import { Outlet } from 'react-router-dom';

import Navbar from '../components/Navbar';

export default function AppLayout() {
    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />

            <main className="p-8">
                <Outlet />
            </main>
        </div>
    );
}