import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
	title: "Bento Grid",
	description: "Manage your social media 10x faster with AI.",
};

export default function Page() {
	return (
		<main className="px-4 py-8 flex flex-col gap-8 lg:grid lg:grid-cols-4 lg:max-w-[1280px] lg:mx-auto lg:grid-rows-3 lg:grid-rows-[300px_300px_300px] lg:gap-12- lg:h-dvh lg:place-content-center">
			<div className="bg-[hsl(256,67%,59%)] flex flex-col rounded-2xl items-center p-8 shadow-lg lg:col-start-2 lg:col-end-4 lg:justify-center">
				<h1 className="flex flex-col items-center text-4xl lg:text-6xl lg:text-center lg:block">
					<span className="text-white text-center font-dm-sans font-bold">
						Social Media
					</span>
					<span className="font-dm-sans font-bold text-white">
						<span className="text-[hsl(39,100%,71%)]">10x</span>{" "}
						<span className="italic">Faster</span>
					</span>{" "}
					<span className="font-dm-sans font-bold text-white">with AI</span>
				</h1>

				<div className="flex flex-col items-center mt-4 lg:mt-8">
					<Image
						src={"/bentogrid/images/illustration-five-stars.webp"}
						width={0}
						height={0}
						sizes="100vw"
						className="w-full h-auto lg:max-w-[250px]"
						alt=""
					/>
					<p className="font-dm-sans font-normal text-white text-center text-xl">
						Over 4,000 5-star reviews
					</p>
				</div>
			</div>

			<div className="flex flex-col rounded-2xl items-center p-8 shadow-lg lg:col-start-2 lg:col-end-3 lg:row-start-2 lg:relative lg:justify-end lg:overflow-hidden">
				<Image
					src={"/bentogrid/images/illustration-multiple-platforms.webp"}
					width={0}
					height={0}
					sizes="100vw"
					className="w-full lg:scale-[120%] h-auto lg:absolute lg:left-10 lg:z-[-1] lg:overflow-clip lg:top-8 lg:shadow-lg rounded-full shadow-lg mb-5"
					alt=""
				/>
				<p className="text-left text-3xl font-dm-sans font-semibold leading-8">
					Manage multiple accounts and platforms.
				</p>
			</div>

			<div className="rounded-2xl items-center p-8 shadow-lg relative h-[280px] overflow-hidden bg-[hsl(39,100%,71%)] lg:col-start-3 lg:col-end-4 lg:row-start-2 lg:h-full">
				<p className="text-left text-3xl font-dm-sans font-semibold leading-8 pb-5">
					Maintain a consistent posting schedule.
				</p>
				<Image
					src={"/bentogrid/images/illustration-consistent-schedule.webp"}
					width={0}
					height={0}
					sizes="100vw"
					className="w-62.5 h-auto absolute z-0 lg:relative lg:top-5 lg:w-full"
					alt=""
				/>
			</div>

			<div className="flex flex-col items-center  gap-8 rounded-2xl px-8 py-8 shadow-lg relative overflow-hidden bg-[hsl(254,88%,90%)] lg:col-start-4 lg:row-start-1 lg:row-end-3">
				<p className="text-center text-3xl font-dm-sans font-semibold leading-8 lg:text-left z-10">
					Schedule to social media.
				</p>

				<Image
					src={"/bentogrid/images/illustration-schedule-posts.webp"}
					width={0}
					height={0}
					sizes="100vw"
					className="w-full h-auto z-10 lg:scale-[180%] lg:relative lg:top-20 lg:left-22"
					alt=""
				/>

				<p className="text-center text-2xl font-dm-sans z-10 mt-auto lg:text-left lg:text-xl">
					Optimize post timings to publish content at the perfect time for your
					audience.
				</p>
			</div>

			<div className="flex flex-col items-center gap-8 rounded-2xl px-8 py-8 shadow-lg relative overflow-hidden bg-[hsl(256,67%,59%)] lg:col-start-3 lg:col-end-[-1] lg:row-start-3 lg:flex-row lg:justify-between">
				<Image
					src={"/bentogrid/images/illustration-grow-followers.webp"}
					width={0}
					height={0}
					sizes="100vw"
					className="w-full h-aut lg:w-60"
					alt=""
				/>
				<p className="text-center text-4xl max-w-[300px] lg:w-full text-white font-dm-sans font-semibold leading-7 lg:text-left lg:leading-10">
					Grow followers with non-stop content.
				</p>
			</div>

			<div className="flex flex-col items-start gap-4 rounded-2xl px-8 py-8 shadow-lg relative overflow-hidden lg:col-start-2 lg:col-end-3 lg:row-start-3 lg:flex-1 lg:justify-center">
				<h1 className="text-6xl font-dm-sans font-semibold text-left">
					{">56%"}
				</h1>
				<p className="text-center text-2xl max-w-[300px] font-dm-sans leading-7 lg:text-left lg:text-lg">
					faster audience growth
				</p>
				<Image
					src={"/bentogrid/images/illustration-audience-growth.webp"}
					width={0}
					height={0}
					sizes="100vw"
					className="w-full max-w-[250px] h-auto lg:max-w-[200px]"
					alt=""
				/>
			</div>

			<div className="flex flex-col gap-8 lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-[-1] lg:gap-12">
				<div className="flex flex-col items-start gap-4 rounded-2xl px-8 py-8 shadow-lg relative overflow-hidden bg-[hsl(31,66%,93%)] lg:justify-center lg:flex-1">
					<p className="font-dm-sans font-semibold text-4xl ">
						Create and schedule content{" "}
						<span className="italic text-[hsl(256,67%,59%)]">quicker</span>
					</p>

					<Image
						src={"/bentogrid/images/illustration-create-post.webp"}
						width={0}
						height={0}
						sizes="100vw"
						className="w-full max-w-[250px] h-auto"
						alt=""
					/>
				</div>

				<div className="rounded-2xl items-center p-8 shadow-lg relative overflow-hidden bg-[hsl(39,100%,71%)] lg:justify-between lg:flex lg:flex-col lg:p-6 lg:flex-1">
					<p className="text-left text-4xl font-dm-sans font-semibold leading-8 mb-8 lg:leading-10">
						Write your content using AI.
					</p>
					<Image
						src={"/bentogrid/images/illustration-ai-content.webp"}
						width={0}
						height={0}
						sizes="100vw"
						className="w-[300px] h-auto"
						alt=""
					/>
				</div>
			</div>
		</main>
	);
}
