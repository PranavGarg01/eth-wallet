import React, { useContext, useState } from "react";
import { ScreenContext } from "./contexts/ScreenContext";
import {
	Divider,
	withStyles,
	Typography,
	Button,
	TextField,
} from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEthereum } from "@fortawesome/free-brands-svg-icons";

const styles = {
	box: {
		// minHeight: "50%",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		// padding: "1rem",
		// margin : "auto 0",
		flex: "1",
		// justifyContent: "center",
		width: "100%",
	},
	divider: {
		// border : "2px ",
		width: "100%",
		marginTop: "0.1rem",
	},
	form: {
		// minHeight: "100%",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		// padding: "1rem",
		// margin : "auto 0",
		flex: "1",
		justifyContent: "space-between",
		width: "100%",
	},
	btns: {
		height: "4rem",
		width: "40%",
		margin: "5% 5%",
		borderWidth: "2px",
		borderRadius: "7px",
	},

	account: {
		width: "100%",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems : "flex-start",
		padding:"2rem",
		flexGrow : "0.2",
		backgroundColor : "rgba(229,228,228,0.3)"
	},
	btnsContainer: {
		marginTop: "1rem",
		width: "100%",
		// display: "flex",
		// justifyContent: "space-around",
	},
	inputs: {
		width: "100%",
		display: "flex",
		flexDirection: "column",
		flex: "1",
		justifyContent: "center",
		alignItems: "center",
	},
};
function ConfirmTx(props) {
	const { setScreen, web3, setWeb3 } = useContext(ScreenContext);
	const { classes, newTx } = props;

	return (
		<div className={classes.box}>
			<div className={classes.account}>
				<Typography variant='h6'>Send ETH</Typography>

				<Typography variant='body2' className={classes.address}>
					{web3.eth.accounts.wallet[0].address.substring(0, 6) +
						"..." +
						web3.eth.accounts.wallet[0].address.substr(-4)}
				</Typography>
				
			</div>
			<form
				color='primary'
				margin='normal'
				className={classes.form}
				// onSubmit={handleForm}
			>
				<Divider className={classes.divider} />
				<div className={classes.inputs}>
					Here goes the gas values
				</div>
				<div className={classes.btnsContainer}>
					<Divider className={classes.divider} />
					<Button
						// disabled={pass === "" ? true : false}
						variant='outlined'
						color='secondary'
						// type='submit'
						size='large'
						className={classes.btns}
						onClick={() => setScreen("userHome")}
						// fullWidth={true}
					>
						CANCEL
					</Button>
					<Button
						// disabled={pass === "" ? true : false}
						variant='outlined'
						color='primary'
						type='submit'
						size='large'
						className={classes.btns}
						// onClick={()=>setScreen('confirmTx')}
					>
						NEXT
					</Button>
				</div>
			</form>
		</div>
	);
}

export default withStyles(styles)(ConfirmTx);
