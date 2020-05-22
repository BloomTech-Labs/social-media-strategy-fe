import { createMuiTheme } from "@material-ui/core";

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
          small: '45px',
          normal: '64px'
       }
    }
 });

 export default theme;