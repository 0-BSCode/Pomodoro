import { trpc } from "@utils/trpc";
import { type Task } from "@prisma/client";
import { useEffect, useState } from "react";

interface DebounceValueProps {
  value: Task[];
}

const useDebounceValue = ({ value }: DebounceValueProps) => {
  const [debounceValue, setDebounceValue] = useState<Task[]>(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(value);
    }, 2000);

    () => {
      clearTimeout(timeout);
    };
  }, [value]);

  return { debounceValue };
};

const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { debounceValue } = useDebounceValue({ value: tasks });

  const fetchTasks = trpc.task.fetchTasks.useQuery(undefined, {
    onSuccess: (data) => {
      setTasks(data);
    },
  });

  const createTask = trpc.task.addTask.useMutation({
    onSuccess: () => {
      fetchTasks.refetch();
    },
  });

  const deleteTask = trpc.task.deleteTask.useMutation();

  const deleteAllTasks = trpc.task.deleteAllTasks.useMutation({
    onSuccess: () => {
      fetchTasks.refetch();
    },
  });

  const deleteCompletedTasks = trpc.task.deleteCompletedTasks.useMutation({
    onSuccess: () => {
      fetchTasks.refetch();
    },
  });

  const updateTask = trpc.task.updateTask.useMutation();

  useEffect(() => {
    if (!debounceValue) return;
    debounceValue.forEach((task, idx) => {
      if (task.order === idx + 1) return;
      updateTask.mutate({
        taskId: task.id,
        order: idx + 1,
      });
    });
  }, [debounceValue]);

  return {
    tasks,
    setTasks,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    deleteAllTasks,
    deleteCompletedTasks,
  };
};

export default useTasks;
