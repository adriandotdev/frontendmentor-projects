import { useCallback, useEffect, useRef, useState } from "react";
import {
	getRandomTypingText,
	TDifficulty,
	TIME,
	TMode,
} from "../_components/utils";

export default function useTypingTest() {
	const [sentence, setSentence] = useState("");

	const [arrayWord, setArrayWord] = useState<
		{ word: string; typedAnswer: (string | undefined)[][] }[]
	>([]);

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
	const [bestWpm, setBestWpm] = useState(0);
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
	const computeStatInterval = useRef<ReturnType<typeof setInterval> | null>(
		null,
	);
	const tracker = useRef(0);

	const handleStart = () => {
		setStarted(true);
		setRunning(true);
	};

	const handleRestart = useCallback(
		(difficulty?: TDifficulty) => {
			const currentDifficulty = difficulty ?? options.difficulty;
			tracker.current = 0;
			correctChars.current = 0;
			incorrectChars.current = 0;
			keyStrokes.current = 0;
			computedTimeLeft.current = 0;
			startTime.current = null;
			setSentence(getRandomTypingText(currentDifficulty));
			setIndex(0);
			setWordIndex(0);
			setCursorIndex(0);
			const slicedSentence = sentence.split(/(\s+)/);

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
		},
		[options],
	);

	const handleScoreBeat = () => {
		tracker.current = 0;
		correctChars.current = 0;
		incorrectChars.current = 0;
		keyStrokes.current = 0;
		computedTimeLeft.current = 0;
		startTime.current = null;
		if (timeInterval.current) clearInterval(timeInterval.current);
		setSentence(getRandomTypingText(options.difficulty));

		setIndex(0);
		setWordIndex(0);
		setCursorIndex(0);
		setStats({
			wpm: 0,
			accuracy: 0,
			rawWpm: 0,
		});
		const slicedSentence = sentence.split(/(\s+)/);

		setArrayWord(
			slicedSentence.map((word) => ({
				word,
				typedAnswer: [...word].map((char) => [char, undefined]),
			})),
		);
		setShowResultStat(false);
		setStarted(false);
		setDisplayTime({
			minute: 0,
			seconds: 0,
		});
	};

	const handleDifficulty = useCallback(
		(value: TDifficulty) => {
			setOptions({
				...options,
				difficulty: value,
			});
			handleRestart(value);
		},
		[handleRestart, options],
	);

	const handleMode = useCallback(
		(value: TMode) => {
			setOptions({
				...options,
				mode: value,
			});
			handleRestart();
		},
		[handleRestart, options],
	);

	const handleShowingStats = (minutes: number) => {
		const wpm = Math.round(correctChars.current / 5 / minutes);
		const accuracy =
			keyStrokes.current > 0
				? Math.round((correctChars.current / keyStrokes.current) * 100)
				: 0;

		const savedData = localStorage.getItem("stats");
		const data = savedData
			? (JSON.parse(savedData) as {
					wpm: number;
					accuracy: number;
					correctChars: number;
					incorrectChars: number;
				})
			: null;

		setShowResultStat(true);

		if (!data) {
			if (wpm > 0) {
				localStorage.setItem(
					"stats",
					JSON.stringify({
						wpm,
						accuracy,
						correctChars: correctChars.current,
						incorrectChars: incorrectChars.current,
					}),
				);
				setBestWpm(wpm);

				setStatsContent({
					title: "Baseline Established!",
					description:
						"You've set the bar. Now the real challenge begins--time to beat it.",
					buttonContent: "Beat This Score",
				});
			}
		} else {
			if (wpm < data.wpm) {
				setStatsContent({
					title: "Test Complete!",
					description: "Solid run! Keep pushing to beat your high score.",
					buttonContent: "Go Again",
				});
			} else {
				localStorage.setItem(
					"stats",
					JSON.stringify({
						wpm,
						accuracy,
						correctChars: correctChars.current,
						incorrectChars: incorrectChars.current,
					}),
				);
				setBestWpm(wpm);
				setStatsContent({
					title: "High Score Smashed!",
					description: "You're getting faster. That was incredible typing.",
					buttonContent: "Go Again",
				});
			}
		}
		setStats((prev) => ({
			...prev,
			rawWpm: Math.round(keyStrokes.current / 5 / minutes),
			wpm: Math.round(correctChars.current / 5 / minutes),
			accuracy:
				keyStrokes.current > 0
					? Math.round((correctChars.current / keyStrokes.current) * 100)
					: 0,
		}));
	};

	useEffect(() => {
		const handleKey = (e: KeyboardEvent) => {
			keyStrokes.current++;

			if (e.key === " ") {
				e.preventDefault();
			}

			if (
				started &&
				(options.mode === "passage" || computedTimeLeft.current > 0) &&
				e.key.length === 1 &&
				!e.ctrlKey &&
				!e.metaKey &&
				wordIndex < arrayWord.length
			) {
				setCursorIndex((prev) => prev + 1);
				let newIndex = currentIndex;
				let newWordIndex = wordIndex;

				if (newIndex >= arrayWord[newWordIndex].word.length) {
					newIndex = 0;
					newWordIndex = wordIndex + 1;

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

					// Detect passage completion
					if (
						newWordIndex === arrayWord.length - 1 &&
						newIndex + 1 >= arrayWord[newWordIndex].word.length
					) {
						const minutes =
							options.mode === "passage"
								? Math.max(computedTimeLeft.current / 60, 0.01)
								: Math.max(
										(Date.now() - (startTime.current ?? Date.now())) /
											1000 /
											60,
										0.01,
									);
						if (timeInterval.current) clearInterval(timeInterval.current);
						if (computeStatInterval.current)
							clearInterval(computeStatInterval.current);
						handleShowingStats(minutes);
						setRunning(false);
					}
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
		if (!running) return;

		if (!startTime.current) {
			startTime.current = Date.now();
		}

		const timeIntervalValue = options.mode === "timed" ? 100 : 1000;
		let elapsedSeconds = (Date.now() - startTime.current!) / 1000;
		let minutes = Math.max(elapsedSeconds / 50, 0.01);
		computedTimeLeft.current =
			options.mode === "timed" ? Math.max(-elapsedSeconds, 0) : 0;

		timeInterval.current = setInterval(() => {
			elapsedSeconds = (Date.now() - startTime.current!) / 1000;

			if (options.mode === "timed") {
				computedTimeLeft.current = Math.max(TIME - elapsedSeconds, 0);

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
				startTime.current = null;

				handleShowingStats(minutes);
				if (timeInterval.current) clearInterval(timeInterval.current);
				if (computeStatInterval.current)
					clearInterval(computeStatInterval.current);

				setRunning(false);
			}
		}, timeIntervalValue);

		computeStatInterval.current = setInterval(() => {
			if (running) {
				setStats((prev) => ({
					...prev,
					rawWpm: Math.round(keyStrokes.current / 5 / minutes),
					wpm: Math.round(correctChars.current / 5 / minutes),
					accuracy:
						keyStrokes.current > 0
							? Math.round((correctChars.current / keyStrokes.current) * 100)
							: 0,
				}));
			}
		}, 1500);

		return () => {
			if (computeStatInterval.current)
				clearInterval(computeStatInterval.current);

			if (timeInterval.current) clearInterval(timeInterval.current);
		};
	}, [running, options.mode]);

	useEffect(() => {
		const slicedSentence = sentence.split(/(\s+)/);

		setArrayWord(
			slicedSentence.map((word) => ({
				word,
				typedAnswer: [...word].map((char) => [char, undefined]),
			})),
		);
	}, [sentence]);

	useEffect(() => {
		const savedData = localStorage.getItem("stats");
		if (savedData) {
			const parsed = JSON.parse(savedData) as { wpm: number };
			setBestWpm(parsed.wpm);
		}
		setSentence(getRandomTypingText(options.difficulty));
	}, []);

	return {
		showResultStat,
		bestWpm,
		tracker,
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
	};
}
