import React from 'react';
import {Container,CssBaseline,withStyles,Divider, Typography} from '@material-ui/core'
import HomeScreen from './HomeScreen';
import Register from "./Register";
const styles = {
	box: {
		maxWidth: "370px",
		padding: "1rem",
		minHeight: "70vh",
		textAlign: "center",
		boxShadow: "3px 2px 12px -4px rgba(0,0,0,0.75)",
		display: "flex",
		flexDirection : "column",
		backgroundColor : "white",
		alignItems : "center"
	},
	
};
function Screen(props) {
    const {classes} = props;
    return (
		<>
			<CssBaseline />
			<Container className={classes.box}>
				<HomeScreen />
			</Container>
		</>
	);
}

export default withStyles(styles)(Screen)
