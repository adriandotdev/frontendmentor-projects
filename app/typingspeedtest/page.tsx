/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { Header } from "./_components/Header";
import { TypingStats } from "./_components/TypingStats";
import { TDifficulty, TMode } from "./_components/utils";
import useTypingTest from "./_hooks/useTypingTest";

export default function Page() {
	const {
		tracker,
		showResultStat,
		bestWpm,
		stats,
		displayTime,
		statsContent,
		handleStart,
		handleRestart,
		handleScoreBeat,
		handleDifficulty,
		handleMode,
		options,
		correctChars,
		incorrectChars,
		arrayWord,
		sentence,
		started,
		cursorIndex,
	} = useTypingTest();

	return (
		<main className="bg-[hsl(0,0%,7%)] min-h-dvh flex justify-center font-sora pt-4">
			<div className="max-w-300 w-full">
				{/* Header */}
				<Header bestWpm={bestWpm} />

				{showResultStat ? (
					<div className="max-w-300 flex flex-col justify-center items-center gap-5 relative">
						{statsContent.title.includes("Smashed") ? (
							<Image
								src={"/typingspeed/icon-new-pb.svg"}
								width={50}
								alt="check-icon"
								height={50}
							/>
						) : (
							<Image
								src={"/typingspeed/icon-completed.svg"}
								width={50}
								alt="check-icon"
								height={50}
							/>
						)}

						<div className="flex flex-col gap-2 z-10">
							<h1 className="text-[hsl(0,0%,100%)] text-2xl font-sora font-bold text-center">
								{statsContent.title}
							</h1>
							<p className="max-w-90 text-center text-[hsl(240,1%,59%)] font-sora font-medium">
								{statsContent.description}
							</p>
						</div>

						<div className="w-full p-4 flex flex-col gap-4 z-10 xl:flex-row max-w-100 items-center justify-center">
							<div className="border rounded-md border-[hsl(0,0%,15%)] w-full flex flex-col gap-3 p-4 xl:min-w-[180px]">
								<span className="text-[hsl(240,3%,46%)] font-medium text-lg">
									WPM:
								</span>
								<span className="text-3xl text-[hsl(0,0%,100%)] font-bold">
									{stats.wpm}
								</span>
							</div>

							<div className="border rounded-md border-[hsl(0,0%,15%)] w-full flex flex-col gap-3 p-4 xl:min-w-[180px]">
								<span className="text-[hsl(240,3%,46%)] font-medium text-lg">
									Accuracy:
								</span>
								<span
									className={cn(
										"text-3xl  font-bold",
										stats.accuracy >= 100
											? "text-[hsl(140,63%,57%)]"
											: "text-[hsl(354,63%,57%)]",
									)}
								>
									{stats.accuracy}%
								</span>
							</div>
							<div className="border rounded-md border-[hsl(0,0%,15%)] w-full flex flex-col gap-3 p-4 xl:min-w-[180px]">
								<span className="text-[hsl(240,3%,46%)] font-medium text-lg">
									Characters:
								</span>
								<span className="text-3xl text-[hsl(0,0%,100%)] font-bold">
									<span className="text-[hsl(140,63%,57%)]">
										{correctChars.current}
									</span>
									/
									<span className="text-[hsl(354,63%,57%)]">
										{incorrectChars.current}
									</span>
								</span>
							</div>
						</div>
						<button
							onClick={handleScoreBeat}
							className="font-sora font-semibold flex gap-2 bg-[hsl(0,0%,100%)] text-[hsl(0,0%,7%)] p-3 rounded-lg mx-auto mt-4 mb-8 z-10"
						>
							{statsContent.buttonContent}
							<img src={"/typingspeed/icon-restart.svg"} className="invert" />
						</button>

						{!statsContent.title.includes("Smashed") && (
							<div className="absolute bottom-0 right-12 w-10">
								<img src={"/typingspeed/pattern-star-1.svg"} />
							</div>
						)}

						{!statsContent.title.includes("Smashed") && (
							<div className="absolute top-10 left-5 w-10">
								<img src={"/typingspeed/pattern-star-2.svg"} />
							</div>
						)}

						<div className="fixed bottom-0 left-0 w-full pointer-events-none">
							<img
								src={"/typingspeed/pattern-confetti.svg"}
								className="w-full"
							/>
						</div>
					</div>
				) : (
					<div className="mt-3">
						<div className="xl:flex justify-between xl:items-center xl:px-4">
							{/* Stats */}
							<TypingStats
								wpm={stats.wpm}
								accuracy={stats.accuracy}
								minute={displayTime.minute}
								seconds={displayTime.seconds}
							/>

							{/* Dropdowns */}
							{/* Only shown on mobile view */}
							<div className="flex gap-4 px-5 mt-5 xl:mt-0 xl:hidden">
								<select
									onChange={(e) =>
										handleDifficulty(e.target.value as TDifficulty)
									}
									className="border rounded-md border-white text-white p-1 grow basis-37.5"
								>
									<option value={"easy"}>Easy</option>
									<option value={"medium"}>Medium</option>
									<option value={"hard"}>Hard</option>
								</select>
								<select
									onChange={(e) => handleMode(e.target.value as TMode)}
									className="border rounded-md border-white text-white p-1 grow basis-37.5"
								>
									<option value={"timed"}>Timed (60s)</option>
									<option value={"passage"}>Passage</option>
								</select>
							</div>

							<div className="items-center gap-4 hidden xl:flex">
								{/* Desktop Difficulty Options */}
								<div className="flex items-center gap-3 border-r border-[hsl(240,3%,46%)] pr-4 leading-4">
									<span className="text-[hsl(240,3%,46%)] font-sora font-medium text-[12px]">
										Difficulty:
									</span>
									<div className="gap-2 flex">
										{[
											{ label: "Easy", value: "easy" },
											{ label: "Medium", value: "medium" },
											{ label: "Hard", value: "hard" },
										].map((option, index) => (
											<button
												onClick={() =>
													handleDifficulty(option.value as TDifficulty)
												}
												key={index}
												className={cn(
													"border text-white p-1 px-2 font-sora text-[12px] rounded-md border-[hsl(240,3%,46%)]",
													option.value === options.difficulty &&
														"text-[hsl(210,100%,65%)] border border-[hsl(210,100%,65%)]",
												)}
											>
												{option.label}
											</button>
										))}
									</div>
								</div>

								{/* Desktop Mode Options */}
								<div className="flex items-center gap-3 leading-4">
									<span className="text-[hsl(240,3%,46%)] font-sora font-medium text-[12px]">
										Difficulty:
									</span>
									<div className="gap-2 flex">
										{[
											{ label: "Timed (60s)", value: "timed" },
											{ label: "Passage", value: "passage" },
										].map((option, index) => (
											<button
												onClick={() => handleMode(option.value as TMode)}
												key={index}
												className={cn(
													"border text-white p-1 px-2 font-sora text-[12px] rounded-md border-[hsl(240,3%,46%)]",
													option.value === options.mode &&
														"text-[hsl(210,100%,65%)] border border-[hsl(210,100%,65%)]",
												)}
											>
												{option.label}
											</button>
										))}
									</div>
								</div>
							</div>
						</div>

						<div className="px-4 relative">
							<div className="h-px bg-[hsl(0,0%,15%)] mt-5" />
							{!started && (
								<div
									onClick={handleStart}
									className="absolute inset-0 bg-[hsl(240, 3%, 46%)/20 backdrop-blur-[3px] flex  flex-col justify-center items-center gap-4 cursor-pointer"
								>
									<button className="text-white font-sora font-semibold flex gap-2 bg-[hsl(214,100%,55%)] p-3 rounded-lg hover:bg-[hsl(210,100%,65%)]">
										Start Typing Test
									</button>
									<p className="text-[hsl(0,0%,100%)] font-sora font-bold">
										Or click the text and start typing
									</p>
								</div>
							)}
							{/* Words to type */}
							<div>
								<div className="flex flex-wrap  text-2xl font-medium font-sora leading-15 xl:text-3xl">
									{sentence.split(/(\s+)/).map((word, insideWordIndex) => {
										// eslint-disable-next-line react-hooks/immutability
										if (insideWordIndex === 0) tracker.current = 0;
										return (
											<span
												key={insideWordIndex}
												className={cn(
													word !== " " ? "" : "whitespace-pre",
													"text-white",
												)}
											>
												{Array.from(word).map((ch, index) => {
													const chTyped =
														arrayWord[insideWordIndex]?.typedAnswer[index]?.[1];
													// eslint-disable-next-line react-hooks/immutability
													tracker.current++;
													return (
														<span
															className={cn(
																chTyped === undefined
																	? "text-[hsl(0,0%,15%)]"
																	: chTyped === ch
																		? "text-green-500"
																		: chTyped !== ch
																			? "text-red-500 border-b-3 border-b-red-500"
																			: "",
																tracker.current - 1 === cursorIndex &&
																	"bg-[hsl(240,1%,59%)] px-1 rounded-sm",
																ch === " " &&
																	ch !== chTyped &&
																	chTyped !== undefined &&
																	"bg-red-500 rounded-sm h-8 my-auto",
															)}
															key={index}
														>
															{ch}
														</span>
													);
												})}
											</span>
										);
									})}
								</div>
							</div>

							<div className="h-px bg-[hsl(0,0%,15%)] mt-2" />
						</div>
					</div>
				)}

				{started && !showResultStat && (
					<button
						onClick={() => handleRestart()}
						className="text-white font-sora font-semibold flex gap-2 bg-[hsl(0,0%,15%)] p-3 rounded-lg mx-auto mt-4 mb-8"
					>
						Restart Test
						<img src={"/typingspeed/icon-restart.svg"} />
					</button>
				)}
			</div>
		</main>
	);
}
