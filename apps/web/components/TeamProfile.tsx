import {Link} from '@remix-run/react';
import {Github, MapPin} from 'lucide-react';
import {Profile} from '~/types/Team';
const TeamMember = (profile: Profile) => {
	return (
		<div className="flex-col bg-gradient-to-r from-black/70 to-black/100 max-w-[350px]  transition-all duration-200 justify-center text-center text-sm  p-[8px] rounded-[24px] items-center m-5">
			<div className="bg-gradient-to-tr from-white/5 via-white/20 to-white/5  backdrop-brightness-75 backdrop-blur-sm p-7 rounded-[16px] ">
				<div className="flex justify-center">
					<img
						src={profile.pfpUrl}
						className="rounded-full border border-black size-20 "
					/>
				</div>

				<h4 className="text-2xl font-light p-2">{profile.name}</h4>
				<div className="flex text-yellow-600 justify-center items-center space-x-2">
					<MapPin size={15} />
					<p>{profile.location}</p>
				</div>
				<div className="text-gray-300  p-2 font-light">
					<p>{profile.bio}</p>
					<p>{profile.repos + ' repos'}</p>
					<p>{profile.contributions + ' contributions'}</p>
					<p>{profile.commits + ' commits to blogstack.site'}</p>
				</div>
				<div></div>
				<Link
					to={'https://github.com/' + profile.name}
					className="mt-3 flex items-center space-x-1 px-3 py-1.5 bg-gray-500/10 hover:bg-gray-500/20 text-gray-400 rounded-lg transition-all duration-200 font-medium text-xs justify-center"
				>
					<Github size={20} />
					<p>GitHub</p>
				</Link>
			</div>
		</div>
	);
};
export default TeamMember;
