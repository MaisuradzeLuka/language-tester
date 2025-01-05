import React from "react";

const UnauthorizedPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Unauthorized</h1>
        <p className="text-lg text-gray-700 mb-6">
          You don’t have permission to access this page.
        </p>
        <a
          href="/"
          className="px-6 py-3 bg-nav-grey text-white rounded-lg hover:bg-yellow transition"
        >
          Go Back Home
        </a>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
