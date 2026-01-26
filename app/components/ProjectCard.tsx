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
		<div className="flex  flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-lg transition-shadow duration-300 min-w-[340px] max-w-[380px]">
			{/* Image */}
			<div className="relative h-[200px] w-full">
				<img src={imageSrc} alt={projectName} className="object-cover" />
			</div>

			{/* Content */}
			<div className="flex flex-col gap-4 p-5 flex-1">
				<p className="text-lg font-bold text-orange-950">{projectName}</p>

				{/* Buttons */}
				<div className="mt-auto flex gap-3">
					<Link
						href={liveSiteLink}
						target="_blank"
						className="flex-1 text-center bg-slate-950 text-white py-2 rounded-lg text-sm font-bold hover:bg-slate-800 transition"
					>
						Live Site
					</Link>

					<Link
						href={repositoryLink}
						target="_blank"
						className="flex-1 text-center border border-slate-900 text-slate-900 py-2 rounded-lg text-sm font-bold hover:bg-slate-900 hover:text-white transition"
					>
						Code
					</Link>
				</div>
			</div>
		</div>
	);
};

export default ProjectCard;
