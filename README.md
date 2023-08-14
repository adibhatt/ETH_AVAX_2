# Custom Wallet with connected Front end
In this project, we created a smart contract to access the MetaMask wallet of the user and integrate it with a front end that runs on the local host. We can perform certain functions such as Withdraw and deposit ETH, Update owner name and also set a pint and verify it. 
## Features

The following features are provided by the Project :

- Check the user's name
- Connect to MetaMask wallet
- Display user's account address
- View user's account balance
- View Wallet Balance
- verify Pin
- Update owner details.
- Deposit ETH into the ATM
- Withdraw ETH from the ATM

  
We here assume that you have already setup your metamask wallet and are running it on a local hardhat network.

## Getting Started

After cloning the GitHub, you will want to do the following to get the code running on your computer.

1. Inside the project directory, in the terminal type: npm i
2. Open two additional terminals in your VS code
3. In the second terminal type: npx hardhat node
4. In the third terminal, type: npx hardhat run --network localhost scripts/deploy.js
5. Back in the first terminal, type npm run dev to launch the front-end.

After this, the project will be running on your localhost. 
Typically at http://localhost:3000/

On the Frontend window, you will be able to interact with the components and deposit or withdraw ETH from metamask wallet.
### `Deposit` 
-- Helps to deposit ETH in the current metamask wallet
### `Withdraw` 
-- Helps to withdraw ETH from the metamask wallet
### `Update Owner details`
-- You can change the owner details such as their name and have the changes displayed on the frontend itself.
### `Verify Pin`
-- User enters a pin and the system checks if it matches with the preset pin that we gave in the contract.

## Authors

Aditya Bhatt
adityabhatt05101007@gmail.com

## License

This project is licensed under the MIT License - see the LICENSE.md file for details

