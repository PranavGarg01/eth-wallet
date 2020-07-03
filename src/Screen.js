import React, { useContext,useState } from 'react';
import {Container,CssBaseline,withStyles} from '@material-ui/core'
import AuthScreen from './AuthScreen';
import Register from "./Register";
import Login from "./Login";
import { ScreenContext } from './contexts/ScreenContext';
import UserHomeScreen from './UserHomeScreen';
import NewTx from './NewTx';
import ConfirmTx from './ConfirmTx'
const styles = {
	box: {
		maxWidth: "370px",
		padding: "0",
		minHeight : "80vh",
		maxHeight: "85vh",
		textAlign: "center",
		boxShadow: "3px 2px 12px -4px rgba(0,0,0,0.75)",
		display: "flex",
		flexDirection : "column",
		backgroundColor : "white",
		alignItems : "center",
		flex : "1",
		overflowY : "scroll",
		"&::-webkit-scrollbar" : {
			display: "none",
		},
	},
	
};
function Screen(props) {
	const getScreen= (val)=>  {
		switch (val) {
			case "auth":
				return <AuthScreen />;
			case "register":
				return <Register />;
			case "login":
				return <Login />;
			case "userHome":
				return <UserHomeScreen />;
			case 'newTx':
				return <NewTx createTx={createTx}/>;
			case 'confirmTx':
				return <ConfirmTx newTx={newTx}/>;
			default:
				console.log("error");
				break;
		}
	}
	const {screen,web3} = useContext(ScreenContext);
	const [newTx,setNewTx] = useState({
		addr: '',
		val: 0
	});
	const {classes} = props;
	const createTx = (addr, val) => {
		console.log(addr + " " + val);
		setNewTx({
			addr:addr,
			val: val
		})
	};
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

export default withStyles(styles)(Screen)
