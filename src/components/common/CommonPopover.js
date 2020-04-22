import React, { useState } from 'react';
import {
  Button,
  Popover,
} from '@material-ui/core';

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
        >
        {React.cloneElement(body, {
            ...otherProps
        })}
      </Popover>
    </>
  );
};

export default CommonPopover;
