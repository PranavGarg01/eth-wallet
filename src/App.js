import React,{useContext,createContext,useState} from 'react';
import	{ ScreenProvider,  ScreenContext } from './contexts/ScreenContext';
import {withStyles} from '@material-ui/core'
import Screen from './Screen';
const styles = {
	App: { marginTop: "2rem", textAlign: "center" },
};

function App(props) {
	const {classes} = props;
  return (
		<div className={classes.App} fixed='true'>
				<ScreenProvider>
					<Screen />
				</ScreenProvider>
		</div>
  );
}

export default withStyles(styles)(App);
