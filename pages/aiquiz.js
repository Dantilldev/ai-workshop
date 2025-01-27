import { useState } from "react";
import { model } from "@/util/aigame";
import CustomIcon from "@/src/components/ChatBotIcon";
import { Reset } from "@radix-ui/themes";

export default function AiGame() {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizTopic, setQuizTopic] = useState("Geography");
  const [answerFeedback, setAnswerFeedback] = useState("");

  const startGame = async () => {
    setGameStarted(true);
    setScore(0);
    setQuestionIndex(0);
    setAnswerFeedback("");
    await generateQuestion();
  };
  // får rätta svaren from api/ai
  const generateQuestion = async () => {
    const fullPrompt = `Generate a simple true/false statement about ${quizTopic} and don't show the answer`;

    try {
      const result = await model.generateContent(fullPrompt);

      const questionText = result.response.text();
      const correctAnswer = result.correctAnswer ? "True" : "False";

      console.log("Generated Correct Answer:", correctAnswer);
      console.log("Generated Question:", questionText);

      setCurrentQuestion({
        question: questionText,
        correctAnswer: correctAnswer,
        feedback: "",
      });
    } catch (error) {
      console.error("Error generating content:", error);
      setCurrentQuestion({
        question: "Sorry, something went wrong.",
        correctAnswer: null,
      });
    }
  };
  //<------------------------------------------------------------------>

  // användaren svar och jämför
  const handleAnswer = async (answer) => {
    const trimmedAnswer = answer.trim();
    const trimmedCorrectAnswer = currentQuestion.correctAnswer.trim();

    const isCorrect = trimmedAnswer === trimmedCorrectAnswer;

    console.log("User's Answer:", trimmedAnswer);
    console.log("Expected Answer:", trimmedCorrectAnswer);
    console.log("Is Correct:", isCorrect);

    if (isCorrect) {
      setScore(score + 1);
      setAnswerFeedback("Correct!");
    } else {
      setAnswerFeedback("Wrong!");
    }

    const nextIndex = questionIndex + 1;
    setQuestionIndex(nextIndex);

    if (nextIndex < 8) {
      setTimeout(() => {
        setAnswerFeedback("");
        generateQuestion();
      }, 1000);
    } else {
      setTimeout(() => setGameStarted(false), 1000);
    }
  };

  return (
    <div className="min-h-screen flex justify-center bg-white py-10">
      <div className="bg-gray-50 max-w-lg w-full p-16 rounded-lg shadow-xl relative">
        <div className="flex justify-center gap-4">
          <CustomIcon />
          <h1 className="text-3xl sm:text-4xl font-semibold mb-10 text-gray-700">
            AI Quiz Game
          </h1>
        </div>
        <div className="flex justify-center border border-gray-200 p-5 rounded-lg">
          {gameStarted && (
            <div className="absolute top-4 left-4 text-xl font-semibold text-gray-700">
              Score: {score}
            </div>
          )}
          <div className="absolute top-4 right-4 font-normal text-white">
            <button className="py-2 px-4 bg-blue-300 hover:bg-blue-500 rounded-2xl">
              <Reset>
                <a href="http://localhost:3000/aiquiz">Reset</a>
              </Reset>
            </button>
          </div>

          <div className="chatbox space-y-6">
            {gameStarted ? (
              <>
                <div>
                  <div className="bg-blue-100 p-4 rounded-lg shadow-md max-w-[80%] mx-auto">
                    <h2 className="text-xl font-semibold text-gray-700">
                      {currentQuestion?.question}
                    </h2>
                  </div>
                </div>

                <div className="flex flex-col gap-6 mt-6 sm:w-full">
                  <button
                    onClick={() => handleAnswer("True")}
                    className="bg-green-500 text-white py-3 px-8 rounded-full shadow-lg hover:bg-green-600 transition duration-300 w-full sm:w-auto"
                  >
                    True
                  </button>
                  <button
                    onClick={() => handleAnswer("False")}
                    className="bg-red-500 text-white py-3 px-8 rounded-full shadow-lg hover:bg-red-600 transition duration-300 w-full sm:w-auto"
                  >
                    False
                  </button>
                </div>

                {answerFeedback && (
                  <div
                    className={`text-center mt-4 ${
                      answerFeedback === "Correct!"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    <p className="text-lg">
                      <span className="text-black">The answer is: </span>
                      {answerFeedback}
                    </p>
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center">
                {questionIndex >= 5 && (
                  <div>
                    <div className="bg-gray-200 p-4 rounded-lg shadow-md text-center">
                      <h3 className="text-2xl font-semibold text-gray-700">
                        Game Over
                      </h3>
                      <p className="text-lg">Your score: {score}</p>
                    </div>
                  </div>
                )}

                <div className="flex gap-6 items-center mt-6">
                  <select
                    value={quizTopic}
                    onChange={(e) => setQuizTopic(e.target.value)}
                    className="border p-3 rounded-lg shadow-sm text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Geography</option>
                    <option>Sport</option>
                    <option>Movies</option>
                    <option>Music</option>
                    <option>Science</option>
                  </select>
                  <button
                    onClick={startGame}
                    className="bg-blue-500 text-white py-2 px-4 rounded-full shadow-lg hover:bg-blue-600 transition duration-300"
                  >
                    Start Quiz
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="pt-7 bg-gray-50">
          <div className="text-center">
            <p className="text-2xl font-extrabold text-gray-800 mb-4 tracking-tight leading-tight">
              Welcome to the AI Quiz Game
            </p>
            <p className="text-lg font-light text-gray-600 leading-relaxed">
              Test your knowledge and have fun with challenging questions. Get
              started by selecting a quiz topic!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
