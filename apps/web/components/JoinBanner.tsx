import Link from "next/link";

const JoinBanner = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2),transparent)]"></div>
      <div className="relative p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-lg sm:text-xl font-bold mb-2 text-white">
            Join BlogStack Community
          </h3>
          <p className="text-white/90 text-sm sm:text-base max-w-xl">
            Create your own blog posts, engage with other writers, and build
            your audience.
          </p>
        </div>
        <div className="flex-shrink-0">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-medium rounded-xl hover:bg-white/90 transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 text-sm sm:text-base"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JoinBanner;
