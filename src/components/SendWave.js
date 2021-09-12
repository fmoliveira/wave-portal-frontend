import React, { useEffect, useState } from "react";
import classNames from "classnames";

import WaveStatus from "./WaveStatus";

import "./SendWave.css";
import { WriteStatus } from "../hooks/useWallet";

export default function SendWave({
	walletInstalled,
	walletConnected,
	isRinkeby,
	loading,
	writeLoading,
	totalWaves,
	sendWave,
	sendCake,
	sendHype,
}) {
	const [message, setMessage] = useState("");
	const disableInput = Boolean(writeLoading);
	const disableButtons =
		!walletInstalled ||
		!walletConnected ||
		!isRinkeby ||
		loading ||
		writeLoading ||
		message.length === 0;

	useEffect(() => {
		if (writeLoading === WriteStatus.None) {
			setMessage("");
		}
	}, [writeLoading]);

	return (
		<div>
			<div className="textWrapper">
				<label htmlFor="message">Write your message below:</label>
				<textarea
					id="message"
					className={classNames("textBox")}
					disabled={disableInput}
					value={message}
					onChange={(ev) => setMessage(ev.target.value)}
				/>
			</div>
			<section
				className={classNames("buttonGroup", disableButtons && "disabled")}
			>
				<button className="button buttonWave" onClick={() => sendWave(message)}>
					<span className="buttonEmoji" role="img" aria-label="Wave">
						👋
					</span>
					Wave at me
				</button>
				<button className="button buttonCake" onClick={() => sendCake(message)}>
					<span className="buttonEmoji" role="img" aria-label="Cake">
						🍰
					</span>
					Send me cake
				</button>
				<button className="button buttonFire" onClick={() => sendHype(message)}>
					<span className="buttonEmoji" role="img" aria-label="Fire">
						🔥
					</span>
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
