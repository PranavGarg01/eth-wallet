import React, { useContext } from 'react';
import {Container,CssBaseline,withStyles} from '@material-ui/core'
import HomeScreen from './HomeScreen';
import Register from "./Register";
import { ScreenContext } from './contexts/ScreenContext';
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
    const {screen} = useContext(ScreenContext)
    const {classes} = props;
    var newScreen = getScreen(screen);
    return (
		<>
			<CssBaseline />
			<Container className={classes.box}>
				{newScreen}
			</Container>
		</>
	);
}
function getScreen(val) {
    switch (val) {
		case "home":
			return <HomeScreen />;
		case "register":
            return <Register />
		default:
            console.log("error")
            break;
	}
}
export default withStyles(styles)(Screen)
