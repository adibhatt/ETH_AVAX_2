// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

//import "hardhat/console.sol";

contract Assessment {
    address payable public owner;
    uint256 public balance;

     struct OwnerDetails {
        string name;
        address accountAddress;
        uint256 accountBalance;
    }

    OwnerDetails public ownerDetails;

    event Deposit(uint256 amount);
    event Withdraw(uint256 amount);
    event OwnerDetailsUpdated(string newName);

    constructor(uint initBalance, string memory initialName) payable {
        owner = payable(msg.sender);
        balance = initBalance;
        ownerDetails.name = initialName;
        ownerDetails.accountAddress = owner;
        ownerDetails.accountBalance = initBalance;
    }

    function verifyPin(uint256 _pin) public pure returns (bool) {
        uint256 validPin = 5501;
        return _pin == validPin;
    }

    function getOwnerDetails() public view returns (OwnerDetails memory) {
        return ownerDetails;
    }

    function updateOwnerDetails(string memory newName) public {
        require(msg.sender == owner, "You are not the owner of this account");
        ownerDetails.name = newName;
        emit OwnerDetailsUpdated(newName);
    }

    function getBalance() public view returns(uint256){
        return balance;
    }

    function deposit(uint256 _amount) public payable {
        uint _previousBalance = balance;

        // make sure this is the owner
        require(msg.sender == owner, "You are not the owner of this account");

        // perform transaction
        balance += _amount;

        // assert transaction completed successfully
        assert(balance == _previousBalance + _amount);

        // emit the event
        emit Deposit(_amount);
    }

    // custom error
    error InsufficientBalance(uint256 balance, uint256 withdrawAmount);

    function withdraw(uint256 _withdrawAmount) public {
        require(msg.sender == owner, "You are not the owner of this account");
        uint _previousBalance = balance;
        if (balance < _withdrawAmount) {
            revert InsufficientBalance({
                balance: balance,
                withdrawAmount: _withdrawAmount
            });
        }

        // withdraw the given amount
        balance -= _withdrawAmount;

        // assert the balance is correct
        assert(balance == (_previousBalance - _withdrawAmount));

        // emit the event
        emit Withdraw(_withdrawAmount);
    }


}
