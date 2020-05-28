import { createMuiTheme } from "@material-ui/core";

const Navbar = {
   height: {
      small: '45px',
      normal: '64px'
   }
}

const defaultTheme = createMuiTheme();

const theme = createMuiTheme({
    palette: {
       primary: {
          main: '#2196F3'
       },
       secondary: {
         main: '#E10050'
       },
       background: {
         default: "#FFFFFF"
       }
    },
    navbar: {
       height: {
          small: Navbar.height.small,
          normal: Navbar.height.normal
       }
    },
    overrides: {
       MuiToolbar: {
         regular: {
            minHeight: '0'
         }
      },
      MuiDrawer: {
         paper: {
            top: Navbar.height.normal,
            [defaultTheme.breakpoints.down('xs')]: {
               top: Navbar.height.small
            }
         },
         modal: {
            zIndex: '1000 !important'
         }
      },
      MuiButton: {
         root: {
            textTransform: 'none',
            fontWeight: '600'
         }
      },
      MuiTypography: {
         h1: { fontWeight: '600' },
         h2: { fontWeight: '600' },
         h3: { fontWeight: '600' },
         h4: { fontWeight: '600' },
         h5: { fontWeight: '600' },
         h6: { fontWeight: '600' }
      }
    }
 });

 export default theme;