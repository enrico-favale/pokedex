import React, { useEffect, useState } from "react";
import { fetchMoveInfo } from "../../../api/pokemon";

import MovesList from "./MovesList";

const Moves = ({ pokemon, typeColors }) => {
  const [levelUpMoves, setLevelUpMoves] = useState([]);
  const [otherMoves, setOtherMoves] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovesDetails = async () => {
      let moves = pokemon.moves;

      // Lista delle mosse apprese per livello
      let levelUpMovesData = moves.filter((move) =>
        move.version_group_details.some(
          (detail) => detail.move_learn_method.name === "level-up"
        )
      );

      // Lista delle mosse NON apprese per livello
      let otherMovesData = moves.filter(
        (move) =>
          !move.version_group_details.some(
            (detail) => detail.move_learn_method.name === "level-up"
          )
      );

      // Recupera i dettagli di ogni mossa
      const levelUpMovesWithDetails = await Promise.all(
        levelUpMovesData.map(async (move) => {
          const moveDetails = await fetchMoveInfo(move.move.name);
          return {
            name: move.move.name,
            type: moveDetails?.type?.name || "unknown",
            damage_class: moveDetails?.damage_class?.name || "-",
            power: moveDetails?.power || "-",
            accuracy: moveDetails?.accuracy + "%" || "-",
            pp: moveDetails?.pp || "-",
            priority: moveDetails?.priority || "-",
          };
        })
      );

      const otherMovesWithDetails = await Promise.all(
        otherMovesData.map(async (move) => {
          const moveDetails = await fetchMoveInfo(move.move.name);
          return {
            name: move.move.name,
            type: moveDetails?.type?.name || "unknown",
            damage_class: moveDetails?.damage_class?.name || "-",
            power: moveDetails?.power || "-",
            accuracy: moveDetails?.accuracy + "%" || "-",
            pp: moveDetails?.pp || "-",
            priority: moveDetails?.priority || "-",
          };
        })
      );

      // Aggiorna lo stato
      setLevelUpMoves(levelUpMovesWithDetails);
      setOtherMoves(otherMovesWithDetails);
      setLoading(false);
    };

    fetchMovesDetails();
  }, [pokemon]);

  if (loading) {
    return <p>Loading moves...</p>;
  }

  return (
    <div className="mt-4">
  <p className="text-2xl font-bold border-b border-txt_secondary mb-2">
    Moves
  </p>

  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
    {/* Mosse apprese per livello */}
    <div>
      <MovesList title="Level-Up Moves" moves={levelUpMoves} typeColors={typeColors} />
    </div>

    {/* Mosse non apprese per livello */}
    <div>
      <MovesList title="Other Moves" moves={otherMoves} typeColors={typeColors} />
    </div>
  </div>
</div>

  );
};

export default Moves;
