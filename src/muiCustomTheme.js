import { createMuiTheme } from "@material-ui/core";

const Navbar = {
   width: {
      open: '225px',
      close: '60px'
   }
}

const theme = createMuiTheme({
    palette: {
       primary: {
          main: '#2196F3',
          light: '#a4caea',
          dark: '#0e64aa'
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
       width: {
          open: Navbar.width.open,
          close: Navbar.width.close
       },
       icons: {
          color: {

          }
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