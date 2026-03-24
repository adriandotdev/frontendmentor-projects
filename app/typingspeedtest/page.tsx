export default function Page() {
	return (
		<main className="bg-[hsl(0,0%,7%)] min-h-dvh flex justify-center">
			<div className="max-w-[1200px]">
				{/* Header */}
				<div className="flex items-center justify-between p-4">
					{/* Logo small */}
					<img
						className="xl:hidden"
						src={"/typingspeed/logo-small.svg"}
						alt="small-logo"
					/>

					{/* Logo large */}
					<img
						className="hidden xl:block"
						src={"/typingspeed/logo-large.svg"}
						alt="small-logo"
					/>

					<div className="flex items-center gap-4">
						<img src={"/typingspeed/icon-personal-best.svg"} />

						<div className="flex gap-2">
							<span className="text-[hsl(240,3%,46%)] font-sora font-semibold">
								Best:
							</span>
							<span className="text-[hsl(0,0%,100%)]">92 WPM</span>
						</div>
					</div>
				</div>

				<div className="xl:flex justify-between xl:items-center xl:px-4">
					{/* Stats */}
					<div className="flex justify-center xl:items-center">
						<div className="flex flex-col justify-center gap-1 items-center basis-[150px] border-r border-[hsl(240,3%,46%)] xl:flex-row xl:pr-5 xl:mr-5 px-0 leading-[18px]">
							<span className="text-[hsl(240,3%,46%)] font-sora font-semibold text-[12px] xl:grow">
								WPM:
							</span>
							<span className="text-[24px] font-bold font-sora text-[hsl(0,0%,100%)] xl:grow xl:text-[16px]">
								40
							</span>
						</div>

						<div className="flex flex-col justify-center gap-1 items-center basis-[150px] border-r border-[hsl(240,3%,46%)] xl:flex-row xl:h-max xl:pr-5 xl:mr-5 leading-[18px]">
							<span className="text-[hsl(240,3%,46%)] font-sora font-semibold text-[12px] xl:grow">
								Accuracy:
							</span>
							<span className="text-[24px] font-bold font-sora text-[hsl(354,63%,57%)] xl:grow xl:text-[16px]">
								94%
							</span>
						</div>

						<div className="flex flex-col justify-center gap-1 items-center basis-[150px] xl:flex-row xl:h-max leading-[18px]">
							<span className="text-[hsl(240,3%,46%)] font-sora font-semibold text-[12px] xl:grow">
								Time:
							</span>
							<span className="text-[24px] font-bold font-sora text-[hsl(49,85%,70%)] xl:grow xl:text-[16px xl:text-[16px]">
								02:46
							</span>
						</div>
					</div>

					{/* Dropdowns */}
					{/* Only shown on mobile view */}
					<div className="flex gap-4 px-5 mt-5 xl:mt-0 xl:hidden">
						<select className="border rounded-md border-white text-white p-1 grow basis-[150px]">
							<option>Easy</option>
							<option>Medium</option>
							<option>Hard</option>
						</select>
						<select className="border rounded-md border-white text-white p-1 grow basis-[150px]">
							<option>Timed (60s)</option>
							<option>Passage</option>
						</select>
					</div>

					<div className="flex items-center gap-4">
						{/* Desktop Difficulty Options */}
						<div className="flex items-center gap-3 border-r border-[hsl(240,3%,46%)] pr-4 leading-[16px]">
							<span className="text-[hsl(240,3%,46%)] font-sora font-medium text-[12px]">
								Difficulty:
							</span>
							<div className="gap-2 flex">
								{["Easy", "Medium", "Hard"].map((option, index) => (
									<button
										key={index}
										className="border text-white p-1 px-2 font-sora text-[12px] rounded-md border-[hsl(240,3%,46%)]"
									>
										{option}
									</button>
								))}
							</div>
						</div>

						{/* Desktop Mode Options */}
						<div className="flex items-center gap-3 leading-[16px]">
							<span className="text-[hsl(240,3%,46%)] font-sora font-medium text-[12px]">
								Difficulty:
							</span>
							<div className="gap-2 flex">
								{["Timed (60s)", "Passage"].map((option, index) => (
									<button
										key={index}
										className="border text-white p-1 px-2 font-sora text-[12px] rounded-md border-[hsl(240,3%,46%)]"
									>
										{option}
									</button>
								))}
							</div>
						</div>
					</div>
				</div>

				<div className="px-4">
					<div className="h-px bg-[hsl(0,0%,15%)] mt-5" />

					{/* Words to type */}
					<div>
						<p className="text-[hsl(0,0%,15%)] text-2xl font-medium font-sora leading-[50px] xl:text-3xl">
							{`Lorem! ipsum dolor sit, amet consectetur adipisicing elit. Veritatis
						cupiditate laborum magnam unde. Adipisci quam accusantium iure odit
						repudiandae, ducimus laudantium, molestias quae distinctio error
						nihil necessitatibus minima labore. Quos.`
								.split(" ")
								.join(" ")}
						</p>
					</div>

					<div className="h-px bg-[hsl(0,0%,15%)] mt-2" />
				</div>

				<button className="text-white font-sora font-semibold flex gap-2 bg-[hsl(0,0%,15%)] p-3 rounded-lg mx-auto mt-4">
					Restart Test
					<img src={"/typingspeed/icon-restart.svg"} />
				</button>
			</div>
		</main>
	);
}
