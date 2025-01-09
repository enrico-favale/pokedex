import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFistRaised, faBolt } from "@fortawesome/free-solid-svg-icons";

const MovesList = ({ title, moves, typeColors }) => {
  return (
    <div>
      <p className="text-xl font-bold mb-2 border-l border-txt_secondary pl-2">
        {title}
      </p>

      <div className="border-t border-txt_secondary pb-2"></div>

      {/* Intestazione grid */}
      <div className="grid grid-cols-[minmax(20px,_auto)_minmax(200px,_auto)_1fr_1fr_1fr] gap-2 text-center items-center mb-2 border-l border-txt_secondary pl-2">
        {/* Icona della mossa */}
        <p className="font-bold">DC</p>
        {/* Nome della mossa */}
        <p className="font-bold">Name</p>
        {/* PP */}
        <p className="font-bold">PP</p>
        {/* Power */}
        <p className="font-bold">Power</p>
        {/* Accuracy */}
        <p className="font-bold">Acc.</p>
      </div>

      {/* Contenuto grid */}
      <div className="border-l border-txt_secondary pl-2">
        {moves.map((move, index) => (
          <div key={index} className="grid grid-cols-[minmax(20px,_auto)_minmax(200px,_auto)_1fr_1fr_1fr] gap-2 text-center items-center mb-2">
            {/* Damage class icon */}
            <div className="pr-1">
              {move.damage_class === "physical" ? (
                <FontAwesomeIcon icon={faFistRaised} />
              ) : (
                <FontAwesomeIcon icon={faBolt} />
              )}
            </div>

            {/* Name */}
            <p
              className="text-sm p-1 rounded"
              style={{ backgroundColor: typeColors[move.type] }}
            >
              {move.name.toUpperCase()}
            </p>

            {/* PP */}
            <p>{move.pp}</p>

            {/* Power */}
            <p>{move.power}</p>

            {/* Accuracy */}
            <p>{move.accuracy}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovesList;
