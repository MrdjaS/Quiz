import React, { useState } from "react";
import { Box } from "@mui/system";
import { makeStyles } from "@material-ui/core";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useDispatch } from "react-redux";
import { handleCategoryChange, handleAmountChange } from "../redux/actions";
import '../../src/index.css';


const useStyles = makeStyles({
  root: {  
    color: 'white'
  },
  select: {
    color: 'white',
    padding: '10px',
    width: '350px',
    marginLeft: '120px',
    border: '1px solid white',
    borderRadius: '50px'
  },
  label: {
    marginLeft: '100px',
    color: 'white',
    padding: '10px 30px',
  },
  items: {
    width: '350px',
    borderBottom: '1px solid #8d79e9',
    color: "white"
  },

})


const SelectField = (props) => {
  const { label, options } = props;
  const dispatch = useDispatch();
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
    switch (label) {
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


  const classes = useStyles();

  return (
      <Box mt={3} width="100%" className={classes.root}>
        <FormControl size="small" fullWidth>
        <InputLabel className={classes.label} disableAnimation={true} variant="filled">{label}</InputLabel>
          <Select value={value} onChange={handleChange} className={classes.select}>
            {options.map(({ id, name }) => (
              <MenuItem value={id} key={id} className={classes.items}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
  );
};

export default SelectField;
