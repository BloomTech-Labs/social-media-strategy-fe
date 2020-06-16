import React, { Fragment } from "react";
import Stats from "../analytics/Stats";
import PopularWords from "../analytics/PopularWords";

const Analytics = () => {
	return (
		<Fragment>
			<div style={{ display: "flex", justifyContent: "center" }}>
				<h1
					style={{
						fontFamily: "Roboto Condensed",
						color: "#4E4E4E",
						fontSize: "30pt",
					}}
				>
					Analytics
				</h1>
			</div>
			<Stats />
			<PopularWords />
		</Fragment>
	);
};

export default React.memo(Analytics);
