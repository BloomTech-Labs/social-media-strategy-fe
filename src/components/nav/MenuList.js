import React from "react";
import { useOktaAuth } from "@okta/okta-react/dist/OktaContext";
import { useLocation, useHistory } from "react-router";
import {
	makeStyles,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Button,
	Hidden,
} from "@material-ui/core";
// Componets
import CreatePost from "./CreatePost";
// Icons
import DashboardIcon from "@material-ui/icons/Dashboard";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import TrendingUpIcon from "@material-ui/icons/TrendingUp";
// Img
import logo from "../../assets/imgs/Logo-dark.svg";

const useStyles = makeStyles((theme) => ({
	icon: {
		color: theme.palette.primary.light,
	},
	selectedIcon: {
		color: theme.palette.primary.dark,
	},
	logoButton: {
		paddingTop: theme.spacing(2),
		paddingBottom: theme.spacing(2),
		display: "flex",
		justifyContent: "center",
		maxWidth: "100%",
	},
	logo: {
		maxWidth: "50px",
	},
}));

const MenuList = () => {
	const classes = useStyles();
	const location = useLocation();
	const { push } = useHistory();
	const { authService } = useOktaAuth();

	const logout = async () => {
		await authService.logout("/");
	};

	return (
		<>
			<Hidden xsDown>
				<Button className={classes.logoButton} onClick={() => push("/home")}>
					<img className={classes.logo} src={logo} alt="SoMe logo" />
				</Button>
			</Hidden>
			<CreatePost />
			<List aria-label="Menu">
				<ListItem button onClick={() => push("/home")}>
					<ListItemIcon>
						<DashboardIcon
							className={
								location.pathname.includes("/home")
									? classes.selectedIcon
									: classes.icon
							}
						/>
					</ListItemIcon>
					<ListItemText primary="Media Manager" />
				</ListItem>
				<ListItem button onClick={() => push("/analytics")}>
					<ListItemIcon>
						<TrendingUpIcon
							className={
								location.pathname.includes("/analytics")
									? classes.selectedIcon
									: classes.icon
							}
						/>
					</ListItemIcon>
					<ListItemText primary="Analytics" />
				</ListItem>
				<ListItem button onClick={() => push("/connect/twitter")}>
					<ListItemIcon>
						<AccountBoxIcon
							className={
								location.pathname.includes("/connect")
									? classes.selectedIcon
									: classes.icon
							}
						/>
					</ListItemIcon>
					<ListItemText primary="Accounts" />
				</ListItem>
			</List>
			<List>
				<ListItem button onClick={logout}>
					<ListItemIcon>
						<ExitToAppIcon color="primary" />
					</ListItemIcon>
					<ListItemText primary="Logout" />
				</ListItem>
			</List>
		</>
	);
};

export default React.memo(MenuList);
