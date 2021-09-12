import React from "react";

export default function WaveStatus({ loading, writeLoading, totalWaves }) {
	if (loading) {
		return null;
	}

	if (writeLoading) {
		return <div className="waveStatus">Sending wave...</div>;
	}

	return (
		<div className="waveStatus fading">I've been waved {totalWaves} times</div>
	);
}
