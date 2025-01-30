import { model } from "@/utils/ai";
import React, { useState } from "react";
import { motion } from "framer-motion";

export default function AiTravel() {
    const [city, setCity] = useState("");
    const [days, setDays] = useState("");
    const [travelPlan, setTravelPlan] = useState(null);
    const [translatedPhrase, setTranslatedPhrase] = useState([]);

    // Function to fetch travel plan
    const handleGeneratePlan = async () => {
        try {
            const prompt = `Create a detailed ${days}-day travel itinerary for ${city}. 
            Provide the response in JSON format as:
            [
                {"day": 1, "time": "7:00 AM", "activity": "Wake up in Rome, enjoy breakfast of pastry and cappuccino."},
                {"day": 1, "time": "8:00 AM", "activity": "Visit the Colosseum and Roman Forum."},
                {"day": 2, "time": "8:00 AM", "activity": "Take a high-speed train to Florence."},
                {"day": 2, "time": "10:00 AM", "activity": "Check into hotel in Florence and leave luggage."},
                ...
            ]`;

            if (!prompt || typeof prompt !== 'string') {
                throw new Error("Invalid prompt");
            }
            const result = await model.generateContent(prompt);
            const responseText = await result.response.text();
            console.log("response", result.response.text());
            const cleanedResponse = responseText
                .trim()
                .replace(/^```json/, "")
                .replace(/```$/, "");
            const parsedTravelPlan = JSON.parse(cleanedResponse);
            console.log("Parsed Travel Plan:", parsedTravelPlan);
            if (Array.isArray(parsedTravelPlan)) {
                setTravelPlan(parsedTravelPlan);
            } else {
                console.error("Parsed response is not an array:", parsedTravelPlan);
                setTravelPlan([]);
            }

        } catch (error) {
            console.error("Error generating travel plan:", error);
            setTravelPlan([]);
        }
    };

// Function to fetch Phrases

    const handleTranslatePhrase = async () => {
        try {
            const prompt = `Translate 50 common tourist phrases from English to the local language of ${city}. Provide the response in JSON format as:
        [
            {"Hello": "<translation>"},
            {"Goodbye": "<translation>"},
            {"Thank you": "<translation>"},
            ...
        ]`;

            const result = await model.generateContent(prompt);
            const responseText = await result.response.text();
            console.log("Raw Response:", responseText);

            const cleanedResponse = responseText
                .trim()
                .replace(/^```json/, "")
                .replace(/```$/, "");

            const parsedPhrases = JSON.parse(cleanedResponse);

            const normalizedPhrases = parsedPhrases.map(obj => {
                const english = Object.keys(obj)[0];
                const translated = obj[english];
                return { english, translated };
            });

            console.log("Normalized Phrases:", normalizedPhrases);

            if (Array.isArray(normalizedPhrases)) {
                setTranslatedPhrase(normalizedPhrases);
            } else {
                console.error("Parsed response is not an array:", normalizedPhrases);
                setTranslatedPhrase([]);
            }
        } catch (error) {
            console.error("Error generating translations:", error);
            setTranslatedPhrase([]);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="p-8 font-sans bg-gray-50 min-h-screen rounded-md shadow-md leading-loose">
            <h1 className="text-3xl font-bold mb-6">AI Travel Guide</h1>

            {/* Travel Plan Section */}
            <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Travel Plan</h2>
                <div className="flex items-center gap-4 mb-4 fade-in">
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
                            {Object.entries(
                                travelPlan.reduce((acc, item) => {
                                    if (!acc[item.day]) acc[item.day] = [];
                                    acc[item.day].push(item);
                                    return acc;
                                }, {})
                            ).map(([day, activities]) => (
                                <div key={day} className="mb-6">
                                    <h4 className="text-xl font-bold">Day {day}</h4>
                                    <ul className="list-disc pl-5">
                                        {activities.map((activity, index) => (
                                            <li key={index} className="mb-2">
                                                <span className="font-bold">{activity.time}</span>: {activity.activity}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <hr className="my-8" />

            {/* Local Language Helper Section */}
            <div>
                <h2 className="text-xl font-semibold mb-4 shadow-md rounded-md">Local Language Helper</h2>
                <div className="flex items-center gap-4 mb-4">
                    <button
                        onClick={handleTranslatePhrase}
                        className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                    >
                        Generate Common Phrases
                    </button>
                </div>

                {translatedPhrase.length > 0 ? (
                    <div className="bg-white shadow-md rounded-lg p-4">
                        <h3 className="text-lg font-semibold mb-2">Common Phrases:</h3>
                        <ul>
                            {translatedPhrase.map((phrase, index) => (
                                <li key={index}>
                                    {phrase.english}: {phrase.translated}
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p className="text-gray-500">No translations available. Click the button to generate.</p>
                )}

            </div>
        </motion.div>
    );

}