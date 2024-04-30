import React, { Key, useState } from "react";
import { Box, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import { PokemonData } from "../page";
import Image from "next/image";

const styleModal = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function IndexTable({list}:{list: PokemonData[]}) {
  const [openPokemonModal, setOpenPokemonModal] = useState<PokemonData | null | undefined>(null);

  return (
    <>
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
                <TableRow onClick={() => setOpenPokemonModal(pokemon as PokemonData)} hover role="checkbox" key={pokemon.id as Key}>
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
      <Modal
        sx={styleModal}
        open={!!openPokemonModal}
        onClose={() => setOpenPokemonModal(null)}>
          <Box>
            { openPokemonModal &&
              <Image height={300} width={300} src={openPokemonModal?.image ? openPokemonModal.image : '/public/interrogation.png'} alt={openPokemonModal?.name} />
            }
          </Box>
      </Modal>
    </>
  );
}