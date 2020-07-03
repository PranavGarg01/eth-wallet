import React,{useContext} from 'react'
import { withStyles, Divider, Typography } from "@material-ui/core";
import { ScreenContext } from './contexts/ScreenContext';
import CallReceivedRoundedIcon from '@material-ui/icons/CallReceivedRounded';
import CallMadeRoundedIcon from '@material-ui/icons/CallMadeRounded';
const styles = {
	tx: {
		width: "100%",
		// height: "20%",
		padding: "0.5rem",
		display: "flex",
        justifyContent: "space-between",
        cursor : "pointer",
        '&:hover' : {
            backgroundColor : "rgba(229,228,228,0.3)"
        }
	},
	divider: {
		width: "100%",
		// margin: "0.1rem 0",
	},
	iconRight: {
		display: "flex",
		flexDirection: "column",
	},
	op: {
        display : "flex",
        flexDirection : "row",

    },
    confirmed : {
        color : "green",
        borderRadius : "7px",
        padding : "0 0.5rem",
        backgroundColor : "rgba(0,255,0,0.1)",
        fontSize : "0.6rem",
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        lineHeight: "1.75",
        letterSpacing: "0.02857em",
        textTransform : "uppercase"
    },
    pending : {
        color : "red",
        borderRadius : "7px",
        padding : "0 0.5rem",
        backgroundColor : "rgba(255,0,0,0.1)",
        fontSize : "0.6rem",
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        lineHeight: "1.75",
        letterSpacing: "0.02857em",
        textTransfrom : "uppercase"
    },
    icon: {
        height : "100%",
        fontSize : "2rem"
    },
    bal: {
        margin : "auto 0"
    }
};

function Txns(props) {
    const {web3,setWeb3} = useContext(ScreenContext);
    const {tx,classes} = props;
    const op =
		tx.from === web3.eth.accounts.wallet[0].address ? (
			<>
				<CallMadeRoundedIcon className={classes.icon} />{" "}
				<div className={classes.iconRight}>
					<div>Sent</div>{" "}
					{tx.confirmations > 1 ? (
						<div className={classes.confirmed}>Confirmed</div>
					) : (
						<div className={classes.pending}>Pending</div>
					)}
				</div>
			</>
		) : (
			<>
				<CallReceivedRoundedIcon className={classes.icon} />{" "}
				<div className={classes.iconRight}>
					<Typography variant="subtitle1">Deposit</Typography>{" "}
					<div>
						{tx.confirmations > 1 ? (
							<div className={classes.confirmed}>Confirmed</div>
						) : (
							<div className={classes.pending}>Pending</div>
						)}
					</div>
				</div>
			</>
        );
    const openEtherscan = ()=> {
        var redirectWindow = window.open(`https://ropsten.etherscan.io/tx/${tx.hash}`, '_blank');
        redirectWindow.focus();
    }
    return (
		<>
			<div className={classes.tx} onClick={openEtherscan}>
				<div className={classes.op}>{op}</div>
				<Typography variant='subtitle1' className={classes.bal}>
					{web3.utils.fromWei(tx.value)} ETH
				</Typography>
			</div>
			<Divider className={classes.divider} />
		</>
	);
}

export default withStyles(styles)(Txns)
