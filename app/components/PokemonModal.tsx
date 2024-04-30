import { Box, Button, Modal } from "@mui/material";
import { PokemonData } from "../page";

const styleModal = {
    position: 'absolute',
    top: '20px',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    mx: 5,
  };

export default function PokemonModal ({pokemon, setClose}: {pokemon: PokemonData, setClose: () => void}) {
    return(
        <Modal
        sx={styleModal}
        open={!!pokemon}
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
    )
}