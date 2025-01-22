export async function fetchGeminiReply(message) {
  try {
    const response = await fetch('/api/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch AI response');
    }

    const data = await response.json();
    return data.reply;
  } catch (error) {
    console.error('Error fetching Gemini reply:', error);
    throw error;
  }
}
