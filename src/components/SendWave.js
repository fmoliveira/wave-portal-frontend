import React from "react";

import useWallet from "../hooks/useWallet";

export default function SendWave() {
	const { sendWave, sendCake, sendHype } = useWallet();

	return (
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
	);
}
