'use client'
import React, { useEffect, useState } from "react";
import data from "../public/pokedex.json"
import IndexTable from "./components/IndexTable";
import Filters from "./components/FIlters";

interface OtherNames {
  japanese: string,
  chinese: string,
  french: string
}

interface Stats {
  hp: number,
  atack: number,
  defense: number,
  spAtack: number,
  spDefense: number,
  speed: number,
  height?: string,
  weight?: string,
}

export interface PokemonData {
  id: number
  name: string,
  description: string,
  type: string[],
  otherNames: OtherNames,
  stats: Stats,
  image?: string
}

function procesPokeData () {
  return data.map((pokemon) => {
    return (
      {
        id: pokemon.id,
        name: pokemon.name['english'],
        type: pokemon.type,
        description: pokemon.description,
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
        },
        image: pokemon?.image['hires']
      }
    )
  })
}

export default function Home() {
  const [nameFilter, setNameFilter] = useState<string>('');
  const [typeFilter, setTypeFilter] = useState<string[]>([]);
  const [pokemonList, setPokemonList] = useState<PokemonData[]>(procesPokeData())

  const handleTypes = () => {
    const uniques: Set<string> = new Set<string>();
    procesPokeData().map((pokemon) => pokemon.type).forEach(array => {
      array.forEach(item => {
        uniques.add(item);
      });
    });

    return Array.from(uniques)
  }

  useEffect(() => {
    setPokemonList(procesPokeData().filter((pokemon) => pokemon.name.toLowerCase().includes(nameFilter.toLowerCase()) && (typeFilter.length !== 0 ? typeFilter.some(type => pokemon.type.includes(type)) : true )));
  }, [nameFilter, typeFilter])

  const handlerNameFilter = (value: string) => {
    setNameFilter(value);
  }

  const filterByType = (values: string[]) => {
    setTypeFilter(values);
    setPokemonList(values.length !== 0 ? procesPokeData().filter((pokemon) => values.some(type => pokemon.type.includes(type))) : procesPokeData())
  }

  return (
    <>
      <Filters onChange={handlerNameFilter} typeList={handleTypes()} onChangeType={filterByType}/>
      <IndexTable list={pokemonList}/>
    </>
  );
}
