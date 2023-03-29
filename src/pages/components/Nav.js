import React from "react";

export default function Nav({ title }) {
  return (
    <div className="w-100 bg-dark text-light p-1 mb-3 text-center">
      <nav>
        <h1>{title}</h1>
      </nav>
    </div>
  );
}
