import React from "react";

interface Props {
  onDelete: () => void;
  onClose: () => void;
}

const TaskDeleteModal = ({ onDelete, onClose }: Props) => {
  return (
    <>
      <div className="overlay" />
      <section className="modal flex w-80 flex-col gap-4 rounded-md bg-cGray-100 p-5">
        <p className="text-xl">Delete Task</p>
        <div className="breaker" />
        <p className="text-md">Are you sure you want to delete this task?</p>
        <div className="mt-4 flex justify-between">
          <button className="btn--skeleton" onClick={onClose}>
            Cancel
          </button>
          <button className="btn--contained shadow-none" onClick={onDelete}>
            Delete
          </button>
        </div>
      </section>
    </>
  );
};

export default TaskDeleteModal;
