import { useState } from "react";


export default function movieRecs() {
  const [answer, setAnswer] = useState([]);

  async function sendPrompt(genre) {
    const prompt = `List suggestions for your top 5 best movies in the genre: ${genre}. Provide the answer in JSON format with the following data: title, description, runtime, release year. Return the response in JSON format [{}].` 


    const response = await fetch("/api/get-movie-recs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });
    const data = await response.json();

  console.log(data)
    
  if (data.answer) {
    try {
      // gemini formaterar i markdown och inte json 
      // https://www.reddit.com/r/Bard/comments/18mmszg/cant_remove_backticks_from_gemini_pro_api/?rdt=42443
      const cleanedAnswer = data.answer.trim().replace(/^```json/, "").replace(/```$/, "");
      const movies = JSON.parse(cleanedAnswer); 
      console.log(movies);

      

      //
      setAnswer(movies); 
    } catch (error) {
      console.error("Failed to parse movies JSON:", error);
    }
  } else {
    console.error("Response does not contain an 'answer' property.");
  }
  }

  return (
    
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
  
      {/* Content Container */}
      <div className="w-full max-w-4xl px-6 py-4">
  
        {/* Header Styling */}
        <h2 className="text-3xl font-semibold text-center mb-4 text-gray-800">Choose genre</h2>
  
        {/* Genre Dropdown */}
        <select
          onChange={(e) => sendPrompt(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-8 text-gray-800 font-medium"
        >
          <option value={"Komedi"}>Comedy</option>
          <option value={"Drama"}>Drama</option>
          <option value={"Thriller"}>Thriller</option>
          <option value={"Action"}>Action</option>
          <option value={"Crime"}>Crime</option>
        </select>
  
        {/* Movie Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {answer.map((movie) => (
            <div
              key={movie.title}
              className="bg-white shadow-lg rounded-2xl p-6 flex flex-col transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <h2 className="text-xl font-semibold mb-3 text-gray-900">{movie.title}</h2>
              <p className="text-gray-600 text-base mb-3">{movie.description}</p>
              <div className="mt-auto">
                <p className="text-gray-800 font-medium">Year: {movie.releaseYear}</p>
                <p className="text-gray-800 font-medium">Runtime: {movie.runtime} </p>
              </div>
            </div>
          ))}
        </div>
  
      </div>
  
    </div>
     
  );
      
  
  


}
