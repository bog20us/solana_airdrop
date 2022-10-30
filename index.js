const {
	Connection,
	PublicKey,
	clusterApiUrl,
	Keypair,
	LAMPORTS_PER_SOL
} = require("@solana/web3.js")

const wallet = new Keypair()
const publicKey = new PublicKey(wallet._keypair.publicKey)
const privateKey = wallet._keypair.secretKey

const getWalletBalance = async() => {
	try{
		const connection = new Connection(clusterApiUrl('devnet'),'confirmed')
		const walletBalance = await connection.getBalance(publicKey)
		console.log(`wallet ballance is ${walletBalance}`)

	}catch(err){
		console.log(err)
	}
}

const airdropSol = async() => {
	try{
		const connection = new Connection(clusterApiUrl('devnet'), 'copnfirmed')
		const airdropSig = await connection.requestAirdrop(publicKey, 2* LAMPORTS_PER_SOL)
		await connection.confirmTransaction(airdropSig)
	}catch(err){
		console.log(err)
	}
}

const main = async() => {
	await getWalletBalance()
	await airdropSol()
	await getWalletBalance()
}
main()