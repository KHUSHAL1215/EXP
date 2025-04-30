import React from 'react';
import { ExternalLink } from 'lucide-react';

function Game() {
  const games = [
    {
      id: 1,
      title: 'Chess',
      description: 'Improve your strategic thinking with this classic game. Perfect for developing problem-solving skills.',
      imageUrl: 'https://images.pexels.com/photos/260024/pexels-photo-260024.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      gameUrl: 'https://www.chess.com'
    },
    {
      id: 2,
      title: 'CSS Diner',
      description: 'Learn CSS selectors in a fun, interactive way with this coding game that teaches while you play.',
      imageUrl: 'https://images.pexels.com/photos/11035386/pexels-photo-11035386.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      gameUrl: 'https://flukeout.github.io'
    },
    {
      id: 3,
      title: 'Flexbox Froggy',
      description: 'Master CSS Flexbox by helping Froggy and his friends. Great for learning web layout techniques.',
      imageUrl: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      gameUrl: 'https://flexboxfroggy.com'
    },
    {
      id: 4,
      title: 'CodeCombat',
      description: 'Learn programming through gameplay. Solve puzzles and defeat enemies using real code.',
      imageUrl: 'https://images.pexels.com/photos/2653362/pexels-photo-2653362.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      gameUrl: 'https://codecombat.com'
    }
  ];

  return (
    <div className="min-h-screen bg-[#121927] text-white">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
            Game Center
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Boost your learning with interactive educational games
          </p>
        </div>
        
        {/* Game Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {games.map((game) => (
            <div 
              key={game.id} 
              className="bg-[#1E293B] rounded-xl overflow-hidden transition-all duration-300 transform hover:-translate-y-2 hover:shadow-lg hover:shadow-teal-500/10 group"
            >
              <a href={game.gameUrl} target="_blank" rel="noopener noreferrer" className="block h-full">
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={game.imageUrl} 
                    alt={game.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src = 'https://images.pexels.com/photos/2653362/pexels-photo-2653362.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121927]/90 to-transparent"></div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-white mb-3">{game.title}</h3>
                  <p className="text-gray-400 mb-5 line-clamp-2">{game.description}</p>
                  
                  <button className="w-full group-hover:bg-gradient-to-r group-hover:from-teal-500 group-hover:to-blue-500 bg-[#263447] text-white px-5 py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-300">
                    <span>Play Now</span>
                    <ExternalLink className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </a>
            </div>
          ))}
        </div>

        {/* Coming Soon Section */}
        <div className="mt-16 text-center bg-[#1E293B] p-8 rounded-xl max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold text-white mb-4">More Games Coming Soon!</h2>
          <p className="text-gray-400">
            We're constantly adding new educational games to enhance your learning experience.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Game;
