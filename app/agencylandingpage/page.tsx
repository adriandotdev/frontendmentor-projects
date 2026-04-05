import type { Metadata } from "next";
import AgencyLandingPage from "./_components/AgencyLandingPage";

export const metadata: Metadata = {
	title: "Sunnyside Agency",
	description:
		"Sunnyside is a full-service creative agency specializing in helping brands grow fast through compelling visuals and creative design.",
	keywords: ["creative agency", "graphic design", "photography", "branding"],
	openGraph: {
		title: "Sunnyside Agency",
		description:
			"We are full-service creative agency specializing in helping brands grow fast.",
		type: "website",
	},
};

export default function Page() {
	return <AgencyLandingPage />;
}
