export const Header = () => {
	return (
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
	);
};
