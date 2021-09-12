import { useEffect, useMemo, useState } from "react";
// import { ethers } from "ethers";

import useWindowFocus from "./useWindowFocus";

const RINKEBY_CONTRACT_ID = "0xd5416b962b52f8966D7D62ed2956A3EA0B83df59";

export default function useWallet() {
	const { ethereum } = window;

	const [loading, setLoading] = useState(true);
	const [walletInstalled, setInstalled] = useState(false);
	const [walletConnected, setConnected] = useState(false);
	const [walletAccount, setAccount] = useState("");
	const [walletError, setWalletError] = useState(null);

	const isWindowFocused = useWindowFocus();

	useEffect(() => {
		if (isWindowFocused) {
			const checkStatus = async () => {
				setInstalled(getWalletInstalled());
				setConnected(await getWalletConnected());
				setLoading(false);
			};
			checkStatus();
		}
	}, [isWindowFocused]);

	const connectWallet = () => {
		ethereum
			.request({ method: "eth_requestAccounts" })
			.then((accountList) => {
				const [firstAccount] = accountList;
				setAccount(firstAccount);
			})
			.catch((error) => {
				setWalletError(error);
			});
	};

	return {
		loading,
		walletInstalled,
		walletConnected,
		walletError,
		connectWallet,
	};
}

function getWalletInstalled() {
	return typeof window.ethereum !== "undefined";
}

async function getWalletConnected() {
	if (!window.ethereum) {
		return false;
	}

	const accountList = await window.ethereum.request({ method: "eth_accounts" });
	return accountList.length !== 0;
}
