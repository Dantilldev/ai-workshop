import { model } from "@/utils/ai";

// import { GoogleGenerativeAI } from "@google/generative-ai";
import React from 'react';
import { useState } from "react";

// Initialize Gemini API
// const apiKey = process.env.NEXT_PUBLIC_GEMINI_API;
// const genAI = new GoogleGenerativeAI(apiKey);
// const models = genAI.getGenerativeModel({ models: "gemini-1.5-flash" });

export default function AI_Travel() {
    const [city, setCity] = useState(""); 
    const [days, setDays] = useState(""); 
    const [travelPlan, setTravelPlan] = useState("");
    const [phrase, setPhrase] = useState(""); // Phrase to translate
    const [translatedPhrase, setTranslatedPhrase] = useState("");

    // Function to fetch travel plan
    const handleGeneratePlan = async () => {
        try {
            const prompt = `Create a detailed ${days}-day travel plan for ${city}. 
            Provide your response as a list, with no additional text or commentary before or after that.`;
            if (!prompt || typeof prompt !== 'string') {
                throw new Error("Invalid prompt");
            }
            const result = await model.generateContent(prompt);
            console.log("response", result.response.text());
            setTravelPlan(result.response.text());
        } catch (error) {
            console.error("Error generating travel plan:", error);
            setTravelPlan("An error occurred while generating the travel plan.");
        }
};

// Function to fetch translations
const handleTranslatePhrase = async () => {
    try {
        const prompt = `List 50 common words that a tourist would use in the selected ${city}.`
        console.log(prompt)
        const result = await model.generateContent(prompt);
        console.log("response", result.response.text());
        setTranslatedPhrase(result.response.text());
    } catch (error) {
        console.error("Error generating translation:", error);
        setTranslatedPhrase("An error occurred while generating the translation.");
    }
};

return (
    <div className="p-8 font-sans bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">AI Travel Guide</h1>
        
        {/* Travel Plan Section */}
        <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Travel Plan</h2>
            <div className="flex items-center gap-4 mb-4">
                <input
                    type="text"
                    placeholder="Enter city or country"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="p-2 border rounded-md w-1/3"
                />
                <input
                    type="number"
                    placeholder="Enter number of days"
                    value={days}
                    onChange={(e) => setDays(e.target.value)}
                    className="p-2 border rounded-md w-1/4"
                />
                <button
                    onClick={handleGeneratePlan}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    Generate Plan
                </button>
            </div>
            {travelPlan && (
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-2">Generated Travel Plan:</h3>
                    <div className="prose max-w-none">
                        <p>{travelPlan}</p>
                    </div>
                </div>
            )}
        </div>

        <hr className="my-8" />

        {/* Local Language Helper Section */}
        <div>
            <h2 className="text-xl font-semibold mb-4">Local Language Helper</h2>
            <div className="flex items-center gap-4 mb-4">
                <button
                    onClick={handleTranslatePhrase}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                    Generate Common phrases
                </button>
            </div>
            {translatedPhrase && (
                <div className="bg-white shadow-md rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-2">Translation:</h3>
                    <div className="prose max-w-none">
                        <p>{translatedPhrase}</p>
                    </div>
                </div>
            )}
        </div>
    </div>
);

}
