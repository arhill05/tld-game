import React from 'react';

const CategoryButtons = props => (
  <div className="category-buttons">
    {props.categories.map(category => (
      <button
        key={category}
        className={props.selectedCategory === category ? 'active' : ''}
        onClick={e => {
          props.onCategoryClick(category);
        }}
      >
        {category}
      </button>
    ))}
  </div>
);

export default CategoryButtons;
