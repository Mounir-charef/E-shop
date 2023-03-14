import { AppBar } from '@mui/material';
import {styled } from '@mui/system';

const NavBar = styled(AppBar)(({ theme }) => ({
    borderBottom: `1px solid ${theme.palette.divider}`,
}));

export default NavBar