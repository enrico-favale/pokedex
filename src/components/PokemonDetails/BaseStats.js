import React from "react";

const BaseStats = ({ pokemon }) => {
  return (
    <div className="mt-4">
      <p className="text-2xl font-bold border-b border-txt_secondary mb-2">Base stats</p>
      <div className="max-w-full border-l border-txt_secondary px-2 gap-1">
        {pokemon.stats.map((stat) => (
          <div
            key={stat.stat.name}
            className="grid grid-cols-[minmax(180px,_auto)_minmax(40px,_auto)_1fr] justify-between mb-1 pr-2"
          >
            <p className="text-l">{stat.stat.name.toUpperCase()}:</p>
            <p className="text-l border-r border-txt_secondary">
              {stat.base_stat}
            </p>
            <div className="hidden sm:flex border border-txt_secondary w-full ml-2 m-1 rounded">
              <div
                className="bg-txt_secondary h-full"
                style={{ width: `${(stat.base_stat / 255) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
        <p className="border border-txt_secondary max-w-fit rounded p-1 mt-2">
          TOTAL:{" "}
          {pokemon.stats.reduce((total, stat) => total + stat.base_stat, 0)}
        </p>
      </div>
    </div>
  );
};

export default BaseStats;
