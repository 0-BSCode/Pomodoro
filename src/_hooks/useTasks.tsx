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

  return { tasks, fetchTasks, createTask };
};

export default useTasks;
