import { createMuiTheme } from "@material-ui/core";

const Navbar = {
	width: {
		open: "225px",
		close: "60px",
	},
	// for small screens
	height: "55px",
};

const defaultTheme = createMuiTheme();

const theme = createMuiTheme({
	palette: {
		primary: {
			main: "#2196F3",
			light: "#a4caea",
			dark: "#0e64aa",
		},
		secondary: {
			main: "#E10050",
		},
		background: {
			default: "#FFFFFF",
			secondary: "#F6F6F6",
		},
	},
	navbar: {
		width: {
			open: Navbar.width.open,
			close: Navbar.width.close,
		},
		height: Navbar.height,
	},
	kanban: {
		topContainer: {
			height: "75px",
		},
		list: {
			header: {
				height: "70px",
			},
		},
	},
	overrides: {
		MuiDrawer: {
			paper: {
				top: 0,
				overflowX: "hidden",
				[defaultTheme.breakpoints.down("xs")]: {
					top: Navbar.height,
				},
			},
			modal: {
				zIndex: "1000 !important",
			},
		},
		MuiAppBar: {
			root: {
				boxShadow:
					"0px 0px 1px -1px rgba(0,0,0,0.2), 0px 0px 1px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12) !important",
			},
		},
		MuiButton: {
			root: {
				textTransform: "none",
				fontWeight: "600",
				minWidth: Navbar.width.close,
			},
		},
		MuiTypography: {
			h1: { fontWeight: "600", fontFamily: "Roboto Condensed", color: "#4E4E4E" },
			h2: { fontWeight: "600", fontFamily: "Roboto Condensed", color: "#4E4E4E" },
			h3: { fontWeight: "600", fontFamily: "Roboto Condensed", color: "#4E4E4E" },
			h4: { fontWeight: "600", fontFamily: "Roboto Condensed", color: "#4E4E4E" },
			h5: { fontWeight: "600", fontFamily: "Roboto Condensed", color: "#4E4E4E" },
			h6: { fontWeight: "600", fontFamily: "Roboto Condensed", color: "#4E4E4E" },
		},
	},
});

export default theme;
