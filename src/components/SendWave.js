import React, { useState } from "react";
import classNames from "classnames";

import useWallet from "../hooks/useWallet";
import WaveStatus from "./WaveStatus";

import "./SendWave.css";

export default function SendWave() {
	const [message, setMessage] = useState("");
	const { loading, writeLoading, totalWaves, sendWave, sendCake, sendHype } =
		useWallet();

	return (
		<div>
			<div className="textWrapper">
				<label htmlFor="message">Write your message below:</label>
				<textarea
					id="message"
					className="textBox"
					value={message}
					onChange={(ev) => setMessage(ev.target.value)}
				/>
			</div>
			<section
				className={classNames(
					"buttonGroup",
					(loading || writeLoading || message.length === 0) && "disabled",
				)}
			>
				<button className="button buttonWave" onClick={() => sendWave(message)}>
					<span className="buttonEmoji" role="img" aria-label="Wave">
						👋
					</span>{" "}
					Wave at me
				</button>
				<button className="button buttonCake" onClick={() => sendCake(message)}>
					<span className="buttonEmoji" role="img" aria-label="Cake">
						🍰
					</span>{" "}
					Send me cake
				</button>
				<button className="button buttonFire" onClick={() => sendHype(message)}>
					<span className="buttonEmoji" role="img" aria-label="Fire">
						🔥
					</span>{" "}
					Share some hype
				</button>
			</section>
			<WaveStatus
				loading={loading}
				writeLoading={writeLoading}
				totalWaves={totalWaves}
			/>
		</div>
	);
}
