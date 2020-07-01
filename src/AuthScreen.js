import React,{useContext} from "react";
import { ScreenContext } from "./contexts/ScreenContext";
import { withStyles, Divider, Button } from "@material-ui/core";

const styles = {
	home: {
		width: "100%",
		display: "flex",
		alignItems: "center",
		flexDirection: "column",
		justifyContent: "center",
		flex: "1",
	},
	divider: {
        // border : "2px ",
		width: "85%",
	},
	btns: {
        width: "70%",
        height : "4rem",
		margin: "15% 0",
	},
};
function AuthScreen(props) {
    const {setScreen} = useContext(ScreenContext);
	const { classes } = props;
	return (
		<div className={classes.home}>
			<Button
				size='large'
				className={classes.btns}
				variant='outlined'
				color='primary'
				onClick={() => setScreen('login')}
			>
				LOGIN
			</Button>
			<Divider className={classes.divider} />
			<Button
				size='large'
				className={classes.btns}
				variant='outlined'
				color='secondary'
				onClick={() => setScreen('register')}
			>
				REGISTER
			</Button>
		</div>
	);
}

export default withStyles(styles)(AuthScreen);
