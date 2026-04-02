export type TDifficulty = "easy" | "medium" | "hard";
export type TMode = "timed" | "passage";

export const TIME = 60;

export const typingTexts = {
	easy: [
		"The sun is bright today and the sky is clear. Birds are flying in the air. It is a good day to practice typing.",

		"I like to drink coffee in the morning. It helps me wake up and focus better. Then I start my daily tasks.",

		"Typing fast takes practice every day. Start slow and focus on accuracy. Speed will come with time.",

		"My dog likes to run in the park. He plays with a ball every afternoon. After that he sleeps quietly.",

		"Learning new skills can be fun. You just need patience and effort. Keep going and do not give up.",

		"The rain started this afternoon. People walked faster on the street. Everyone tried to stay dry.",

		"I want to improve my typing speed. I will practice a little every day. Progress takes consistency.",

		"Good habits help you succeed in life. Eat well and sleep enough. Stay focused on your goals.",

		"Technology helps us communicate quickly. Messages can be sent in seconds. Work becomes easier.",

		"Practice makes you better over time. Small progress is still progress. Keep your fingers moving.",
	],

	medium: [
		"Consistency is more important than motivation because motivation can disappear quickly. Daily practice builds discipline and long term improvement. Even small effort counts. Progress comes from repetition. Stay patient with the process.",

		"Software development requires logical thinking and careful testing of every feature. Small bugs can create large problems later. Writing clean code helps prevent confusion. Good structure improves teamwork. Details always matter.",

		"Many people forget the importance of proper rest during work. Short breaks can refresh the mind. A tired brain makes more mistakes. Energy management improves performance. Balance is necessary for productivity.",

		"A good developer focuses on readability as much as functionality. Code should be easy to understand. Future updates become easier with structure. Team members benefit from clarity. Maintainability saves time.",

		"Success is usually the result of many small improvements over time. Rarely does it happen instantly. Learning requires failure and adjustment. Persistence builds experience. Growth is a long journey.",
	],

	hard: [
		"Performance optimization requires understanding system bottlenecks, execution flow, and memory behavior across different environments. Engineers must analyze metrics carefully before applying changes. Blind optimization can introduce new problems. Measurement should guide decisions. Precision matters.",

		"Modern web applications depend on asynchronous operations, background processing, and intelligent caching strategies to maintain responsiveness. Poor handling of concurrency can cause instability. Scaling requires careful planning. Architecture decisions affect everything. Complexity grows quickly.",

		"Debugging complex systems involves tracing state changes, reproducing edge cases, and isolating unpredictable behavior across multiple layers. Assumptions often mislead engineers. Logs provide valuable insight. Patience is required. Root causes hide deeply.",

		"Designing maintainable software involves abstraction boundaries, dependency management, and thoughtful separation of responsibilities. Poor design increases technical debt. Refactoring becomes harder later. Structure determines longevity. Architecture is critical.",

		"Balancing development speed with long term stability is one of the most difficult engineering trade offs in large scale systems. Quick solutions may create future risks. Strategic thinking is necessary. Experience improves judgment. Trade offs are unavoidable.",
	],
};

export type Difficulty = "easy" | "medium" | "hard";

export function getRandomTypingText(difficulty: Difficulty): string {
	const texts = typingTexts[difficulty];

	const randomIndex = Math.floor(Math.random() * texts.length);

	return texts[randomIndex];
}
