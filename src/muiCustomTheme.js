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
         default: '#FFFFFF',
         secondary: '#F6F6F6'
       }
    },
    navbar: {
       height: {
          small: Navbar.height.small,
          normal: Navbar.height.normal
       }
    },
    kanban: {
      topContainer: {
         height: '75px'
      },
      list: {
         header: {
            height: '50px'
         }
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
         h1: { fontWeight: '600', fontFamily: 'Roboto Condensed' },
         h2: { fontWeight: '600', fontFamily: 'Roboto Condensed' },
         h3: { fontWeight: '600', fontFamily: 'Roboto Condensed' },
         h4: { fontWeight: '600', fontFamily: 'Roboto Condensed' },
         h5: { fontWeight: '600', fontFamily: 'Roboto Condensed' },
         h6: { fontWeight: '600', fontFamily: 'Roboto Condensed' }
      }
    }
 });

 export default theme;