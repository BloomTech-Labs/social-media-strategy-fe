import React from "react";

const TwitterCharCount = ({ text }) => {
	const maxCharCount = 280;
	return (
		<div
			style={{
				color:
					maxCharCount - text.length < 80
						? "red"
						: maxCharCount - text.length < 180 && "orange",
				textAlign: "right",
			}}
		>
			{maxCharCount - text.length}
		</div>
	);
};

export default TwitterCharCount;
