import { useState } from 'react';

import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';

export default function SearchBar() {
    const [text, setText] = useState('');

    const handleChange = (event) => {
        const value = event.target.value;
            setText(value);
    };

    return (
        <TextField
            id="outlined-search"
            label="Search"
            type="search"
            variant="standard"
            value={text}
            onChange={handleChange}
            InputProps={{
                maxLength: 50,
                endAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
                padding: 10,
            }}
        />
    );
}
