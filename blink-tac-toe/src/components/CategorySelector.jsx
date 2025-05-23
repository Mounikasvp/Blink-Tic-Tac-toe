import React from 'react';
import '../styles/CategorySelector.css';

const CategorySelector = ({ player, categories, selectedCategory, onSelectCategory, emojiSamples }) => {
  return (
    <div className="category-selector">
      <h3>Player {player}</h3>
      <div className="category-options">
        {categories.map((category) => (
          <div 
            key={category}
            className={`category-option ${selectedCategory === category ? 'selected' : ''}`}
            onClick={() => onSelectCategory(category)}
          >
            <div className="category-name">{category.charAt(0).toUpperCase() + category.slice(1)}</div>
            <div className="emoji-samples">
              {emojiSamples[category].slice(0, 3).map((emoji, index) => (
                <span key={index} className="emoji-sample">{emoji}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;
