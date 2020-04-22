import React, { useState } from 'react';
import {
  Button,
  TextField,
  ThemeProvider,
  createMuiTheme,
  withStyles,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    padding: '1%'
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

const StyledTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: '#c2d6d6',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'red',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#3C3C3C',
      },
      '&:hover fieldset': {
        borderColor: '#000',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#c2d6d6',
      },
    },
  },
})(TextField);

const CommonInput = ({
  btnStyle,
  error,
  label,
  onChange,
  value
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  // const theme = createMuiTheme({
  //   palette: {
  //     primary: '#c2d6d6'
  //   },
  // });

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <StyledTextField
        className={classes.margin}
        id="mui-theme-provider-outlined-input"
        size='small'
        // color="primary"
        autoFocus
        error={error}
        label={label}
        variant="outlined"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default CommonInput;
