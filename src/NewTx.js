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
	account: {
		width: "100%",
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-start",
	},
	correct: {
		color: "rgba(0,255,0,0.5)",
	},
	wrong: {
		color: "rgba(255,0,0,0.7)",
	},
	input: {
		width: "80%",
        margin: "1rem 0",
        "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
            "-webkit-appearance": "none",
            margin: '0'
        }
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
	inputs: {
		width: "100%",
		display: "flex",
		flexDirection: "column",
		flex: "1",
		justifyContent: "center",
		alignItems: "center",
	},
	btnsContainer: {
		marginTop: "1rem",
		width: "100%",
		// display: "flex",
		// justifyContent: "space-around",
	},
	btns: {
		height: "4rem",
		width: "40%",
		margin: "5% 5%",
		borderWidth: "2px",
		borderRadius: "7px",
	},
	ethIcon: {
		fontSize: "1.7rem",
	},
};
function NewTx(props) {
    const [addr, setAddr] = useState("");
    const [isfocusAddr,toggleFocus] = useState(true)
    const [amt, setAmt] = useState('0');
	const [err, setErr] = useState(true); // for the tick or the cross
	const { setScreen, web3, setWeb3 } = useContext(ScreenContext);
    const { classes,createTx } = props;
    const handleInput = (e) => {
        (e.target.name === 'addr') ? setAddr(e.target.value) : setAmt(e.target.value);
    };
    const focusOut = ()=> {
        console.log(web3.utils.isAddress(addr));
        web3.utils.isAddress(addr) ? setErr(false) : setErr(true);
        toggleFocus(false);
    }
    const handleForm = (e)=> {
        e.preventDefault();
        if(err) console.log('error')
		// form validation krni hai ethe
		createTx(addr,amt);
		setScreen('confirmTx'); 

    }
	return (
		<div
			className={classes.box}
			// style={{ justifyContent: "space-between" }}
		>
			<div className={classes.account}>
				<Typography variant='h6'>Send ETH</Typography>

				<Typography variant='body2' className={classes.address}>
					{web3.eth.accounts.wallet[0].address.substring(0, 6) +
						"..." +
						web3.eth.accounts.wallet[0].address.substr(-4)}
				</Typography>
				<Divider className={classes.divider} />
			</div>
			<form
				color='primary'
				margin='normal'
				className={classes.form}
				onSubmit={handleForm}
			>
                <div className={classes.inputs}>
				<TextField
					variant='outlined'
					label='Recipient Address'
                    className={classes.input}
                    name='addr'
                    value={addr}
                    onChange={handleInput}
                    onFocus={()=>toggleFocus(true)}
                    onBlur={focusOut}
					InputProps={{
						endAdornment: (
							<InputAdornment>
								{!isfocusAddr ? !err ? (
									<CheckCircleRoundedIcon
										className={classes.correct}
									/>
								) : (
									<CancelRoundedIcon
										className={classes.wrong}
									/> 
								) : ''}
							</InputAdornment>
						),
					}}
				/>
				<TextField
					variant='outlined'
                    label='Amount'
                    placeholder="0"
                    className={classes.input}
                    name='amt'
                    value={amt}
                    type="number"
                    onChange={handleInput}
					InputProps={{
						endAdornment: (
							<InputAdornment>
								<FontAwesomeIcon icon={faEthereum} className={classes.ethIcon} />
							</InputAdornment>
						),
					}}
				/>
               
                </div>
                {/* <div> */}
                
				<div className={classes.btnsContainer}>
                <Divider className={classes.divider}/>
					<Button
						// disabled={pass === "" ? true : false}
						variant='outlined'
						color='secondary'
                        // type='submit'
                        size='large'
                        className={classes.btns}
                        onClick={()=>setScreen('userHome')}
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
                {/* </div> */}
			</form>
		</div>
	);
}

export default withStyles(styles)(NewTx);
