import React, { useState } from "react";
import TopNav from "./TopNav";
import MenuList from "./MenuList";
import { Drawer, makeStyles, Hidden } from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
	drawer: {
		position: "fixed",
		width: theme.navbar.width.close,
		flexShrink: 0,
		whiteSpace: "nowrap",
		zIndex: 1000,
	},
	drawerOpen: {
		width: theme.navbar.width.open,
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	drawerClose: {
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		width: theme.navbar.width.close,
	},
}));

const NavMenu = () => {
	const [open, setOpen] = useState(false);

	const classes = useStyles();

	const closeDrawer = () => {
		setOpen(false);
	};

	return (
		<>
			<Hidden smUp>
				<TopNav toggleMenu={() => setOpen(!open)} />
				<Drawer
					variant={"temporary"}
					open={open}
					onClose={closeDrawer}
					className={clsx(classes.drawer, {
						[classes.drawerOpen]: true,
						[classes.drawerClose]: false,
					})}
					classes={{
						paper: clsx({
							[classes.drawerOpen]: true,
							[classes.drawerClose]: false,
						}),
					}}
				>
					<MenuList closeDrawer={closeDrawer} />
				</Drawer>
			</Hidden>
			<Hidden xsDown>
				<Drawer
					variant={"permanent"}
					className={clsx(classes.drawer, {
						[classes.drawerOpen]: open,
						[classes.drawerClose]: !open,
					})}
					classes={{
						paper: clsx({
							[classes.drawerOpen]: open,
							[classes.drawerClose]: !open,
						}),
					}}
					onMouseEnter={() => setOpen(true)}
					onMouseLeave={closeDrawer}
				>
					<MenuList />
				</Drawer>
			</Hidden>
		</>
	);
};

export default NavMenu;
