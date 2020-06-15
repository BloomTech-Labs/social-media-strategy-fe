import React from "react";
// material-ui
import { makeStyles, Typography } from "@material-ui/core";

import Kanban from "../kanban/Kanban";
import Scrollbars from "react-custom-scrollbars";

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.background.secondary,
		position: "relative",
		overflow: "hidden",
		height: "100vh",
		width: "100%",
	},
	topContainer: {
		height: theme.kanban.topContainer.height,
		display: "flex",
	},
	header: {
		margin: theme.spacing(2),
		width: "100%",
		textAlign: "center",
	},
	scrollbarContainer: {
		height: `calc(100vh - ${theme.kanban.topContainer.height})`,
	},
}));

const Home = () => {
	const { root, header, scrollbarContainer, topContainer } = useStyles();

	return (
		<div className={root}>
			<div className={topContainer}>
				<Typography variant="h4" className={header}>
					Media Manager
				</Typography>
			</div>
			<div className={scrollbarContainer}>
				<Scrollbars
					renderTrackHorizontal={({ style, ...props }) => (
						<div
							{...props}
							style={{
								...style,
								width: "100%",
								height: "9px",
								position: "absolute",
								bottom: "0",
								borderRadius: "15px",
								marginBottom: "3px",
							}}
						/>
					)}
				>
					<Kanban />
				</Scrollbars>
			</div>
		</div>
	);
};

export default Home;
