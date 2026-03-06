// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract BaseKitTipJar {
    address payable public owner;
    uint256 public totalTips;

    event TipReceived(address indexed sender, uint256 amount);

    constructor() {
        owner = payable(msg.sender);
    }

    // İnsanlar sana ETH bahşişi gönderebilir
    function sendTip() public payable {
        require(msg.value > 0, "Bahsis miktari 0 olamaz");
        totalTips += msg.value;
        emit TipReceived(msg.sender, msg.value);
    }

    // Modern 'call' yöntemiyle parayı çekme
    function withdraw() public {
        require(msg.sender == owner, "Sadece Temhem cekebilir");
        uint256 balance = address(this).balance;
        require(balance > 0, "Kasa bos");

        (bool success, ) = owner.call{value: balance}("");
        require(success, "Gonderim basarisiz");
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    receive() external payable {}
}
