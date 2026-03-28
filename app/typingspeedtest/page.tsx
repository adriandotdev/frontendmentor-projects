/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

import { cn } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";

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

	const [currentIndex, setIndex] = useState(0);
	const [wordIndex, setWordIndex] = useState(0);
	const [cursorIndex, setCursorIndex] = useState(0);
	const [options, setOptions] = useState({
		difficulty: "easy",
		mode: "timed",
	});
	let tracker = 0;

	const handleStart = () => setStarted(true);

	const handleRestart = useCallback(() => {
		tracker = 0;
		setIndex(0);
		setWordIndex(0);
		setCursorIndex(0);
		setArrayWord(
			slicedSentence.map((word) => ({
				word,
				typedAnswer: [...word].map((char) => [char, undefined]),
			})),
		);
	}, []);

	useEffect(() => {
		const handleKey = (e: KeyboardEvent) => {
			if (e.key === " ") {
				e.preventDefault();
			}

			if (
				started &&
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

					setArrayWord(temp);
					setIndex((prev) => prev + 1);
				}
			}

			if (e.key === "Backspace") {
				console.log("Backspace");

				if (cursorIndex !== 0) setCursorIndex((prev) => prev - 1);

				let newIndex = currentIndex;
				let newWordIndex = wordIndex;

				console.log("INDEX BSPACE: ", newIndex);
				console.log("WORD INDEX BSPACE: ", newWordIndex);

				if (newIndex - 1 < 0) {
					console.log("1 here");
					if (newWordIndex - 1 >= 0) {
						console.log("2 here");
						newWordIndex -= 1;

						const temp = arrayWord;

						newIndex = temp[newWordIndex].typedAnswer.length - 1;

						temp[newWordIndex].typedAnswer[newIndex][1] = undefined;

						setArrayWord(temp);
						setWordIndex(newWordIndex);
						setIndex(newIndex);
					}
				} else {
					console.log("3 here");
					const temp = arrayWord;

					temp[newWordIndex].typedAnswer[newIndex - 1][1] = undefined;
					console.log("INDEX BSPACE: ", newIndex);
					newIndex -= 1;

					console.log("AFTER INDEX BSPACE: ", newIndex);
					console.log(temp);
					setIndex(newIndex);
					setArrayWord(temp);
				}
			}
		};

		document.addEventListener("keydown", handleKey);

		return () => document.removeEventListener("keydown", handleKey);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentIndex, wordIndex, started, cursorIndex]);

	return (
		<main className="bg-[hsl(0,0%,7%)] min-h-dvh flex justify-center">
			<div className="max-w-300">
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
						<div className="flex flex-col justify-center gap-1 items-center basis-37.5 border-r border-[hsl(240,3%,46%)] xl:flex-row xl:pr-5 xl:mr-5 px-0 leading-[18px]">
							<span className="text-[hsl(240,3%,46%)] font-sora font-semibold text-[12px] xl:grow">
								WPM:
							</span>
							<span className="text-[24px] font-bold font-sora text-[hsl(0,0%,100%)] xl:grow xl:text-[16px]">
								40
							</span>
						</div>

						<div className="flex flex-col justify-center gap-1 items-center basis-37.5 border-r border-[hsl(240,3%,46%)] xl:flex-row xl:h-max xl:pr-5 xl:mr-5 leading-[18px]">
							<span className="text-[hsl(240,3%,46%)] font-sora font-semibold text-[12px] xl:grow">
								Accuracy:
							</span>
							<span className="text-[24px] font-bold font-sora text-[hsl(354,63%,57%)] xl:grow xl:text-[16px]">
								94%
							</span>
						</div>

						<div className="flex flex-col justify-center gap-1 items-center basis-37.5 xl:flex-row xl:h-max leading-4.5">
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
						<select className="border rounded-md border-white text-white p-1 grow basis-37.5">
							<option>Easy</option>
							<option>Medium</option>
							<option>Hard</option>
						</select>
						<select className="border rounded-md border-white text-white p-1 grow basis-37.5">
							<option>Timed (60s)</option>
							<option>Passage</option>
						</select>
					</div>

					<div className="items-center gap-4 hidden xl:flex">
						{/* Desktop Difficulty Options */}
						<div className="flex items-center gap-3 border-r border-[hsl(240,3%,46%)] pr-4 leading-4">
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
						<div className="flex items-center gap-3 leading-4">
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

				{started && (
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
