// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract BaseKitTimeLock {
    address public owner;
    uint256 public releaseTime;
    bool public isLocked;

    event Locked(uint256 until);
    event Released(uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    // Belirli bir saniye boyunca kasayı kilitle
    function lockFunds(uint256 _seconds) public payable {
        require(msg.value > 0, "Miktar 0 olamaz");
        require(!isLocked, "Zaten kilitli");
        
        releaseTime = block.timestamp + _seconds;
        isLocked = true;
        emit Locked(releaseTime);
    }

    // Süre dolduğunda parayı çek
    function release() public {
        require(msg.sender == owner, "Sadece Temhem acabilir");
        require(block.timestamp >= releaseTime, "Henuz kilitli");
        
        uint256 amount = address(this).balance;
        isLocked = false;
        
        (bool success, ) = owner.call{value: amount}("");
        require(success, "Gonderim basarisiz");
        emit Released(amount);
    }

    function getRemainingTime() public view returns (uint256) {
        if (block.timestamp >= releaseTime) return 0;
        return releaseTime - block.timestamp;
    }
}
