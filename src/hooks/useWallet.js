import { useCallback, useEffect, useState } from "react";
import { ethers } from "ethers";

import wavePortalAbi from "../contracts/WavePortal.json";
import useWindowFocus from "./useWindowFocus";

const RINKEBY_CONTRACT_ADDRESS = "0x933B92cB1f357290cC9d97101c2C8be99573E79e";

export const Reaction = {
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
	const [waveList, setWaveList] = useState([]);
	const [totalWaves, setTotalWaves] = useState(null);

	const isWindowFocused = useWindowFocus();

	const updateWaves = useCallback(() => {
		const runUpdates = async () => {
			setTotalWaves(await getTotalWaves());
			setWaveList(await getAllWaves());
		};
		runUpdates();
	}, [setTotalWaves, setWaveList]);

	const addNewWaveToList = useCallback(
		(newWave) => {
			setWaveList([newWave, ...waveList]);
		},
		[waveList],
	);

	useEffect(() => {
		subscribeToWaveEvents((newWave) => {
			addNewWaveToList(newWave);
		});
		// SUBSCRICE ONCE when mounting the component
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (isWindowFocused) {
			// check status whenever the window focus status changes
		}
		const runUpdates = async () => {
			setInstalled(getWalletInstalled());
			setConnected(await getWalletConnected());
			updateWaves();
			setLoading(false);
		};
		runUpdates();
	}, [isWindowFocused, setInstalled, setConnected, updateWaves, setLoading]);

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

	const waveReaction = async (reaction, message) => {
		if (!walletInstalled) {
			return;
		}

		if (!walletConnected) {
			setWriteLoading(WriteStatus.Connect);
			await connectWallet();
			setConnected(await getWalletConnected());
		}
		setWriteLoading(WriteStatus.Request);

		writeWave(reaction, message)
			.then(async (transaction) => {
				setWriteLoading(WriteStatus.Pending);

				await transaction.wait();
				updateWaves();
				setWriteLoading(WriteStatus.None);
			})
			.catch((error) => {
				window.alert("Failed to write transaction!");
				console.error(error);
				setWriteLoading(WriteStatus.None);
			});
	};

	const sendWave = (message) => waveReaction(Reaction.Wave, message);
	const sendCake = (message) => waveReaction(Reaction.Cake, message);
	const sendHype = (message) => waveReaction(Reaction.Hype, message);

	return {
		loading,
		writeLoading,
		walletInstalled,
		walletConnected,
		walletAccount,
		walletError,
		connectWallet,
		waveList,
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
	return Number.parseInt(totalWaves.toString(), 10);
}

function writeWave(reaction, message) {
	const provider = new ethers.providers.Web3Provider(window.ethereum);
	const signer = provider.getSigner();
	const wavePortalContract = new ethers.Contract(
		RINKEBY_CONTRACT_ADDRESS,
		wavePortalAbi.abi,
		signer,
	);

	return wavePortalContract.wave(reaction, message, {
		gasLimit: 300000,
	});
}

async function getAllWaves() {
	if (!window.ethereum) {
		return;
	}

	const provider = new ethers.providers.Web3Provider(window.ethereum);
	const wavePortalContract = new ethers.Contract(
		RINKEBY_CONTRACT_ADDRESS,
		wavePortalAbi.abi,
		provider,
	);

	const allWaves = await wavePortalContract.getAllWaves();

	if (!allWaves) {
		return [];
	}

	const normalizeWave = (wave) => ({
		reaction: wave.reaction,
		message: wave.message,
		waver: wave.waver,
		timestamp: new Date(wave.timestamp * 1000),
	});

	return allWaves.map(normalizeWave).sort((a, b) => b.timestamp - a.timestamp);
}

function subscribeToWaveEvents(callback) {
	if (!window.ethereum) {
		return;
	}

	const provider = new ethers.providers.Web3Provider(window.ethereum);
	const wavePortalContract = new ethers.Contract(
		RINKEBY_CONTRACT_ADDRESS,
		wavePortalAbi.abi,
		provider,
	);

	wavePortalContract.on("NewWave", (reaction, message, waver, timestamp) => {
		callback({ reaction, message, waver, timestamp });
	});
}
