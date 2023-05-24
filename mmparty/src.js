
const setData = (data) => document.getElementById('outputData').innerText = data
const getData = () => document.getElementById('outputData').innerText

async function genData() {
	setData('')
	let addr = document.getElementById('userWallet').value
	if (!isAddress(addr)) outputError(addr)
	else getMerkleDataFor(addr)
}

function isAddress(address) {
	return ethers.utils.isAddress(address);
}

function outputError(addr) {
	setData(`"${addr}" is not a valid eth address :(`)
}

function getMerkleDataFor(addr) {
	const tree = merkleRoot(wls)
	const root = tree.getHexRoot()
	const proof = tree.getHexProof(hash(addr))
	
	if (proof.length === 0) {
		setData('Youre not in the free mint list :(')
		return	
	}

	let text = getData()

	text += `\nKey: ${root}\n`
	text += `\nProof: [${proof}]\n`
	text += `\nZero address: 0x0000000000000000000000000000000000000000`
	
	setData(text)

	document.getElementById('screencapData').innerText = 
		'\nNow input this data as explained in the following screenshot:'

	document.getElementById('tutorial').style.display = 'block'
	document.getElementById('etherscanLink').style.display = 'block'

}

function merkleRoot(elements) {
	const hashedElements = elements.map(hash);
	const tree = new MerkleTree(hashedElements, ethers.utils.keccak256, {
		sortPairs: true
	});
	return tree
}

function hash(address) {
	const hashBytes = ethers.utils.arrayify(ethers.utils.solidityKeccak256(['address'], [address]));
	return new Uint8Array(hashBytes);
}

