import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { handleCategoryChange, handleAmountChange } from '../redux/action';

const Dropdown = (props) => {

  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState([]);
  const toggle = () => setOpen(!open);

  const { label, options } = props;
    const dispatch = useDispatch();
    const [value, setValue] = useState('');

    const handleChange = (e) => {
        setValue(e.target.value);
        switch(label) {
          case "Category":
            dispatch(handleCategoryChange(e.target.value));
            break;
          case "Amount":
            dispatch(handleAmountChange(e.target.value));
            break;
          default:
            return;
        }
    }

  function handleOnClick(name, id) {
    if (!selection.some((current) => current.id === name.id)) {
      setSelection([name]);
    }
  }

  return (
    <div className="container">
      <div className="dd-wrapper">
        <div
          tabIndex={0}
          className="dd-header"
          role="button"
          onKeyPress={() => toggle(!open)}
          onClick={() => toggle(!open)}
        >
          <div className="dd-header_title">
            <p className="dd-header_title--bold">{label}</p>
          </div>
          <div className="dd-header_action">
            <p>{open ? "ᐱ" : "ᐯ"}</p>
          </div>
        </div>
        {open && (
          <div className="dd-list">
            {options?.map(({id, name}) => (
                 <button value={id} key={id} onClick={() => handleOnClick(name)}>
                    {name}
                 </button>
             ))} 
          </div>
        )}
      </div>
    </div>
  );
}

export default Dropdown;