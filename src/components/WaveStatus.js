import React from "react";

import { WriteStatus } from "../hooks/useWallet";

const WriteLoadingMessage = {
	[WriteStatus.Request]: "Check your wallet for the transaction...",
	[WriteStatus.Pending]: "Wave transaction in progress...",
};

export default function WaveStatus({ loading, writeLoading, totalWaves }) {
	if (loading) {
		return null;
	}

	if (writeLoading) {
		return (
			<div className="waveStatus">{WriteLoadingMessage[writeLoading]}</div>
		);
	}

	return (
		<div className="waveStatus fading">I've been waved {totalWaves} times</div>
	);
}
