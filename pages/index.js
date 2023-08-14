import {useState, useEffect} from "react";
import {ethers} from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [ownerDetails, setOwnerDetails] = useState({});
  const [pin, setPin] = useState("");
  const [pinVerified, setPinVerified] = useState(false);
  const [pinError, setPinError] = useState(false);

  const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
  const atmABI = atm_abi.abi;

  const getWallet = async() => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({method: "eth_accounts"});
      handleAccount(account);
    }
  }

  const handleAccount = (account) => {
    if (account) {
      console.log ("Account connected: ", account);
      setAccount(account);
    }
    else {
      console.log("No account found");
    }
  }

  const connectAccount = async() => {
    if (!ethWallet) {
      alert('MetaMask wallet is required to connect');
      return;
    }
  
    const accounts = await ethWallet.request({ method: 'eth_requestAccounts' });
    handleAccount(accounts);
    
    // once wallet is set we can get a reference to our deployed contract
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);
 
    setATM(atmContract);
  }

  const getBalance = async() => {
    if (atm) {
      setBalance((await atm.getBalance()).toNumber());
    }
  }

  const deposit = async() => {
    if (atm) {
      let tx = await atm.deposit(1);
      await tx.wait()
      getBalance();
    }
  }

  const withdraw = async() => {
    if (atm) {
      let tx = await atm.withdraw(1);
      await tx.wait()
      getBalance();
    }
  }

  //My functions
  const getOwnerDetails = async () => {
    if (atm) {
      try {
        const details = await atm.getOwnerDetails();
        setOwnerDetails(details);
      } catch (error) {
        console.error("Error fetching owner details:", error);
      }
    }
  };
  const updateOwnerDetails = async (newName) => {
    if (atm) {
      try {
        const tx = await atm.updateOwnerDetails(newName);
        await tx.wait();
        getOwnerDetails();
      } catch (error) {
        console.error("Error updating owner details:", error);
      }
    }
  };
  const updateOwnerDetailsPrompt = async () => {
    const newName = prompt("Enter the new owner's name:");
    if (newName !== null) {
      await updateOwnerDetails(newName);
      await getOwnerDetails();
    }
  };

  //second function
  const verifyPin = async () => {
    if (atm && pin) {
      try {
        const isVerified = await atm.verifyPin(pin);
        setPinVerified(isVerified);
        setPinError(!isVerified); // Reset the pin error state
      } catch (error) {
        console.error(error);
        setPinError(true); // Set the pin error state
      }
    }
  };
  const handlePinChange = (event) => {
    setPin(event.target.value);
  };

  const initUser = () => {
    // Check to see if user has Metamask
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>
    }

    // Check to see if user is connected. If not, connect to their account
    if (!account) {
      return <button onClick={connectAccount}>Please connect your Metamask wallet</button>
    }

    if (balance == undefined) {
      getBalance();
    }

    return (
      <div>
        <p>Your Account: {account}</p>
        <p>Your Balance: {balance}</p>
        <button onClick={deposit}>Deposit 1 ETH</button>
        <button onClick={withdraw}>Withdraw 1 ETH</button>
        <p>Owner Name: {ownerDetails.name}</p>
        <button onClick={updateOwnerDetailsPrompt}>Update Owner Name</button>
        <div>
          <input type="text" value={pin} onChange={handlePinChange} placeholder="Enter PIN" />
          <button onClick={verifyPin}>Verify PIN</button>
          {pinError && <p className="error">Incorrect PIN. Please try again.</p>}
          {pinVerified && !pinError && <p>PIN is verified</p>}
        </div>
      </div>
    )
  }

  useEffect(() => {getWallet();}, []);

  return (
    <main className="container">
      <header><h1>Welcome to the ADITYA Custom ATM!</h1></header>
      {initUser()}
      <style jsx>{`
        .container {
          text-align: center
        }
      `}
      </style>
    </main>
  )
}
