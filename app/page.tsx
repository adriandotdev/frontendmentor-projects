import ProjectCard from "./components/ProjectCard";
const projects = [
	{
		projectName: "Easybank Landing Page",
		liveSiteLink:
			"https://adriandotdev.github.io/NADS-PROGRAMMER-easybank-landing-page/",
		repositoryLink:
			"https://github.com/adriandotdev/NADS-PROGRAMMER-easybank-landing-page",
		imageSrc: "/projects-images/easy-bank.png",
	},
	{
		projectName: "NFT Preview Card",
		liveSiteLink:
			"https://adriandotdev.github.io/NADS-PROGRAMMER-NFT-PREVIEW-CARD/",
		repositoryLink:
			"https://github.com/adriandotdev/NADS-PROGRAMMER-NFT-PREVIEW-CARD",
		imageSrc: "/projects-images/nft-preview-card.png",
	},
	{
		projectName: "Order Summary Design",
		liveSiteLink:
			"https://adriandotdev.github.io/NADS-PROGRAMMER-Order-Summary/",
		repositoryLink:
			"https://github.com/adriandotdev/NADS-PROGRAMMER-Order-Summary",
		imageSrc: "/projects-images/order-summary-design.png",
	},
	{
		projectName: "Stats Preview Design",
		liveSiteLink:
			"https://adriandotdev.github.io/NADS-PROGRAMMER-stat-preview-design/",
		repositoryLink:
			"https://github.com/adriandotdev/NADS-PROGRAMMER-stat-preview-design",
		imageSrc: "/projects-images/stats-preview-design.png",
	},
	{
		projectName: "Three Column Preview Card",
		liveSiteLink:
			"https://adriandotdev.github.io/NADS-PROGRAMMER-3-COLUMN-PREVIEW-CARD/",
		repositoryLink:
			"https://github.com/adriandotdev/NADS-PROGRAMMER-3-COLUMN-PREVIEW-CARD",
		imageSrc: "/projects-images/three-column.png",
	},
	{
		projectName: "Base Apparel - Coming Soon Page",
		liveSiteLink:
			"https://adriandotdev.github.io/NADS-PROGRAMMER-base-apparel-design/",
		repositoryLink:
			"https://github.com/adriandotdev/NADS-PROGRAMMER-base-apparel-design",
		imageSrc: "/projects-images/base-apparel.png",
	},
	{
		projectName: "Profile Card Component",
		liveSiteLink:
			"https://adriandotdev.github.io/NADS-PROGRAMMER-profile-card-component/",
		repositoryLink:
			"https://github.com/adriandotdev/NADS-PROGRAMMER-profile-card-component",
		imageSrc: "/projects-images/profile-card.png",
	},
	{
		projectName: "Testimonials Grid",
		liveSiteLink:
			"https://adriandotdev.github.io/NADS-PROGRAMMER-testimonials-grid/",
		repositoryLink:
			"https://github.com/adriandotdev/NADS-PROGRAMMER-testimonials-grid",
		imageSrc: "/projects-images/testimonials-grid.png",
	},
	{
		projectName: "Tip Calculator",
		liveSiteLink: "https://adriandev-tip-calculator.netlify.app/",
		repositoryLink:
			"https://github.com/adriandotdev/FrontendMentor-Tip-Calculator",
		imageSrc: "/projects-images/tip-calculator.png",
	},
	{
		projectName: "Responsive Product Preview Card",
		liveSiteLink:
			"https://adriandotdev.github.io/product-preview-card-component/",
		repositoryLink:
			"https://github.com/adriandotdev/product-preview-card-component",
		imageSrc: "/projects-images/responsive-product-card.png",
	},
	{
		projectName: "QR Code Component",
		liveSiteLink: "https://adriandotdev.github.io/qr-code-component/",
		repositoryLink: "https://github.com/adriandotdev/qr-code-component",
		imageSrc: "/projects-images/qr-code-component.png",
	},
	{
		projectName: "Results Summary Component",
		liveSiteLink: "https://adriandotdev.github.io/results-summary-component/",
		repositoryLink: "https://github.com/adriandotdev/results-summary-component",
		imageSrc: "/projects-images/results-summary-component.png",
	},
	{
		projectName: "Blog Preview Card",
		liveSiteLink: "https://adriandotdev-blog-preview-card.netlify.app/",
		repositoryLink:
			"https://github.com/adriandotdev/frontendmentor-blog-preview-card",
		imageSrc: "/projects-images/blog-preview-card.png",
	},
	{
		projectName: "News Letter Sign-up Form",
		liveSiteLink: "/newsletter",
		repositoryLink: "https://github.com/adriandotdev/frontendmentor-projects",
		imageSrc: "/projects-images/news-letter-form.png",
	},
	{
		projectName: "Typing Speed Test",
		liveSiteLink: "/typingspeedtest",
		repositoryLink: "https://github.com/adriandotdev/frontendmentor-projects",
		imageSrc: "/projects-images/typingspeed.png",
	},
];
export default function Home() {
	return (
		<main className="pb-6">
			<div className="bg-white shadow-md py-3 mb-6">
				<div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
					<h1 className="text-xl font-bold">Frontend Mentor Projects</h1>
				</div>
			</div>

			<div className="max-w-7xl mx-auto flex flex-col flex-wrap gap-5 sm:flex-row md:justify-center lg:justify-start px-6 sm:px-8 lg:px-12">
				{projects.reverse().map((project, index) => (
					<ProjectCard
						key={index}
						projectName={project.projectName}
						liveSiteLink={project.liveSiteLink}
						repositoryLink={project.repositoryLink}
						imageSrc={project.imageSrc as string}
					/>
				))}
			</div>
		</main>
	);
}
