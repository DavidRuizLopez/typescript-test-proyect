import React, { Key } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { PokemonsData } from "../page";
import Image from "next/image";

export default function IndexTable({list}:{list: PokemonsData[]}) {

  return (
    <TableContainer>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell key={"pokemonImage"} style={{ color: "white", minWidth: "100px" }} align="center" >
              Image
            </TableCell>
            <TableCell key={"pokemonName"} style={{ color: "white", minWidth: "100px" }} align="center" >
              Name
            </TableCell>
            <TableCell key={"pokemonType"} style={{ color: "white", minWidth: "100px" }} align="center" >
              Type
            </TableCell>
            <TableCell key={"pokemonHeight"} style={{ color: "white", minWidth: "100px" }} align="center" >
              Height
            </TableCell>
            <TableCell key={"pokemonWeight"} style={{ color: "white", minWidth: "100px" }} align="center" >
              Weight
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((pokemon) => {
            return(
              <TableRow hover role="checkbox" key={pokemon.id as Key}>
                <TableCell key={`image-${pokemon.name}-${pokemon.id}` as Key} style={{ color: "white", minWidth: "100px" }} align="center">
                  <Image height={100} width={100} src={pokemon.image ? pokemon.image : '/public/interrogation.png'} alt={pokemon.name} />
                </TableCell>
                <TableCell key={`name-${pokemon.name}-${pokemon.id}` as Key} style={{ color: "white", minWidth: "100px" }} align="center">
                  {pokemon.name}
                </TableCell>
                <TableCell key={`types-${pokemon.name}-${pokemon.id}` as Key} style={{ color: "white", minWidth: "100px" }} align="center">
                  {pokemon.type}
                </TableCell>
                <TableCell key={`height-${pokemon.name}-${pokemon.id}` as Key} style={{ color: "white", minWidth: "100px" }} align="center">
                  {pokemon.stats.height}
                </TableCell>
                <TableCell key={`weight-${pokemon.name}-${pokemon.id}` as Key} style={{ color: "white", minWidth: "100px" }} align="center">
                  {pokemon.stats.weight}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}