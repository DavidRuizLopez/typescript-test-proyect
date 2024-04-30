import { Box, Button, Modal, Typography } from "@mui/material";
import { PokemonData } from "../page";
import Image from "next/image";

const styleModal = {
    position: 'absolute',
    top: '20px',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    mx: 5,
  };

export default function PokemonModal ({pokemon, setClose}: {pokemon: PokemonData, setClose: () => void}) {
    return(
        <Modal
        sx={{...styleModal, background: 'white'}}
        open={!!pokemon}
        onClose={() => setClose()}>
          <Box>
            <Box display="flex">
              <Button variant="contained" sx={{ position: 'absolute', top: '10px', right: '10px' }} onClick={() => setClose()}>X</Button>
              { pokemon &&
                <Image height={300} width={300} src={pokemon?.image ? pokemon.image : '/public/interrogation.png'} alt={pokemon?.name} />
              }
              <Box ml={3}>
                <Typography variant="overline" display="block" gutterBottom>Name: {pokemon?.name}</Typography>
                <Typography variant="overline" display="block" gutterBottom>Type/s: {pokemon?.type.join(' ')}</Typography>
                <Typography variant="overline" display="block" gutterBottom>Other Names</Typography>
                {pokemon && Object.entries(pokemon.otherNames).map(([key, value]) => (
                  <Typography variant="overline" display="block" gutterBottom>{key}: {value}</Typography>
                ))}
              </Box>
              <Box ml={3}>
                {pokemon && Object.entries(pokemon.stats).map(([key, value]) => (
                  <Typography variant="overline" display="block" gutterBottom>{key}: {value}</Typography>
                ))}
              </Box>
            </Box>
            <Typography variant="overline" display="block" gutterBottom>Description:</Typography>
            <Typography variant="overline" display="block" gutterBottom>{pokemon?.description}</Typography>
          </Box>
      </Modal>
    )
}