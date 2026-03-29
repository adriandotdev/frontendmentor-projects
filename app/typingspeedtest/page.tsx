/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Header } from "./_components/Header";
import { TypingStats } from "./_components/TypingStats";

type TDifficulty = "easy" | "medium" | "hard";
type TMode = "timed" | "passage";

export default function Page() {
	const [sentence, setSentence] = useState(
		`The early morning fog hung low over the quiet streets, softening the edges of buildings and turning lamplight into a gentle glow. Birds chirped intermittently as the first few pedestrians hurried along, their footsteps echoing softly against the wet pavement. In the distance, the river reflected the pale light of dawn, and for a moment, everything felt suspended between night and day, calm yet full of possibility.`,
	);
	const slicedSentence = sentence.split(/(\s+)/);
	const [arrayWord, setArrayWord] = useState(
		slicedSentence.map((word) => ({
			word,
			typedAnswer: [...word].map((char) => [char, undefined]),
		})),
	);

	const [started, setStarted] = useState(false);
	const [running, setRunning] = useState(false);
	const [showResultStat, setShowResultStat] = useState(false);

	const [currentIndex, setIndex] = useState(0);
	const [wordIndex, setWordIndex] = useState(0);
	const [cursorIndex, setCursorIndex] = useState(0);
	const [options, setOptions] = useState<{
		difficulty: TDifficulty;
		mode: TMode;
	}>({
		difficulty: "easy",
		mode: "timed",
	});
	const [stats, setStats] = useState({
		wpm: 0,
		accuracy: 0,
		rawWpm: 0,
	});
	const [displayTime, setDisplayTime] = useState({ minute: 0, seconds: 0 });
	const [statsContent, setStatsContent] = useState({
		title: "",
		description: "",
		buttonContent: "",
	});

	const startTime = useRef<number | null>(null);
	const correctChars = useRef<number>(0);
	const incorrectChars = useRef<number>(0);
	const keyStrokes = useRef(0);
	const computedTimeLeft = useRef(0);
	const timeInterval = useRef<ReturnType<typeof setInterval> | null>(null);

	let tracker = 0;

	// let tracker = 0;

	const handleStart = () => {
		setStarted(true);
		setRunning(true);
	};

	const handleRestart = useCallback(() => {
		tracker = 0;
		correctChars.current = 0;
		incorrectChars.current = 0;
		keyStrokes.current = 0;
		computedTimeLeft.current = 0;
		startTime.current = null;
		setIndex(0);
		setWordIndex(0);
		setCursorIndex(0);
		setArrayWord(
			slicedSentence.map((word) => ({
				word,
				typedAnswer: [...word].map((char) => [char, undefined]),
			})),
		);
		setStats({
			wpm: 0,
			accuracy: 0,
			rawWpm: 0,
		});
		setDisplayTime({ minute: 0, seconds: 0 });
		setRunning(false);
		setShowResultStat(false);
		setStarted(false);
		if (timeInterval.current) clearInterval(timeInterval.current);
	}, []);

	const handleScoreBeat = () => {
		tracker = 0;
		correctChars.current = 0;
		incorrectChars.current = 0;
		keyStrokes.current = 0;
		computedTimeLeft.current = 0;
		startTime.current = null;
		if (timeInterval.current) clearInterval(timeInterval.current);
		setIndex(0);
		setWordIndex(0);
		setCursorIndex(0);
		setStats({
			wpm: 0,
			accuracy: 0,
			rawWpm: 0,
		});
		setArrayWord(
			slicedSentence.map((word) => ({
				word,
				typedAnswer: [...word].map((char) => [char, undefined]),
			})),
		);
		setShowResultStat(false);
		setStarted(false);
	};

	const handleDifficulty = useCallback(
		(value: TDifficulty) => {
			setOptions({
				...options,
				difficulty: value,
			});
		},
		[options],
	);

	const handleMode = useCallback(
		(value: TMode) => {
			setOptions({
				...options,
				mode: value,
			});
		},
		[options],
	);

	useEffect(() => {
		const handleKey = (e: KeyboardEvent) => {
			keyStrokes.current++;

			if (e.key === " ") {
				e.preventDefault();
			}

			if (
				started &&
				computedTimeLeft.current > 0 &&
				e.key.length === 1 &&
				!e.ctrlKey &&
				!e.metaKey &&
				wordIndex < arrayWord.length
			) {
				setCursorIndex((prev) => prev + 1);
				let newIndex = currentIndex;
				let newWordIndex = wordIndex;

				console.log("INDEXES: ", newIndex, newWordIndex);
				if (newIndex >= arrayWord[newWordIndex].word.length) {
					newIndex = 0;
					newWordIndex = wordIndex + 1;

					console.log("INDEX AFTER UPDATE: ", newIndex, newWordIndex);
					setIndex(newIndex);
					setWordIndex(newWordIndex);
				}

				if (newWordIndex < arrayWord.length) {
					const temp = arrayWord;

					temp[newWordIndex].typedAnswer[newIndex][1] = e.key;

					if (e.key === temp[newWordIndex].typedAnswer[newIndex][0]) {
						correctChars.current++;
					} else {
						incorrectChars.current++;
					}

					setArrayWord(temp);
					setIndex((prev) => prev + 1);
				}
			}

			if (e.key === "Backspace") {
				console.log("Backspace");

				if (cursorIndex !== 0) setCursorIndex((prev) => prev - 1);

				let newIndex = currentIndex;
				let newWordIndex = wordIndex;

				if (newIndex - 1 < 0) {
					if (newWordIndex - 1 >= 0) {
						newWordIndex -= 1;

						const temp = arrayWord;

						newIndex = temp[newWordIndex].typedAnswer.length - 1;

						const char = temp[newWordIndex].typedAnswer[newIndex][0];
						const typedChar = temp[newWordIndex].typedAnswer[newIndex][1];

						if (char === typedChar) correctChars.current--;
						else incorrectChars.current--;

						temp[newWordIndex].typedAnswer[newIndex][1] = undefined;

						setArrayWord(temp);
						setWordIndex(newWordIndex);
						setIndex(newIndex);
					}
				} else {
					const temp = arrayWord;

					temp[newWordIndex].typedAnswer[newIndex - 1][1] = undefined;

					newIndex -= 1;

					setIndex(newIndex);
					setArrayWord(temp);
				}
			}
		};

		document.addEventListener("keydown", handleKey);

		return () => document.removeEventListener("keydown", handleKey);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentIndex, wordIndex, started, cursorIndex]);

	useEffect(() => {
		console.log("started");
		if (!running) return;
		console.log("here");

		if (!startTime.current) {
			startTime.current = Date.now();
		}

		const timeIntervalValue = options.mode === "timed" ? 100 : 1000;
		let elapsedSeconds = (Date.now() - startTime.current!) / 1000;
		let minutes = Math.max(elapsedSeconds / 50, 0.01);
		computedTimeLeft.current =
			options.mode === "timed" ? Math.max(5 - elapsedSeconds, 0) : 0;

		timeInterval.current = setInterval(() => {
			console.log("time runnng");
			elapsedSeconds = (Date.now() - startTime.current!) / 1000;

			if (options.mode === "timed") {
				computedTimeLeft.current = Math.max(5 - elapsedSeconds, 0);

				setDisplayTime({
					minute: Math.floor(Math.ceil(computedTimeLeft.current) / 60),
					seconds: Math.ceil(computedTimeLeft.current) % 60,
				});
			} else {
				computedTimeLeft.current++;
				setDisplayTime({
					minute: Math.floor(Math.ceil(computedTimeLeft.current) / 60),
					seconds: Math.ceil(computedTimeLeft.current) % 60,
				});
			}

			minutes = Math.max(elapsedSeconds / 60, 0.01);

			if (options.mode === "timed" && computedTimeLeft.current <= 0) {
				const wpm = Math.round(correctChars.current / 5 / minutes);

				startTime.current = null;

				if (timeInterval.current) clearInterval(timeInterval.current);
				setRunning(false);

				if (wpm > 0) setShowResultStat(true);
			}
		}, timeIntervalValue);

		const interval = setInterval(() => {
			console.log("stats computation runnng");
			setStats((prev) => ({
				...prev,
				rawWpm: Math.round(keyStrokes.current / 5 / minutes),
				wpm: Math.round(correctChars.current / 5 / minutes),
				accuracy:
					keyStrokes.current > 0
						? Math.round((correctChars.current / keyStrokes.current) * 100)
						: 0,
			}));
		}, 1500);

		return () => {
			clearInterval(interval);

			if (timeInterval.current) clearInterval(timeInterval.current);
		};
	}, [running, options.mode]);

	useEffect(() => {
		if (!running) {
			const savedData = localStorage.getItem("stats");
			const data = JSON.parse(savedData as string) as {
				wpm: number;
				accuracy: number;
				correctChars: number;
				incorrectChars: number;
			};

			if (!data) {
				console.log(stats.wpm);
				if (stats.wpm > 0) {
					localStorage.setItem(
						"stats",
						JSON.stringify({
							wpm: stats.wpm,
							accuracy: stats.accuracy,
							correctChars: correctChars.current,
							incorrectChars: incorrectChars.current,
						}),
					);
				}

				setStatsContent({
					title: "Baseline Established!",
					description:
						"You've set the bar. Now the real challenge begins--time to beat it.",
					buttonContent: "Beat This Score",
				});
			} else {
			}
		}
	}, [stats.wpm]);
	return (
		<main className="bg-[hsl(0,0%,7%)] min-h-dvh flex justify-center font-sora">
			<div className="max-w-300 w-full">
				{/* Header */}
				<Header />

				{showResultStat ? (
					<div className="max-w-300 flex flex-col justify-center items-center gap-5 relative">
						<Image
							src={"/typingspeed/icon-completed.svg"}
							width={50}
							alt="check-icon"
							height={50}
						/>

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

						<div className="absolute bottom-0 right-12 w-10">
							<img src={"/typingspeed/pattern-star-1.svg"} />
						</div>

						<div className="absolute top-10 left-5 w-10">
							<img src={"/typingspeed/pattern-star-2.svg"} />
						</div>
					</div>
				) : (
					<div>
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
														arrayWord[insideWordIndex].typedAnswer[index][1];
													tracker++;
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
																tracker - 1 === cursorIndex &&
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
						onClick={handleRestart}
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
