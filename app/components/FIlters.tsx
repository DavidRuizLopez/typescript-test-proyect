import { Box, Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, TextField } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";

export default function Filters({ onChange, typeList, onChangeType }: { 
  onChange: (value: string) => void,
  typeList: string[],
  onChangeType: (values: string[]) => void
}) {
  const [pokemonType, setPokemonType] = useState<string[]>([])

  useEffect(() => {
    onChangeType(pokemonType);
  }, [pokemonType])

  const handelTypeChange = (event: SelectChangeEvent<typeof pokemonType>) => {
    const { target: { value } } = event;
    setPokemonType(value as string[])
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value)
  }

  return (
    <Box m={2} sx={{ position: 'sticky', top: 0, width: '100%', background: 'rgba(71, 73, 84, 0.8)' }}>
      <TextField sx={{ margin: '15px', background: "white" }} id="search-pokemon-name" label="Pokemon Name" variant="outlined" onChange={handleChange} />
      <FormControl sx={{ margin: '15px', background: 'white', width: '200px' }}>
        <InputLabel id="search-pokemon-type-label">Pokemon Types</InputLabel>
        <Select
          labelId="search-pokemon-type-label"
          id="search-pokemon-type"
          multiple
          value={pokemonType}
          onChange={handelTypeChange}
          input={<OutlinedInput id="select-pokemon-type" label="Pokemon Name" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        >
          {typeList.map((type) => (
            <MenuItem
              key={type}
              value={type}
            >
              {type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}