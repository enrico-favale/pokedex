import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFistRaised,
  faBolt,
  faHeart,
  faBrain,
} from "@fortawesome/free-solid-svg-icons"; // Aggiungi altre icone che ti servono

const MovesList = ({ title, moves, typeColors }) => {
  return (
    <div className="text-sm">
      <div className="lg:hidden border-t border-txt_secondary pb-2"></div>

      <p className="text-xl font-bold mb-2 border-l border-txt_secondary pl-2">
        {title}
      </p>

      <div className="border-t border-txt_secondary pb-2"></div>

      {/* Intestazione grid */}
      <div className="grid grid-cols-[minmax(20px,_auto)_minmax(0px,120px)_1fr_1fr_1fr] sm:grid-cols-[minmax(20px,_auto)_minmax(200px,_auto)_1fr_1fr_1fr] gap-2 text-center items-center mb-2 border-l border-txt_secondary pl-2">
        {/* Icona della mossa */}
        <p className="font-bold">-</p>
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
          <div
            key={index}
            className="grid grid-cols-[minmax(20px,_auto)_minmax(0px,120px)_1fr_1fr_1fr] sm:grid-cols-[minmax(20px,_auto)_minmax(200px,_auto)_1fr_1fr_1fr] gap-2 text-center items-center mb-2"
          >
            {/* Damage class icon */}
            <div className="pr-1">
              {move.damage_class === "physical" ? (
                <FontAwesomeIcon icon={faFistRaised} title="Physical" />
              ) : move.damage_class === "special" ? (
                <FontAwesomeIcon icon={faBolt} title="Special" />
              ) : move.damage_class === "status" ? (
                <FontAwesomeIcon icon={faHeart} title="Status" />
              ) : (
                <FontAwesomeIcon icon={faBrain} title="Unknown" /> // Icona di default nel caso in cui non ci sia la categoria
              )}
            </div>

            {/* Name */}
            <p
              className="p-1 rounded"
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
