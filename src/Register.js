import React,{useState} from 'react';
import Web3 from "web3";
import { withStyles,Button, TextField,Divider,Typography } from "@material-ui/core";
// import {url} from './config/constants';
var web3 = new Web3(process.env.REACT_APP_INFURA_URL);
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
function PasswordComponent(props) {
    window.web3 = web3; //TODO : REMOVE IT IN Production
    const [pass,setPass] = useState("");
    const createWallet = (pass) => {
        console.log("Password is " + pass);
        var wallet = web3.eth.accounts.wallet;
        wallet.create(1);
        console.log(wallet)
        wallet.save("ethWallet");
    }
    const {classes} = props;
    return (
		<>
			<Typography variant='h4' className={classes.title}>
				Register
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
					onClick={() => createWallet(pass)}
                    className={classes.createButton}
                    fullWidth={true}
				>
					Create Wallet
				</Button>
			</form>
		</>
	);
}
export default withStyles(styles)(PasswordComponent);
