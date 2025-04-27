
import React from 'react';
import './SummaryCards.css';

const SummaryCards = ({ cards }) => {
  return (
    <div className="summary-cards">
      {cards.map((card, idx) => (
        <div key={idx} className={`summary-card ${card.bg}`}>
          {card.icon}
          <h5>{card.title}</h5>
          <p>{card.value}</p>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
