import React from 'react';
import '../styles/CategorySelector.css';

const CategorySelector = ({ player, categories, selectedCategory, onSelectCategory, emojiSamples, disabledCategory }) => {
  return (
    <div className="category-selector">
      <h3>Player {player}</h3>
      <div className="category-options">
        {categories.map((category) => {
          const isDisabled = category === disabledCategory;
          return (
            <div
              key={category}
              className={`category-option ${selectedCategory === category ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}`}
              onClick={() => !isDisabled && onSelectCategory(category)}
            >
              <div className="category-name">{category.charAt(0).toUpperCase() + category.slice(1)}</div>
              <div className="emoji-samples">
                {emojiSamples[category].slice(0, 3).map((emoji, index) => (
                  <span key={index} className="emoji-sample">{emoji}</span>
                ))}
              </div>
              {isDisabled && <div className="disabled-overlay">Already selected by Player {player === 1 ? 2 : 1}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategorySelector;
