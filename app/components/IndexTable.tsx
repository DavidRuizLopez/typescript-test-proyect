'use client'
import React, { ChangeEvent, Key, useState } from "react";
import { Box, Button, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from "@mui/material"
import { PokemonData } from "../page";
import Image from "next/image";

const styleModal = {
  position: 'absolute',
  top: '20px',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  mx: 5,
};

export default function IndexTable({list}:{list: PokemonData[]}) {
  const [openPokemonModal, setOpenPokemonModal] = useState<PokemonData | null | undefined>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell key={"pokemonImage"} style={{ color: "white", minWidth: "100px" }} align="center" >
                  Pokedex Number
                </TableCell>
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
              {list.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((pokemon) => {
                return(
                  <TableRow onClick={() => setOpenPokemonModal(pokemon as PokemonData)} hover role="checkbox" key={pokemon.id as Key}>
                    <TableCell key={`pokedexNumber-${pokemon.id}` as Key} style={{ color: "white", minWidth: "100px" }} align="center">
                      {pokemon.id}
                    </TableCell>
                    <TableCell key={`image-${pokemon.name}-${pokemon.id}` as Key} style={{ color: "white", minWidth: "100px" }} align="center">
                      <Image height={100} width={100} src={pokemon.image ? pokemon.image : '/public/interrogation.png'} alt={pokemon.name} />
                    </TableCell>
                    <TableCell key={`name-${pokemon.name}-${pokemon.id}` as Key} style={{ color: "white", minWidth: "100px" }} align="center">
                      {pokemon.name}
                    </TableCell>
                    <TableCell key={`types-${pokemon.name}-${pokemon.id}` as Key} style={{ color: "white", minWidth: "100px" }} align="center">
                      {pokemon.type.join('\n')}
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
          <TablePagination
            rowsPerPageOptions={[10, 20, 30, 50, 100]}
            count={list.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Box>
      <Modal
        sx={styleModal}
        open={!!openPokemonModal}
        onClose={() => setOpenPokemonModal(null)}>
          <Box>
            <Box display="flex">
              <Button variant="contained" sx={{ position: 'absolute', top: '10px', right: '10px' }} onClick={() => setOpenPokemonModal(null)}>X</Button>
              { openPokemonModal &&
                <Image height={300} width={300} src={openPokemonModal?.image ? openPokemonModal.image : '/public/interrogation.png'} alt={openPokemonModal?.name} />
              }
              <Box ml={3}>
                <Typography variant="overline" display="block" gutterBottom>Name: {openPokemonModal?.name}</Typography>
                <Typography variant="overline" display="block" gutterBottom>Type/s: {openPokemonModal?.type.join(' ')}</Typography>
                <Typography variant="overline" display="block" gutterBottom>Other Names</Typography>
                {openPokemonModal && Object.entries(openPokemonModal.otherNames).map(([key, value]) => (
                  <Typography variant="overline" display="block" gutterBottom>{key}: {value}</Typography>
                ))}
              </Box>
              <Box ml={3}>
                {openPokemonModal && Object.entries(openPokemonModal.stats).map(([key, value]) => (
                  <Typography variant="overline" display="block" gutterBottom>{key}: {value}</Typography>
                ))}
              </Box>
            </Box>
            <Typography variant="overline" display="block" gutterBottom>Description:</Typography>
            <Typography variant="overline" display="block" gutterBottom>{openPokemonModal?.description}</Typography>
          </Box>
      </Modal>
    </>
  );
}