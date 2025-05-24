import React from 'react';
import { Panel, Stack } from 'rsuite';
import '../styles/CategorySelector.css';

const CategorySelector = ({ player, categories, selectedCategory, onSelectCategory, emojiSamples, disabledCategory }) => {
  return (
    <div className="category-selector">
      <h3 className="player-title light-player-title">👤 Player {player}</h3>
      <Stack direction="column" spacing={15}>
        {categories.map((category) => {
          const isDisabled = category === disabledCategory;
          return (
            <Panel
              key={category}
              className={`category-option light-category ${selectedCategory === category ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}`}
              onClick={() => !isDisabled && onSelectCategory(category)}
              bordered
            >
              <div className="category-name">{category.charAt(0).toUpperCase() + category.slice(1)}</div>
              <div className="emoji-samples">
                {emojiSamples[category].slice(0, 3).map((emoji, index) => (
                  <span key={index} className="emoji-sample">{emoji}</span>
                ))}
              </div>
              {isDisabled && (
                <div className="disabled-overlay light-disabled">
                  🚫 Selected by Player {player === 1 ? 2 : 1}
                </div>
              )}
            </Panel>
          );
        })}
      </Stack>
    </div>
  );
};

export default CategorySelector;
