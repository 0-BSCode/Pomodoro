import { trpc } from "@utils/trpc";
import { type Task } from "@prisma/client";
import { useState } from "react";

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

  const editTask = trpc.task.editTask.useMutation();

  return { tasks, fetchTasks, createTask, editTask };
};

export default useTasks;
