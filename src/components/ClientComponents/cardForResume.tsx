import React from "react";

interface CardProps {
  title: string;
  content: any;
  className: string
}

const Card: React.FC<CardProps> = ({ title, content, className }) => {
  console.log(content)
  return (
    <main className={`w-96 h-56 rounded-lg p-2 m-4 flex-cole text-center justify-center content-center ${className}`}>
      <div className="text-3xl mb-4">{title}</div>
      <div>{content}</div>
    </main>
  );
};

export default Card;
