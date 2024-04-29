import React, { Key } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { PokemonsData } from "../page";

export default function IndexTable({list}:{list: PokemonsData[]}) {

  return (
    <TableContainer>
      <Table>
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
              <TableRow key={pokemon.id as Key}>
                <TableCell>

                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}