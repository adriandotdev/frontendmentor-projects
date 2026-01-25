/* eslint-disable @next/next/no-img-element */

"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

function isValidEmail(email: string) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function NewsLetterPage() {
	const [email, setEmail] = useState("");
	const [isNotValidEmail, setNotValidEmail] = useState(false);
	const [submitted, setSubmitted] = useState(false);

	return (
		<div className="bg-white xl:min-h-screen xl:bg-[hsl(234,29%,20%)] xl:flex xl:justify-center xl:items-center">
			{submitted ? (
				<div className="px-8 py-8 flex flex-col  min-h-screen xl:min-h-[250px] font-roboto bg-red-50 rounded-3xl xl:pb-13 xl:p-11">
					<div className="flex flex-col justify-center flex-1">
						<img
							src="/newsletter/assets/images/icon-success.svg"
							alt="check-icon"
							className="w-[70px] xl:w-[50px]"
						/>

						<div className="mt-7 flex flex-col gap-5">
							<h1 className="font-bold text-[32px] xl:text-[48px]  max-w-[300px] text-[hsl(234,29%,20%)]">
								Thanks for subscribing!
							</h1>
							<p className="max-w-[360px] text-[hsl(235,18%,26%)]">
								A confirmation email has been sent to{" "}
								<span className="font-bold text-[hsl(234,29%,20%)]">
									{email}
								</span>
								. Please open it and click the button inside to confirm your
								subscription
							</p>
						</div>
					</div>
					<button
						onClick={() => {
							setSubmitted(false);
							setEmail("");
						}}
						className="xl:mt-9 font-bold bg-[hsl(234,29%,20%)] text-[hsl(0,0%,100%)] p-4 w-full rounded-lg mt-6 active:to-[hsl(4,100%,67%)] active:bg-linear-to-r active:from-[#ff527b] active:shadow-[0_15px_30px_-5px_hsl(4,100%,67%)] cursor-pointer mt-auto"
					>
						Dismiss message
					</button>
				</div>
			) : (
				<div className="xl:rounded-2xl xl:py-5 bg-[hsl(0,0%,100%)] xl:max-w-[850px]  xl:mx-auto  pb-8 font-roboto xl:flex xl:flex-row-reverse xl:items-center xl:justify-center xl:min-h-auto w-full">
					<img
						src="/newsletter/assets/images/illustration-sign-up-mobile.svg"
						alt="Sign up"
						className="w-full h-auto xl:hidden"
					/>
					<img
						src="/newsletter/assets/images/illustration-sign-up-desktop.svg"
						alt="Sign up"
						className="w-full h-auto hidden xl:block max-w-[350px]"
					/>
					<div className="px-7 pt-6 xl:max-w-[450px] w-full">
						{/* Title and Description */}
						<h1 className="font-roboto font-bold text-[36px] xl:text-[48px] text-[hsl(234,29%,20%)]">
							Stay updated!
						</h1>

						<p className=" font-normal text-[16px] xl:mt-4 mt-5 text-[hsl(235,18%,26%)]">
							Join 60,000+ product managers receiving monthly updates on:
						</p>

						{/* List */}
						<div className="mt-6 flex flex-col gap-3 text-[hsl(235,18%,26%)] font-roboto font-normal leading-[21px]">
							<div className="flex items-start gap-4">
								<img
									src="/newsletter/assets/images/icon-list.svg"
									alt="check-icon"
								/>
								<span>Product discovery and building what matters</span>
							</div>
							<div className="flex items-start gap-4">
								<img
									src="/newsletter/assets/images/icon-list.svg"
									alt="check-icon"
								/>
								<span>Measuring to ensure updates are a success</span>
							</div>
							<div className="flex items-start gap-4">
								<img
									src="/newsletter/assets/images/icon-list.svg"
									alt="check-icon"
								/>
								<span>And much more!</span>
							</div>
						</div>

						<div className="mt-7 xl:mb-8">
							<div className="flex flex-col gap-2">
								<div className="flex justify-between items-center">
									<label
										className="text-[12px] font-bold font-roboto text-[hsl(235,18%,26%)]"
										htmlFor="email-address"
									>
										Email address
									</label>
									{isNotValidEmail && (
										<span className="text-[12px] text-[hsl(4,100%,67%)] font-bold">
											Valid email required
										</span>
									)}
								</div>
								<input
									onChange={(e) => {
										if (!isValidEmail(e.target.value)) {
											setNotValidEmail(true);
										} else {
											setNotValidEmail(false);
										}
										setEmail(e.target.value);
									}}
									value={email}
									required
									type="email"
									placeholder="email@company.com"
									className={cn(
										"border p-4 rounded-[8px] outline-0 focus:ring-0 transition-colors",
										isNotValidEmail
											? "bg-[#ffe8e6] border-[hsl(4,100%,67%)] text-[hsl(4,100%,67%)] placeholder:text-white/70 placeholder:text-[hsl(4,100%,67%)]"
											: "bg-white border-[hsl(0,0%,58%)] focus:border-[hsl(234,29%,20%)]",
									)}
								/>
							</div>
							<button
								onClick={() => {
									if (!email) setNotValidEmail(true);
									if (!isNotValidEmail && email) setSubmitted(true);
								}}
								className="font-bold bg-[hsl(234,29%,20%)] text-[hsl(0,0%,100%)] p-4 w-full rounded-lg mt-6 active:to-[hsl(4,100%,67%)] active:bg-linear-to-r active:from-[#ff527b] active:shadow-[0_15px_30px_-5px_hsl(4,100%,67%)] cursor-pointer"
							>
								Subscribe to monthly newsletter
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
