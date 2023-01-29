import React from "react";

/* FULLSCREEN LOADER */
const Loader = () => {
  return (
    <div className="fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-opacity-70">
      <div className="h-32 w-32 animate-spin rounded-full border-t-2 border-b-2 border-indigo-600" />
    </div>
  );
};

export default Loader;
