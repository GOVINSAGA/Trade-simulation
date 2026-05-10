import { useUserStore } from '../store/useUserStore';

export default function DashboardPage() {
    const user = useUserStore((state) => state.user);

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <h1 className="text-4xl font-bold mb-4">
                Welcome, {user?.username}
            </h1>

            <div className="bg-zinc-900 p-6 rounded-2xl max-w-md">
                <h2 className="text-xl mb-2">Virtual Wallet</h2>

                <p className="text-3xl font-bold text-green-400">
                    ₹ {user?.wallet?.balance?.toLocaleString()}
                </p>
            </div>
        </div>
    );
}