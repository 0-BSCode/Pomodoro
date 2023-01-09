import { trpc } from "@utils/trpc";
import { type Task } from "@prisma/client";
import { useEffect, useState } from "react";

const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

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

  const updateTask = trpc.task.updateTask.useMutation();

  useEffect(() => {
    if (!tasks) return;
    tasks.forEach((task, idx) => {
      if (task.order === idx + 1) return;
      updateTask.mutate({
        taskId: task.id,
        order: idx + 1,
      });
    });
  }, [tasks]);

  return { tasks, setTasks, fetchTasks, createTask, updateTask, deleteTask };
};

export default useTasks;
