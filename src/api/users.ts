const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_ID = import.meta.env.VITE_API_ID;

export const getUsers = async (limit: number) => {
  const res = await fetch(`${BASE_URL}/user?limit=${limit}`, {
    headers: { 'Content-Type': 'application/json', 'app-id': API_ID },
  });

  const data = await res.json();

  return data.data;
};
