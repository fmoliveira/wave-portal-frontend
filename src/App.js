import * as React from "react";

import Bio from "./components/Bio";
import Header from "./components/Header";
import SendWave from "./components/SendWave";
import Wallet from "./components/Wallet";

import useWallet from "./hooks/useWallet";

import "./App.css";
import WaveList from "./components/WaveList";

export default function App() {
	const {
		walletInstalled,
		walletConnected,
		networkName,
		isRinkeby,
		connectWallet,
		loading,
		writeLoading,
		waveList,
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
					isRinkeby={isRinkeby}
					networkName={networkName}
					connectWallet={connectWallet}
				/>
				<Bio />
				<SendWave
					walletInstalled={walletInstalled}
					walletConnected={walletConnected}
					isRinkeby={isRinkeby}
					loading={loading}
					writeLoading={writeLoading}
					totalWaves={totalWaves}
					sendWave={sendWave}
					sendCake={sendCake}
					sendHype={sendHype}
				/>
				<WaveList waveList={waveList} />
			</div>
		</div>
	);
}
