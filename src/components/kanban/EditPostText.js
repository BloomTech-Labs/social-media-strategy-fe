import React from "react";
import TwitterCharCount from "./TwitterCharCount";
import { InputBase, IconButton, makeStyles } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";

const useStyles = makeStyles((theme) => ({
	form: {
		padding: "2px 0",
		display: "flex",
		alignItems: "flex-start",
		justifyContent: "space-between",
		borderRadius: theme.shape.borderRadius,
		width: "100%",
		height: "max-content",
		backgroundColor: "#fff",
	},
	secondColumn: {
		display: "flex",
		height: "100%",
		flexDirection: "column",
		justifyContent: "space-between",
		alignItems: "center",
	},
	iconButton: {
		padding: 10,
	},
}));

const EditPostText = (props) => {
	const { text, handleInputText, submit } = props;

	const { form, iconButton, secondColumn } = useStyles();

	const handleBlur = (e) => {
		submit(e);
	};

	return (
		<>
			<form onSubmit={submit} className={form} style={{ width: "100%" }}>
				<InputBase
					autoFocus
					onFocus={(e) => e.target.select()}
					onBlur={handleBlur}
					onChange={handleInputText}
					onKeyDown={handleInputText}
					id="standard-error-helper-text"
					defaultValue={text}
					multiline
					fullWidth
					inputProps={{
						"aria-label": "edit post",
						maxLength: 280,
					}}
				/>
				<div className={secondColumn}>
					<IconButton
						type="submit"
						className={iconButton}
						aria-label="confirm edit"
					>
						<CheckIcon />
					</IconButton>
					<TwitterCharCount text={text} />
				</div>
			</form>
		</>
	);
};

export default React.memo(EditPostText);
