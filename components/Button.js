import React from "react";

export default function Button({ children, onClick }) {
  return (
    <button
      className="border-4 border-black px-6 py-4 font-bold text-2xl"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
