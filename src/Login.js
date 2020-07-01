import React,{useState, useContext} from "react";
import Web3 from "web3";
import { withStyles,Button, TextField,Divider,Typography } from "@material-ui/core";
import { ScreenContext } from "./contexts/ScreenContext";
const web3 = new Web3(process.env.REACT_APP_INFURA_URL);
const styles = {
	form: {
		minHeight: "100%",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		padding: "1rem",
		// margin : "auto 0",
		flex: "1",
		justifyContent: "center",
		width: "100%",
	},
	textField: {
		width: "80%",
	},
	createButton: {
		marginTop: "2rem",
		height: "4.5rem",
	},
	divider: {
		width: "85%",
	},
	title: {
		margin: "1rem",
	},
};

function Login(props) {
	const {setScreen} = useContext(ScreenContext);
    const [pass,setPass] = useState("");
	const {classes} = props;
	const loadWallet = (pass) => {
		var wallet = web3.eth.accounts.wallet;
		try {
			wallet.load(pass,"ethWallet");
			setScreen('userHome');
		} catch (e) {
			console.log(e);
			//Here show error in the TextField and design it properly
		}
	} 
    return (
		<>
			<Typography variant='h4' className={classes.title}>
				Login
			</Typography>
			<Divider className={classes.divider} />
			<form
				color='primary'
				margin='normal'
				// fullWidth={true}
				className={classes.form}
			>
				<TextField
					autoFocus={true}
					className={classes.textField}
					margin='normal'
					label='Password'
					value={pass}
					onChange={(e) => setPass(e.target.value)}
				/>
				<Button
					variant='contained'
					color='primary'
					onClick={() => loadWallet(pass)}
                    className={classes.createButton}
                    fullWidth={true}
				>
					Load Wallet
				</Button>
			</form>
		</>
	);
}

export default withStyles(styles)(Login);
