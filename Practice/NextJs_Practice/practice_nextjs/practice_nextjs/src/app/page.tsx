"use client";

import { useState } from "react";
import type { SubmitEventHandler } from "react";

// Step 1: Define the structure of one task
interface Task {
  id: number;
  title: string;
  completed: boolean;
}

export default function Home() {
  // Step 2: Store the input value
  const [taskTitle, setTaskTitle] = useState<string>("");

  // Step 3: Store the tasks
  const [tasks, setTasks] = useState<Task[]>([]);

  // Step 4: Add a task
  const handleAddTask: SubmitEventHandler<HTMLFormElement> = (
    event,
  ) => {
    event.preventDefault();

    const cleanTitle = taskTitle.trim();

    if (cleanTitle === "") {
      alert("Please enter a task title.");
      return;
    }

    const newTask: Task = {
      id: Date.now(),
      title: cleanTitle,
      completed: false,
    };

    setTasks((currentTasks) => [
      ...currentTasks,
      newTask,
    ]);

    setTaskTitle("");
  };

  // Step 5: Change the completion status
  function handleToggleTask(taskId: number) {
    setTasks((currentTasks) =>
      currentTasks.map((task) => {
        if (task.id === taskId) {
          return {
            ...task,
            completed: !task.completed,
          };
        }

        return task;
      }),
    );
  }

  // Step 6: Delete a task
  function handleDeleteTask(taskId: number) {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId),
    );
  }

  // Step 7: Calculate task numbers
  const completedTasks = tasks.filter(
    (task) => task.completed,
  ).length;

  const pendingTasks = tasks.length - completedTasks;

  // Step 8: Display the page
  return (
    <main>
      <h1>Next.js Task Manager</h1>

      <form onSubmit={handleAddTask}>
        <label htmlFor="taskTitle">
          Task title:
        </label>

        <input
          id="taskTitle"
          type="text"
          value={taskTitle}
          onChange={(event) =>
            setTaskTitle(event.target.value)
          }
        />

        <button type="submit">Add Task</button>
      </form>

      <section>
        <h2>Task Summary</h2>

        <p>Total tasks: {tasks.length}</p>
        <p>Completed tasks: {completedTasks}</p>
        <p>Pending tasks: {pendingTasks}</p>
      </section>

      <section>
        <h2>Task List</h2>

        {tasks.length === 0 ? (
          <p>No tasks available.</p>
        ) : (
          <ul>
            {tasks.map((task) => (
              <li key={task.id}>
                <span>
                  {task.title} —{" "}
                  {task.completed
                    ? "Completed"
                    : "Pending"}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    handleToggleTask(task.id)
                  }
                >
                  {task.completed
                    ? "Mark Pending"
                    : "Mark Completed"}
                </button>

                <button
                  type="button"
                  onClick={() =>
                    handleDeleteTask(task.id)
                  }
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}