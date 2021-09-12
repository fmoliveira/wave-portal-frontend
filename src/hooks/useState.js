import { WriteStatus } from "./useWallet";

export default function useState() {
	const [loading, setLoading] = useState(true);
	const [writeLoading, setWriteLoading] = useState(WriteStatus.None);
	const [walletInstalled, setInstalled] = useState(false);
	const [walletConnected, setConnected] = useState(false);
	const [walletAccount, setAccount] = useState("");
	const [walletError, setWalletError] = useState(null);
	const [totalWaves, setTotalWaves] = useState(null);

	return {
		loading,
		setLoading,
		writeLoading,
		setWriteLoading,
		walletInstalled,
		setInstalled,
		walletConnected,
		setConnected,
		walletAccount,
		setAccount,
		walletError,
		setWalletError,
		totalWaves,
		setTotalWaves,
	};
}
