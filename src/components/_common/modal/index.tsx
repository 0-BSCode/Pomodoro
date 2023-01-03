import React, { useEffect } from "react";

interface Props {
  content: JSX.Element;
}

const Modal = ({ content }: Props) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "visible";
    };
  }, []);

  return (
    <>
      <div className="overlay" />
      {content}
    </>
  );
};

export default Modal;
