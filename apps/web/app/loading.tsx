import React from 'react';

const Loader: React.FC = () => {
	return (
		<div className="flex fixed inset-0 items-center justify-center ">
			<div className="flex space-x-1">
				<div
					className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"
					style={{ animationDelay: '0ms' }}
				/>
				<div
					className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"
					style={{ animationDelay: '150ms' }}
				/>
				<div
					className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"
					style={{ animationDelay: '300ms' }}
				/>
			</div>
		</div>
	);
};

export default Loader;
