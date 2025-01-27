import Card from '@/src/components/Card';

export default function Home() {
  const cardsInfo = [
    {
      image: '/chatbot-image.jpg',
      title: 'Chatbot by Revan',
      description:
        'This is a simple AI chatbot where users can interact with a bot assistant. Type a message, and the AI will reply in real-time.',
      link: '/chatbot',
    },
    {
      image: '/translator-image.jpg',
      title: 'Translator by Daniel',
      description:
        'A simple AI translator where users can translate text between different languages. Just enter text, select languages, and get the translation',
      link: '/translator',
    },
    {
      image: '/quiz-image.jpg',
      title: 'Quiz by Ali',
      description: 'text',
      link: '/',
    },
    {
      image: '/travel-image.jpg',
      title: 'Travel Guidance by Shabbo',
      description: 'text',
      link: '/',
    },
    {
      image: '/movieRecommendation-image.jpg',
      title: 'Movie Recommendation by Justus',
      description: 'text',
      link: '/',
    },
    {
      image: '/',
      title: 'Sumiyabazar',
      description: 'text',
      link: '/',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 ">
      {cardsInfo.map((card, index) => (
        <Card
          key={index}
          image={card.image}
          title={card.title}
          description={card.description}
          link={card.link}
        />
      ))}
    </div>
  );
}
