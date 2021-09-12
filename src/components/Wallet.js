import React from "react";

import useWallet from "../hooks/useWallet";

export default function Wallet() {
	const {
		loading,
		walletInstalled,
		walletConnected,
		walletError,
		connectWallet,
	} = useWallet();

	if (loading) {
		return <div className="buttonGroup" />;
	}

	return (
		<div className="buttonGroup buttonLoading">
			{!walletInstalled && (
				<a
					className="button buttonNoWallet"
					href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn/related"
					target="_blank"
					rel="noopener noreferrer"
				>
					Install MetaMask
				</a>
			)}
			{walletInstalled && !walletConnected && (
				<button className="button buttonMetaMask" onClick={connectWallet}>
					Connect MetaMask
				</button>
			)}
			{walletConnected && (
				<div>
					<span className="dotConnected" />
					Wallet Connected
				</div>
			)}
		</div>
	);
}
