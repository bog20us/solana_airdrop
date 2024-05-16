const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL
} = require("@solana/web3.js");

const wallet = new Keypair();
const publicKey = new PublicKey(wallet._keypair.publicKey);
const privateKey = wallet._keypair.secretKey;

console.log("Public Key:", publicKey.toBase58());
console.log("Private Key:", privateKey.toString('base64'));

const getWalletBalance = async() => {
    try {
        const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
        const walletBalance = await connection.getBalance(publicKey);
        console.log(`Wallet balance is ${walletBalance / LAMPORTS_PER_SOL} SOL`);
    } catch(err) {
        console.log("An error occurred: ", err.message);
    }
};

const airdropSol = async() => {
    try {
        const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
        const airdropSig = await connection.requestAirdrop(publicKey, 2 * LAMPORTS_PER_SOL);
        await connection.confirmTransaction(airdropSig);
    } catch(err) {
        console.log("An error occurred: ", err.message);
    }
};

const main = async() => {
    await getWalletBalance();
    await airdropSol();
    await getWalletBalance();
};

main();
