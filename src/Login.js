import React,{useState, useContext} from "react";
// import Web3 from "web3";
import { withStyles,Button, TextField,Divider,Typography } from "@material-ui/core";
import { ScreenContext } from "./contexts/ScreenContext";
// let web3 = new Web3(process.env.REACT_APP_INFURA_URL);
// window.web3 = web3; //TODO : REMOVE IT IN Production
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
		width: "80%", 
	},
	divider: {
		width: "85%",
	},
	title: {
		margin: "1rem",
	},
};

function Login(props) {

	const {setScreen,web3,setWeb3} = useContext(ScreenContext);
	const [pass,setPass] = useState("");
	const [passError,setError] = useState(false);
	const {classes} = props;
	const handleForm = (event) => {
		event.preventDefault();
		var wallet = web3.eth.accounts.wallet;
		try {
			wallet.load(pass,"ethWallet");
			setWeb3(web3)
			console.log(wallet);
			setScreen('userHome');
		} catch (e) {
			console.log(e);
			//Here show error in the TextField and design it properly
			setError(true);
		}
	}
	const passInput = (e) => {
		setError(false);

		setPass(e.target.value);
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
				onSubmit={handleForm}
			>
				<TextField
					autoFocus={true}
					className={classes.textField}
					margin='normal'
					type="password"
					label='Password'
					value={pass}
					error={passError}
					helperText={
						passError ? "Incorrect password for the wallet" : ""
					}
					onChange={passInput}
				/>
				<Button
					disabled={pass === "" ? true : false}
					variant="contained"
					color='primary'
					type="submit"
					
					className={classes.createButton}
					// fullWidth={true}
				>
					Load Wallet
				</Button>
			</form>
		</>
	);
}

export default withStyles(styles)(Login);
