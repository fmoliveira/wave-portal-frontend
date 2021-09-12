import * as React from "react";
// import { ethers } from "ethers";
import "./App.css";

const RINKEBY_CONTRACT_ID = "0xf22000c23c1be76EC0c012a97F7F221E4970fd43";

export default function App() {
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

				<section className="reactions">
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
						Show some hype
					</button>
				</section>
			</div>
		</div>
	);
}
