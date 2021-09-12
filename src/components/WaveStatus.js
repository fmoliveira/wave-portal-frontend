import React from "react";

import { WriteStatus } from "../hooks/useWallet";
import Spinner from "./Spinner";

const WriteLoadingMessage = {
	[WriteStatus.Connect]: "Please connect your wallet to proceed...",
	[WriteStatus.Request]: "Check your wallet for the transaction...",
	[WriteStatus.Pending]: "Wave transaction in progress...",
};

export default function WaveStatus({ loading, writeLoading, totalWaves }) {
	if (loading || !totalWaves) {
		return null;
	}

	if (writeLoading) {
		return (
			<div className="waveStatus">
				<p>{WriteLoadingMessage[writeLoading]}</p>
				<Spinner />
			</div>
		);
	}

	return (
		<div className="waveStatus fading">
			I've been waved {totalWaves === 1 ? `once` : `${totalWaves} times`}
		</div>
	);
}
