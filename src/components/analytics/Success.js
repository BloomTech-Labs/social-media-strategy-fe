import React from "react";
import { useSelector } from "react-redux";

import { Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Scrollbars from "react-custom-scrollbars";

const useStyles = makeStyles({
	root: {
		width: 700,
		height: 350,
		margin: "1%",
		marginTop: "0!important",
		display: "flex",
		justifyContent: "space-between",
	},
	title: {
		fontSize: 40,
		fontFamily: "Roboto Condensed",
		fontWeight: "Bold",
		lineHeight: "100%",
	},
});

export default function Success() {
	const classes = useStyles();
	const popWords = useSelector((state) => state.popWords.topics);
	const colors = ["blue", "green", "red", "purple", "black"];

	return (
		popWords.length > 0 && (
			<div style={{ display: "flex", justifyContent: "center" }}>
				<Card
					className={classes.root}
					style={{ maxHeight: 300, overflowY: "auto" }}
				>
					<Scrollbars>
						<div style={{ padding: "0 5%" }}>
							<CardContent>
								<Typography
									className={classes.title}
									style={{ color: "#00BB78" }}
								>
									Success!
								</Typography>
								<Typography
									style={{
										color: "#4E4E4E",
										fontSize: "14!important",
										fontWeight: "bolder",
									}}
								>
									Here are the most popular words your followers are engaging
									with
								</Typography>
								<Typography
									style={{ color: "#4E4E4E", fontSize: "12!important" }}
								>
									Grouped by topic
								</Typography>
								<Typography>{console.log("testing", popWords)}</Typography>
							</CardContent>
							<div style={{ display: "flex", justifyContent: "space-between" }}>
								{popWords.map((topic, topicIndex) => (
									<CardContent key={topicIndex}>
										{topic.map((word, index) => (
											<Typography
												style={{ color: colors[topicIndex] }}
												key={index}
											>
												{" "}
												{word}{" "}
											</Typography>
										))}
									</CardContent>
								))}
							</div>
						</div>
					</Scrollbars>
				</Card>
			</div>
		)
	);
}
