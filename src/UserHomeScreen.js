import React, { useContext,useEffect,useState } from 'react';
import axios from 'axios';
import {Divider,withStyles, Typography, Button} from '@material-ui/core';
import { ScreenContext } from './contexts/ScreenContext';
import Txns from './Txns';
// let web3 = new Web3(process.env.REACT_APP_INFURA_URL);
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
	ethLogo: {
		border: "0.5px solid grey",
		margin: "1rem",
		borderRadius: "100%",
		width: "20%",
	},
	divider: {
		// border : "2px ",
		width: "100%",
		margin: "0.1rem 0",
	},
	account: {
		width: "100%",
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-start",
	},
	balance: {
		display: "flex",
		flexDirection: "column",
		width: "100%",
		alignItems: "center",
		padding: "1rem",
	},
	address: {
		color: "grey",
	},
	btnContainer: {
		margin: "1rem",
		display: "flex",
		flexDirection: "row",
		width: "70%",
		// margin: "0 30%",
		justifyContent: "space-around",
	},
	btns: {
		width: "40%",
	},
	txText: {
		display : "flex",
		justifyContent : "flex-start",
		paddingLeft : "1rem",	
		width: "100%",
		color: "grey",
	},
};
function UserHomeScreen(props) {
    const {web3,setWeb3} = useContext(ScreenContext);
	const [balance,setBalance] = useState(0);
	const [tx,setTx] = useState({txns : [],isFetching : false});
    const {classes} = props;
	window.web3 = web3;
	
    useEffect(() => {
		const address = web3.eth.accounts.wallet[0].address;
		console.log("mounted")
        web3.eth.getBalance(address).then((x)=>setBalance(web3.utils.fromWei(x)))
		axios.get(
			`http://api-ropsten.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=${process.env.REACT_APP_ETHERSCAN_API_KEY}`
		).then(function (response) {
			setTx({txns : tx.txns, isFetching : true})
			console.log(response)
			setTx({txns : response.data.result, isFetching : false})
		  });
	}, [])
	
    return (
		<>
			<div
				className={classes.box}
				style={{ justifyContent: "space-between" }}
			>
				<div className={classes.account}>
					<Typography variant='h6'>Account Details</Typography>

					<Typography variant='body2' className={classes.address}>
						{web3.eth.accounts.wallet[0].address.substring(0, 6) +
							"..." +
							web3.eth.accounts.wallet[0].address.substr(-4)}
					</Typography>
					<Divider className={classes.divider} />
				</div>
				<div className={classes.balance}>
					<img
						src={require("./eth_logo.svg")}
						alt=''
						className={classes.ethLogo}
					/>
					<Typography variant='h5'>{balance} ETH</Typography>
					<div className={classes.btnContainer}>
						<Button
							color='primary'
							size='large'
							variant='outlined'
							className={classes.btns}
						>
							Deposit
						</Button>
						<Button
							color='primary'
							size='large'
							variant='outlined'
							className={classes.btns}
						>
							Send
						</Button>
					</div>
				</div>
				<div className={classes.txText}>
					<Typography variant='caption'>Transactions</Typography>
				</div>
			</div>
			<Divider className={classes.divider} />
			<div className={classes.box}>
				{/* Transactions */}
				{!tx.isFetching ? tx.txns.map(
					(t) => 
					<Txns key={t.hash}tx={t} />
					) : ""}
			</div>
		</>
	);
}

export default withStyles(styles)(UserHomeScreen)
