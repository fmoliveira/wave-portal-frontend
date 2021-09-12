import React from "react";

import useWallet from "../hooks/useWallet";

export default function WaveStatus() {
	const { loading, totalWaves } = useWallet();

	if (loading) {
		return null;
	}

	return (
		<div className="totalWaves fading">I've been waved {totalWaves} times</div>
	);
}
