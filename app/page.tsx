import ProjectCard from "./components/ProjectCard";

const projects = [
	{
		projectName: "Easybank Landing Page",
		liveSiteLink:
			"https://adriandotdev.github.io/NADS-PROGRAMMER-easybank-landing-page/",
		repositoryLink:
			"https://github.com/adriandotdev/NADS-PROGRAMMER-easybank-landing-page",
	},
	{
		projectName: "NFT Preview Card",
		liveSiteLink:
			"https://adriandotdev.github.io/NADS-PROGRAMMER-NFT-PREVIEW-CARD/",
		repositoryLink:
			"https://github.com/adriandotdev/NADS-PROGRAMMER-NFT-PREVIEW-CARD",
	},
	{
		projectName: "Order Summary Design",
		liveSiteLink:
			"https://adriandotdev.github.io/NADS-PROGRAMMER-Order-Summary/",
		repositoryLink:
			"https://github.com/adriandotdev/NADS-PROGRAMMER-Order-Summary",
	},
	{
		projectName: "Stats Preview Design",
		liveSiteLink:
			"https://adriandotdev.github.io/NADS-PROGRAMMER-stat-preview-design/",
		repositoryLink:
			"https://github.com/adriandotdev/NADS-PROGRAMMER-stat-preview-design",
	},
	{
		projectName: "Three Column Preview Card",
		liveSiteLink:
			"https://adriandotdev.github.io/NADS-PROGRAMMER-3-COLUMN-PREVIEW-CARD/",
		repositoryLink:
			"https://github.com/adriandotdev/NADS-PROGRAMMER-3-COLUMN-PREVIEW-CARD",
	},
	{
		projectName: "Base Apparel - Coming Soon Page",
		liveSiteLink:
			"https://adriandotdev.github.io/NADS-PROGRAMMER-base-apparel-design/",
		repositoryLink:
			"https://github.com/adriandotdev/NADS-PROGRAMMER-base-apparel-design",
	},
	{
		projectName: "Profile Card Component",
		liveSiteLink:
			"https://adriandotdev.github.io/NADS-PROGRAMMER-profile-card-component/",
		repositoryLink:
			"https://github.com/adriandotdev/NADS-PROGRAMMER-profile-card-component",
	},
	{
		projectName: "Testimonials Grid",
		liveSiteLink:
			"https://adriandotdev.github.io/NADS-PROGRAMMER-testimonials-grid/",
		repositoryLink:
			"https://github.com/adriandotdev/NADS-PROGRAMMER-testimonials-grid",
	},
	{
		projectName: "Tip Calculator",
		liveSiteLink: "https://adriandev-tip-calculator.netlify.app/",
		repositoryLink:
			"https://github.com/adriandotdev/FrontendMentor-Tip-Calculator",
	},
	{
		projectName: "Responsive Product Preview Card",
		liveSiteLink:
			"https://adriandotdev.github.io/product-preview-card-component/",
		repositoryLink:
			"https://github.com/adriandotdev/product-preview-card-component",
	},
	{
		projectName: "QR Code Component",
		liveSiteLink: "https://adriandotdev.github.io/qr-code-component/",
		repositoryLink: "https://github.com/adriandotdev/qr-code-component",
	},
	{
		projectName: "Results Summary Component",
		liveSiteLink: "https://adriandotdev.github.io/results-summary-component/",
		repositoryLink: "https://github.com/adriandotdev/results-summary-component",
	},
	{
		projectName: "Blog Preview Card",
		liveSiteLink: "https://adriandotdev-blog-preview-card.netlify.app/",
		repositoryLink:
			"https://github.com/adriandotdev/frontendmentor-blog-preview-card",
	},
	{
		projectName: "News Letter Sign-up Form",
		liveSiteLink: "/newsletter",
		repositoryLink: "https://github.com/adriandotdev/frontendmentor-projects",
	},
];
export default function Home() {
	return (
		<main className="p-6">
			<h1 className="text-4xl font-bold font-roboto text-slate-950 mb-9">
				Frontend Mentor Projects
			</h1>
			<div className="w-full flex flex-col md:flex-row gap-5 justify-stretch flex-wrap">
				{projects.map((project, index) => (
					<ProjectCard
						key={index}
						projectName={project.projectName}
						liveSiteLink={project.liveSiteLink}
						repositoryLink={project.repositoryLink}
					/>
				))}
			</div>
		</main>
	);
}
