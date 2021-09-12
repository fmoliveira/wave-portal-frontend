import * as React from "react";

import Bio from "./components/Bio";
import Header from "./components/Header";
import SendWave from "./components/SendWave";
import Wallet from "./components/Wallet";

import "./App.css";

export default function App() {
	return (
		<div className="mainContainer">
			<div className="dataContainer">
				<Header />
				<Wallet />
				<Bio />
				<SendWave />
			</div>
		</div>
	);
}
