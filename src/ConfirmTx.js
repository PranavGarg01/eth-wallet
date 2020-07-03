import React, { useContext, useState,useEffect } from "react";
import { ScreenContext } from "./contexts/ScreenContext";
import {
	Divider,
	withStyles,
	Typography,
	Button,
	TextField,
} from "@material-ui/core";
import axios from 'axios';
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
		// marginTop: "0.1rem",
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
		alignItems: "flex-start",
		padding: "2rem",
		flexGrow: "0.2",
		backgroundColor: "rgba(229,228,228,0.3)",
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
		justifyContent: "flex-start",
		alignItems: "center",
		padding: "5%",
	},
	btnText: {
		border: "1px solid grey",
		borderRadius: "4px",
		lineHeight: "inherit",
		padding: "0.1rem 0.4rem",
		fontWeight: "lighter",
	},
	ethIcon: {
		fontSize: "1.7rem",
		verticalAlign: "baseline",
		color : "black",
		marginRight : ".5rem"
	},
	amt: {
		fontSize: "2.25rem",
		verticalAlign: "baseline",
	},
	gasFee: {
		display: "flex",
		width: "100%",
		justifyContent: "space-between",
		margin: "5% 0",
		color: "#5d5d5d",
		textTransform: "uppercase",
		fontSize: "0.75rem",
		fontWeight: "500",
	},
	label : {
		margin : "auto 0"
	}
};
function ConfirmTx(props) {
	const { setScreen, web3, setWeb3 } = useContext(ScreenContext);
	const { classes, newTx } = props;
	const [gasPrice,setGasPrice] = useState(0);
	useEffect(() => {
		axios.get(
			'https://ethgasstation.info/api/ethgasAPI.json'
		).then(function (response) {
			console.log(response.data);
			var gas = parseInt(response.data.average);
			gas = gas/10;
			console.log(gas);
			gas = gas * 21;
			gas = gas/1000000;
			console.log(gas);
			setGasPrice(gas);
		  });
	}, [newTx])
	const confirmTx = ()=> {
		console.log('doing tx');
		var gas;
		gas = gasPrice * 1000000;
		gas = gas/21;
		console.log(gas);
		var gasWei = String(gas) + "000000000";
		web3.eth.sendTransaction({
			from : web3.eth.accounts.wallet[0].address,
			to : newTx.addr,
			value : web3.utils.toWei(String(newTx.val)),
			gas : 21000,
			gasPrice : gasWei
		})
		.on('transactionHash', function(hash){
			console.log(hash);
			setScreen('userHome')
		})
	}
	return (
		<div className={classes.box}>
			<div className={classes.account}>
				<Typography variant='overline' className={classes.btnText}>
					Send Ether
				</Typography>

				<Typography variant='body2' className={classes.amt}>
					<FontAwesomeIcon
						icon={faEthereum}
						className={classes.ethIcon}
					/>{" "}
					{newTx.val}
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
					<div className={classes.gasFee}>
						<Typography variant='button' className={classes.label}>
							Gas Fee
						</Typography>
						<div className={classes.amt}>
							<FontAwesomeIcon
								icon={faEthereum}
								className={classes.ethIcon}
							/>
							{( parseFloat(gasPrice))}
						</div>
					</div>
					<Divider
						className={classes.divider}
					/>
					<div className={classes.gasFee}>
						<Typography variant='button' className={classes.label}>
							Total
						</Typography>
						<div className={classes.amt}>
							<FontAwesomeIcon
								icon={faEthereum}
								className={classes.ethIcon}
							/>
							{parseFloat((gasPrice+ newTx.val).toFixed(10))}
						</div>
					</div>
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
						REJECT
					</Button>
					<Button
						// disabled={pass === "" ? true : false}
						variant='outlined'
						color='primary'
						// type='submit'
						size='large'
						className={classes.btns}
						onClick={confirmTx}
					>
						CONFIRM
					</Button>
				</div>
			</form>
		</div>
	);
}

export default withStyles(styles)(ConfirmTx);
