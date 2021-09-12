import * as React from "react";

import Bio from "./components/Bio";
import Header from "./components/Header";
import SendWave from "./components/SendWave";
import Wallet from "./components/Wallet";

import useWallet from "./hooks/useWallet";

import "./App.css";

export default function App() {
	const {
		walletInstalled,
		walletConnected,
		connectWallet,
		loading,
		writeLoading,
		totalWaves,
		sendWave,
		sendCake,
		sendHype,
	} = useWallet();

	return (
		<div className="mainContainer">
			<div className="dataContainer">
				<Header />
				<Wallet
					loading={loading}
					walletInstalled={walletInstalled}
					walletConnected={walletConnected}
					connectWallet={connectWallet}
				/>
				<Bio />
				<SendWave
					loading={loading}
					writeLoading={writeLoading}
					totalWaves={totalWaves}
					sendWave={sendWave}
					sendCake={sendCake}
					sendHype={sendHype}
				/>
			</div>
		</div>
	);
}
