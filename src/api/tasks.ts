import axios from 'axios';
import { SUPABASE_API_KEY, SUPABASE_URL_API } from './base';

export interface Task {
  id: number;
  title: string;
  body: string;
  deadline: Date;
  isDone: boolean;
  created_at: Date;
}

export interface CreateTask {
  title: string;
  body: string;
  deadline: Date;
  isDone: boolean;
}

const taskApi = axios.create({
  baseURL: `${SUPABASE_URL_API}`,
  headers: {
    apiKey: SUPABASE_API_KEY,
    Authorization: `Bearer ${SUPABASE_API_KEY}`,
    'Content-Type': 'application/json',
  },
});

export const getTasks = async () => {
  try {
    const response = await taskApi.get<Task[]>('/tasks?order=created_at.asc');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createTask = async (newTask: CreateTask) => {
  try {
    const response = await taskApi.post('/tasks', newTask);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateTask = async ({
  id,
  newTask,
}: {
  id: number;
  newTask: CreateTask;
}) => {
  try {
    const response = await taskApi.patch(`/tasks?id=eq.${id}`, newTask);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteTask = async (id: number) => {
  try {
    const response = await taskApi.delete(`/tasks?id=eq.${id}`);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};
