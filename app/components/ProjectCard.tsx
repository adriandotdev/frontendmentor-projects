import Link from "next/link";

type ProjectCardProps = {
	projectName: string;
	liveSiteLink: string;
	repositoryLink: string;
};
const ProjectCard = ({
	projectName,
	liveSiteLink,
	repositoryLink,
}: ProjectCardProps) => {
	return (
		<div className="border border-slate-200 rounded-lg min-w-[340px] p-5 ">
			<p className="text-lg font-bold text-orange-950">{projectName}</p>
			<div className="mt-3 flex gap-2">
				<button className="bg-slate-950 text-white p-2 rounded-lg text-[14px] font-bold font-roboto cursor-pointer">
					<Link href={liveSiteLink} target="_blank">
						View Live Site
					</Link>
				</button>
				<button className="bg-slate-950 text-white p-2 rounded-lg text-[14px] font-bold font-roboto cursor-pointer">
					<Link href={repositoryLink} target="_blank">
						View Code
					</Link>
				</button>
			</div>
		</div>
	);
};

export default ProjectCard;
