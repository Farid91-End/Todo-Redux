import { useState } from "react";

const Card = (props) => {
  const [cnt, setCnt] = useState(0);
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img
        className="w-full"
        src="https://v1.tailwindcss.com/img/card-top.jpg"
        alt="Sunset in the mountains"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">
          {props.title ? props.title + "+" : null}
        </div>
        <p className="text-gray-700 text-base">{props.description}</p>
      </div>
      <div className="px-6 pt-4 pb-2">{props.children}</div>
    </div>
  );
};

export default Card;
