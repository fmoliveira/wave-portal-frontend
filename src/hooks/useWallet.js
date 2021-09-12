import { useEffect, useState } from "react";
import { ethers } from "ethers";

import wavePortalAbi from "../contracts/WavePortal.json";
import useWindowFocus from "./useWindowFocus";

const RINKEBY_CONTRACT_ADDRESS = "0xd5416b962b52f8966D7D62ed2956A3EA0B83df59";

const Reaction = {
	Wave: 0,
	Cake: 1,
	Hype: 2,
};

export const WriteStatus = {
	None: 0,
	Connect: 1,
	Request: 2,
	Pending: 3,
};

export default function useWallet() {
	const { ethereum } = window;

	const [loading, setLoading] = useState(true);
	const [writeLoading, setWriteLoading] = useState(WriteStatus.None);
	const [walletInstalled, setInstalled] = useState(false);
	const [walletConnected, setConnected] = useState(false);
	const [walletAccount, setAccount] = useState("");
	const [walletError, setWalletError] = useState(null);
	const [totalWaves, setTotalWaves] = useState(null);

	const isWindowFocused = useWindowFocus();

	useEffect(() => {
		if (isWindowFocused) {
			const checkStatus = async () => {
				setInstalled(getWalletInstalled());
				setConnected(await getWalletConnected());
				setTotalWaves(await getTotalWaves());
				setLoading(false);
			};
			checkStatus();
		}
	}, [isWindowFocused]);

	const connectWallet = () => {
		return ethereum
			.request({ method: "eth_requestAccounts" })
			.then((accountList) => {
				const [firstAccount] = accountList;
				setAccount(firstAccount);
			})
			.catch((error) => {
				setWalletError(error);
			});
	};

	const waveReaction = async (reaction) => {
		if (!walletInstalled) {
			return;
		}

		if (!walletConnected) {
			setWriteLoading(WriteStatus.Connect);
			await connectWallet();
			setConnected(await getWalletConnected());
		}

		setWriteLoading(WriteStatus.Request);

		writeWave(reaction)
			.then(async (transaction) => {
				setWriteLoading(WriteStatus.Pending);

				await transaction.wait();
				setTotalWaves(await getTotalWaves());
				setWriteLoading(WriteStatus.None);
			})
			.catch(() => {
				setWriteLoading(WriteStatus.None);
			});
	};

	const sendWave = () => waveReaction(Reaction.Wave);
	const sendCake = () => waveReaction(Reaction.Cake);
	const sendHype = () => waveReaction(Reaction.Hype);

	return {
		loading,
		writeLoading,
		walletInstalled,
		walletConnected,
		walletAccount,
		walletError,
		connectWallet,
		totalWaves,
		sendWave,
		sendCake,
		sendHype,
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

async function getTotalWaves() {
	if (!window.ethereum) {
		return;
	}

	const provider = new ethers.providers.Web3Provider(window.ethereum);
	const wavePortalContract = new ethers.Contract(
		RINKEBY_CONTRACT_ADDRESS,
		wavePortalAbi.abi,
		provider,
	);

	const totalWaves = await wavePortalContract.getTotalWaves();
	return totalWaves.toString();
}

function writeWave(reaction) {
	const provider = new ethers.providers.Web3Provider(window.ethereum);
	const signer = provider.getSigner();
	const wavePortalContract = new ethers.Contract(
		RINKEBY_CONTRACT_ADDRESS,
		wavePortalAbi.abi,
		signer,
	);

	return wavePortalContract.wave(reaction);
}
