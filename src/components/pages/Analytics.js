import React from "react";
import Stats from "../analytics/Stats";
import PopularWords from "../analytics/PopularWords";
import Scrollbars from "react-custom-scrollbars";

const Analytics = () => {
	return (
		<Scrollbars>
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
		</Scrollbars>
	);
};

export default React.memo(Analytics);
