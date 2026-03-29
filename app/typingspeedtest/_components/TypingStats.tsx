type TypingStatsProps = {
	wpm: number;
	accuracy: number;
	minute: number;
	seconds: number;
};

export const TypingStats = ({
	wpm,
	accuracy,
	minute,
	seconds,
}: TypingStatsProps) => {
	return (
		<div className="flex justify-center xl:items-center">
			<div className="flex flex-col justify-center gap-1 items-center basis-37.5 border-r border-[hsl(240,3%,46%)] xl:flex-row xl:pr-5 xl:mr-5 px-0 leading-[18px]">
				<span className="text-[hsl(240,3%,46%)] font-sora font-semibold text-[12px] xl:grow">
					WPM:
				</span>
				<span className="text-[24px] font-bold font-sora text-[hsl(0,0%,100%)] xl:grow xl:text-[16px]">
					{wpm}
				</span>
			</div>

			<div className="flex flex-col justify-center gap-1 items-center basis-37.5 border-r border-[hsl(240,3%,46%)] xl:flex-row xl:h-max xl:pr-5 xl:mr-5 leading-[18px]">
				<span className="text-[hsl(240,3%,46%)] font-sora font-semibold text-[12px] xl:grow">
					Accuracy:
				</span>
				<span className="text-[24px] font-bold font-sora text-[hsl(354,63%,57%)] xl:grow xl:text-[16px]">
					{accuracy}%
				</span>
			</div>

			<div className="flex flex-col justify-center gap-1 items-center basis-37.5 xl:flex-row xl:h-max leading-4.5">
				<span className="text-[hsl(240,3%,46%)] font-sora font-semibold text-[12px] xl:grow">
					Time:
				</span>
				<span className="text-[24px] font-bold font-sora text-[hsl(49,85%,70%)] xl:grow xl:text-[16px xl:text-[16px]">
					{`${minute.toString().padStart(2, "0")}:${seconds
						.toString()
						.padStart(2, "0")}`}
				</span>
			</div>
		</div>
	);
};
