import React from "react";

import Wave from "./Wave";

import "./WaveList.css";

export default function WaveList({ waveList }) {
	if (!waveList) {
		return null;
	}

	return (
		<div className="waveList">
			{waveList.map((wave) => (
				<Wave
					key={wave.timestamp}
					reaction={wave.reaction}
					message={wave.message}
					waver={wave.waver}
					timestamp={wave.timestamp}
				/>
			))}
		</div>
	);
}
