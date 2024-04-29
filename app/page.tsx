'use client'
import React from "react";
import data from "../public/pokedex.json"
import IndexTable from "./components/IndexTable";

interface OtherNames {
  japanese: String,
  chinese: String,
  french: String
}

interface Stats {
  hp: Number,
  atack: Number,
  defense: Number,
  spAtack: Number,
  spDefense: Number,
  speed: Number,
  height?: String,
  weight?: String,
  egg: String[],
}

export interface PokemonsData {
  id: Number
  name: String,
  type: String[],
  otherNames: OtherNames,
  stats: Stats,
  image?: String
}

function procesPokeData () {
  return data.map((pokemon) => {
    return (
      {
        id: pokemon.id,
        name: pokemon.name['english'],
        type: pokemon.type,
        otherNames: { japanese: pokemon.name['japanese'], chinese: pokemon.name['chinese'], french: pokemon.name['french'] },
        stats: {
          hp: pokemon.base ? pokemon.base['HP'] : 0,
          atack: pokemon.base ? pokemon.base['Attack'] : 0,
          defense: pokemon.base ? pokemon.base['Defense'] : 0,
          spAtack: pokemon.base ? pokemon.base['Sp. Attack'] : 0,
          spDefense: pokemon.base ? pokemon.base['Sp. Defense'] : 0,
          speed: pokemon.base ? pokemon.base['Speed'] : 0,
          height: pokemon?.profile['height'],
          weight: pokemon?.profile['weight'],
          egg: pokemon?.profile['egg'],
        },
        image: pokemon?.image['hires']
      }
    )
  })
}

export default function Home() {
  return (
    <IndexTable list={procesPokeData() as PokemonsData[]}/>
  );
}
