import React,{useContext} from "react";
// import {ScreenContext} from './App'
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
		width: "85%",
	},
	btns: {
		width: "70%",
		margin: "15% 0",
	},
};
function HomeScreen(props) {
    // const {screen,setScreen} = useContext(ScreenContext);
    // console.log(x)
	const { classes } = props;
	return (
		<div className={classes.home}>
			<Button
				size='large'
				className={classes.btns}
				variant='outlined'
				color='primary'
			>
				LOGIN
			</Button>
			<Divider className={classes.divider} />
			<Button
				size='large'
				className={classes.btns}
				variant='outlined'
				color='secondary'
				// onClick={() => setScreen('register')}
			>
				REGISTER
			</Button>
		</div>
	);
}

export default withStyles(styles)(HomeScreen);