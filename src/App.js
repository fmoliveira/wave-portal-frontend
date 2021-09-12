import * as React from "react";

import Wallet from "./components/Wallet";
import useWallet from "./hooks/useWallet";
import "./App.css";

export default function App() {
	const { loading, totalWaves } = useWallet();
	const wave = () => {};

	return (
		<div className="mainContainer">
			<div className="dataContainer">
				<div className="header">
					<span role="img" aria-label="Wave">
						👋
					</span>
					Wave at Filipe
				</div>

				<Wallet />

				<div className="bio">
					<p>
						Hi there! I'm Filipe, a Full Stack Dev from Brazil learning about
						Web3.
					</p>
					<p>
						Connect your wallet to wave at me, send me some cake, or share some
						hype!
					</p>
				</div>

				<section className="buttonGroup">
					<button className="button buttonWave" onClick={wave}>
						<span className="buttonEmoji" role="img" aria-label="Wave">
							👋
						</span>{" "}
						Wave at me
					</button>
					<button className="button buttonCake" onClick={wave}>
						<span className="buttonEmoji" role="img" aria-label="Cake">
							🍰
						</span>{" "}
						Send me cake
					</button>
					<button className="button buttonFire" onClick={wave}>
						<span className="buttonEmoji" role="img" aria-label="Fire">
							🔥
						</span>{" "}
						Share some hype
					</button>
				</section>

				{!loading && (
					<div className="totalWaves">I've been waved {totalWaves} times</div>
				)}
			</div>
		</div>
	);
}
