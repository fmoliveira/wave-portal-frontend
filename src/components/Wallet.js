import React from "react";

export default function Wallet({
	loading,
	walletInstalled,
	walletConnected,
	connectWallet,
}) {
	if (loading) {
		return <div className="buttonGroup" />;
	}

	return (
		<div className="buttonGroup justifyCenter fading">
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
