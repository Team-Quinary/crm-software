import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';



import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function Navbar() {
  

  return (
    <>
      <AppBar position='static' >
        <Stack direction="row" >
          <Toolbar>

            <IconButton size='large' edge='start' color='inherit' aria-label='app logo'>
              <CatchingPokemonIcon />
            </IconButton>

            <Typography variant='h6' component='div' aria-label='app-title' sx={{ flexGrow: 1 }}>
              QUIZZ
            </Typography>

           
          </Toolbar>

          <Toolbar sx={{ marginLeft: "auto" }}>
            <Avatar 
              // src={user}
              // id="avatar"
              // alt="user"
              
              sx={{width:35, height:35}}
              // onClick={handleClick}
              // aria-control={open ? 'avatar-menu' : undefined}
              // aria-haspopup='true'
              // aria-expanded={open ? 'true' : undefined}
              />
                
          </Toolbar>

        </Stack>
        

        
      </AppBar>
    </>
  );
}


