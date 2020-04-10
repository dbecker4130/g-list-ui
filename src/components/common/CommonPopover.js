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
    <div>
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
    </div>
  );
};

export default CommonPopover;
