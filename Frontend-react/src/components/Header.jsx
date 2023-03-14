import {Toolbar, Typography, CssBaseline} from "@mui/material";
import NavBar from "./NavBar.jsx";

const Header = () => {
    return (
        <>
            <CssBaseline/>
            <NavBar
                position="static"
                color="default"
                elevation={0}
            >
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>
                        Blog Me
                    </Typography>
                </Toolbar>
            </NavBar>
        </>
    );
};

export default Header;
