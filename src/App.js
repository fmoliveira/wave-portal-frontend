import * as React from "react";

import Wallet from "./components/Wallet";
import useWallet from "./hooks/useWallet";
import "./App.css";

export default function App() {
	const { loading, totalWaves, sendWave, sendCake, sendHype } = useWallet();

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
					<button className="button buttonWave" onClick={sendWave}>
						<span className="buttonEmoji" role="img" aria-label="Wave">
							👋
						</span>{" "}
						Wave at me
					</button>
					<button className="button buttonCake" onClick={sendCake}>
						<span className="buttonEmoji" role="img" aria-label="Cake">
							🍰
						</span>{" "}
						Send me cake
					</button>
					<button className="button buttonFire" onClick={sendHype}>
						<span className="buttonEmoji" role="img" aria-label="Fire">
							🔥
						</span>{" "}
						Share some hype
					</button>
				</section>

				{!loading && (
					<div className="totalWaves fading">
						I've been waved {totalWaves} times
					</div>
				)}
			</div>
		</div>
	);
}
