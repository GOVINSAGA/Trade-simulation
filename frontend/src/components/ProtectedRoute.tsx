import { Navigate } from 'react-router-dom';

import { useUserStore } from '../store/useUserStore';

export default function ProtectedRoute({
    children,
}: any) {
    const user = useUserStore((state) => state.user);

    if (!user) {
        return <Navigate to="/" />;
    }

    return children;
}