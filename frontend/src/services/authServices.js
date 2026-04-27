const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const loginWithGoogle = () => {
    window.location.href = `${API_BASE}/api/auth/google`;
}
