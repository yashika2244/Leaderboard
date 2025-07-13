

const BASE_URL = `${import.meta.env.VITE_BACK_URI}/api/users`;

export const getUsers = async () => {
    const res = await fetch(BASE_URL);
    return await res.json();
};

export const addUser = async (name) => {
    const res = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
    });
    return await res.json();
};

export const claimPoints = async (userId) => {
    const res = await fetch(`${BASE_URL}/claim`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
    });
    return await res.json();
};

export const getLeaderboard = async () => {
    const res = await fetch(`${BASE_URL}/leaderboard`);
    return await res.json();
};

export const getHistory = async () => {
    const res = await fetch(`${BASE_URL}/history`);
    return await res.json();
};
