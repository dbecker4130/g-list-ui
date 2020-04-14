import React, { useState } from 'react';
import {
  Button,
  Popover,
} from '@material-ui/core';

// ::: Example Usage :::
{/* <CommonPopover
  buttonText="Add Item +"
  btnStyle={{ marginLeft: '1%', marginBottom: '2%' }}
  body={
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <TextField
        autoFocus
        size="small"
        variant="outlined"
      />
      <Button
        type="submit"
      >
        submit
      </Button>
    </form>
  }
/> */}

const CommonPopover = ({
  btnStyle,
  buttonText,
  icon,
  body,
  ...otherProps
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const openPopover = e => {
    setAnchorEl(e.currentTarget);
  }

  const closePopover = () => {
    setAnchorEl(null);
  }
  return (
    <>
      <Button onClick={openPopover} style={btnStyle}>
        {buttonText}
        {icon && React.cloneElement(icon)}
      </Button>
      <Popover
        // id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={closePopover}
        // anchorOrigin={{
        //     vertical: 'top',
        //     horizontal: 'right',
        // }}
        // transformOrigin={{
        //     vertical: 'top',
        //     horizontal: 'left',
        // }}
        >
        {React.cloneElement(body, {
            ...otherProps
        })}
      </Popover>
    </>
  );
};

export default CommonPopover;
