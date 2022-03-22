import React, { useState } from 'react';
import { Box } from '@mui/system';
import { FormControl, InputLabel, MenuItem, Select} from '@mui/material';
import { useDispatch } from 'react-redux';
import { handleCategoryChange, handleAmountChange } from '../redux/actions';
//import '../../src/index.css';

const SelectField = props => {
    const { label, options } = props;
    const dispatch = useDispatch();
    const [value, setValue] = useState('');

    const handleChange = (e) => {
        setValue(e.target.value);
        switch(label) {
          case "SELECT CATEGORY":
            dispatch(handleCategoryChange(e.target.value));
            break;
          case "AMOUNT":
            dispatch(handleAmountChange(e.target.value));
            break;
          default:
            return;
        }
    };

    return (
      <Box mt={3} width="100%">
        <FormControl size="small" fullWidth>
          <InputLabel>{label}</InputLabel>
          <Select value={value} label={label} onChange={handleChange}>
            {options.map(({ id, name }) => (
              <MenuItem value={id} key={id}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    );
  };

export default SelectField;