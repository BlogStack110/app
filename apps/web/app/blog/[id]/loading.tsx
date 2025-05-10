"use client";
const Loading = () => {
  return (
    <article className="bg-gradient-to-b from-[#111111] to-[#0c0c0c] rounded-xl overflow-hidden shadow-md border border-white/5 animate-pulse">
      <div className="h-48 sm:h-56 bg-gray-800"></div>
      <div className="p-5">
        <div className="h-7 bg-gray-800 rounded-md w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-800 rounded-md w-full mb-1"></div>
        <div className="h-4 bg-gray-800 rounded-md w-2/3 mb-4"></div>

        <div className="flex items-center mb-4">
          <div className="w-8 h-8 rounded-full bg-gray-800 mr-3"></div>
          <div>
            <div className="h-4 bg-gray-800 rounded-md w-24 mb-1"></div>
            <div className="h-3 bg-gray-800 rounded-md w-16"></div>
          </div>
        </div>

        <div className="h-px w-full bg-gray-800 my-4"></div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="h-6 bg-gray-800 rounded-md w-16"></div>
            <div className="h-6 bg-gray-800 rounded-md w-10"></div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-gray-800 rounded-lg"></div>
            <div className="h-8 bg-gray-800 rounded-lg w-16"></div>
          </div>
        </div>
      </div>
    </article>
  );
};
export default Loading();
