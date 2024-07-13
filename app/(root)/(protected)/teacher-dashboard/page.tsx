import React from 'react';

const TeacherDashboard = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-purple-400 to-pink-600">
      {/* Header */}

      {/* Main Content */}
      <main className="flex-1 p-6 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Classroom Cards (Replace with dynamic data) */}
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-2">Classroom 1</h2>
            <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-2">Classroom 2</h2>
            <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          {/* Add more classroom cards as needed */}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 text-center">
        &copy; 2024 Teacher Dashboard. All rights reserved.
      </footer>
    </div>
  );
}

export default TeacherDashboard;