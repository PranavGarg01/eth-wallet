import React, { useContext } from 'react';
import {Container,CssBaseline,withStyles} from '@material-ui/core'
import AuthScreen from './AuthScreen';
import Register from "./Register";
import Login from "./Login";
import { ScreenContext } from './contexts/ScreenContext';
import UserHomeScreen from './UserHomeScreen';
const styles = {
	box: {
		maxWidth: "370px",
		padding: "0",
		minHeight: "80vh",
		textAlign: "center",
		boxShadow: "3px 2px 12px -4px rgba(0,0,0,0.75)",
		display: "flex",
		flexDirection : "column",
		backgroundColor : "white",
		alignItems : "center",
		flex : "1"
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
		case "auth":
			return <AuthScreen />;
		case "register":
			return <Register />;
		case "login":
			return <Login />;
		case "userHome":
			return <UserHomeScreen />;
		default:
			console.log("error");
			break;
	}
}
export default withStyles(styles)(Screen)
