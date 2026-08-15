import { generateText } from "ai";

const result = await generateText({
  model: "anthropic/claude-sonnet-5",
  prompt:
    "A bat and ball cost $1.10. The bat costs $1 more than the ball. How much is the ball?",
  reasoning: "high",
});

console.log(result.reasoningText);
console.log(result.text);

//on ai ask v 6 you need to provide provideroptions to proceed further