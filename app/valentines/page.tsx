"use client";
import React, { useState } from "react";

function ValentineRequest({ message }: { message: string }) {
	const [answer, setAnswer] = React.useState<string | null>(null);
	const [noBtnPos, setNoBtnPos] = React.useState<{ top: number; left: number }>({ top: 0, left: 0 });
	const [moveNo, setMoveNo] = React.useState(false);

	const moveNoButton = () => {
		// Random position within parent container
		const top = Math.floor(Math.random() * 60); // percent
		const left = Math.floor(Math.random() * 60);
		setNoBtnPos({ top, left });
		setMoveNo(true);
		setTimeout(() => setMoveNo(false), 300);
	};

	return (
		<div className="text-center relative" style={{ minHeight: 200 }}>
			<p className="text-pink-900 text-lg mb-4">Your message:</p>
			<blockquote className="italic text-pink-700 bg-pink-100 rounded-lg p-4 mb-6">
				{message}
			</blockquote>
			<h2 className="text-2xl font-bold text-pink-700 mb-2">
				Will you be my Valentine?
			</h2>
			{answer === null ? (
				<div className="flex gap-4 justify-center mt-4" style={{ position: "relative", minHeight: 80 }}>
					<button
						className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors shadow-md"
						onClick={() => setAnswer("yes")}
					>
						Yes 💖
					</button>
					<button
						className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-6 rounded-lg transition-colors shadow-md"
						style={moveNo ? { position: "absolute", top: `${noBtnPos.top}%`, left: `${noBtnPos.left}%`, transition: "all 0.3s" } : {}}
						onMouseEnter={moveNoButton}
						onClick={() => setAnswer("no")}
					>
						No 😢
					</button>
				</div>
			) : answer === "yes" ? (
				<div className="mt-6">
					<p className="text-pink-700 text-xl font-bold">She said Yes! 💘</p>
					<p className="text-pink-900 mt-2">Happy Valentine&apos;s Day!</p>
				</div>
			) : (
				<div className="mt-6">
					<p className="text-gray-700 text-xl font-bold">
						Maybe next time... 💔
					</p>
				</div>
			)}
		</div>
	);
}

export default function ValentinesPage() {
	const [message, setMessage] = useState("");
	const [step, setStep] = useState<"input" | "question">("input");

	const handleNext = (e: React.FormEvent) => {
		e.preventDefault();
		setStep("question");
	};

	return (
		<div className="valentines-bg min-h-screen flex flex-col items-center justify-center px-4">
			<div className="bg-white bg-opacity-80 rounded-xl shadow-lg p-6 sm:p-8 max-w-md w-full flex flex-col items-center">
				<h1 className="text-3xl md:text-4xl font-bold text-pink-700 mb-4">
					Will You Be My Valentine?
				</h1>
				{step === "input" ? (
					<form
						onSubmit={handleNext}
						className="w-full flex flex-col items-center"
					>
						<label htmlFor="message" className="text-pink-900 mb-2 text-lg">
							Your Message
						</label>
						<textarea
							id="message"
							value={message}
							onChange={(e) => setMessage(e.target.value)}
							className="w-full rounded-lg border border-pink-200 p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-pink-300 resize-none"
							rows={4}
							placeholder="Write something sweet..."
							required
						/>
						<button
							type="submit"
							className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors shadow-md mt-2"
						>
							Next
						</button>
					</form>
				) : (
					<ValentineRequest message={message} />
				)}
			</div>
			<style jsx>{`
				.valentines-bg {
					background: linear-gradient(135deg, #f8c6d8 0%, #f6e0e9 100%);
				}
				@media (max-width: 640px) {
					.valentines-bg > div {
						padding: 1.25rem;
						max-width: 100%;
					}
					h1 {
						font-size: 2rem;
					}
				}
			`}</style>
		</div>
	);
}
