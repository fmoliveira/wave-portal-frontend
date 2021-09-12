import * as React from "react";
// import { ethers } from "ethers";
import "./App.css";

const RINKEBY_CONTRACT_ID = "0xd5416b962b52f8966D7D62ed2956A3EA0B83df59";

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
