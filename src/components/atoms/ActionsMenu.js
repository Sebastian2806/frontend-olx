import React from 'react';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const ActionsMenu = ({ ariaContols, ariaLabel, deleteAnnoucement }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label={ariaLabel ? ariaLabel : 'akcje'}
        aria-controls={ariaContols ? ariaContols : 'actions'}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id={ariaContols ? ariaContols : 'actions'}
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={deleteAnnoucement}>Usuń</MenuItem>
        {/* <MenuItem>Edytuj</MenuItem> */}
      </Menu>
    </div>
  );
};

export default ActionsMenu;
