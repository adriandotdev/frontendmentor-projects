import Image from "next/image";
import Link from "next/link";

type ProjectCardProps = {
	projectName: string;
	liveSiteLink: string;
	repositoryLink: string;
	imageSrc: string;
};

const ProjectCard = ({
	projectName,
	liveSiteLink,
	repositoryLink,
	imageSrc,
}: ProjectCardProps) => {
	return (
		<div className="flex flex-col overflow-hidden rounded-xl border border-gray-700 bg-gray-950 shadow-sm hover:shadow-lg min-w-[340px] max-w-[380px] group transition-all duration-300">
			{/* Image */}
			<div className="relative h-50 w-full group-hover:scale-105 transition-transform duration-300">
				<Image
					src={imageSrc}
					fill
					sizes="(max-width: 768px) 100vw, 380px"
					alt="Project preview image"
					loading="eager"
				/>
				{/* <img src={imageSrc} alt={projectName} className="object-cover" /> */}
			</div>

			{/* Content */}
			<div className="flex flex-col gap-4 p-5 flex-1">
				<p className="text-lg font-bold text-white">{projectName}</p>

				{/* Buttons */}
				<div className="mt-auto flex gap-3">
					<Link
						href={liveSiteLink}
						target="_blank"
						className="flex-1 text-center bg-[#d2bea3] text-slate-950 py-2 rounded-lg text-sm font-bold transition hover:bg-slate-800 hover:text-white"
					>
						Live Site
					</Link>

					<Link
						href={repositoryLink}
						target="_blank"
						className="flex-1 text-center border border-gray-500 text-gray-300 py-2 rounded-lg text-sm font-bold hover:bg-gray-600 hover:text-white transition"
					>
						Code
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ProjectCard;
