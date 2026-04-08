// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract BaseSpinGame {
    address public owner;
    uint256 public constant spinCost = 0.0005 ether; // Giriş Ücreti

    event SpinResult(address indexed player, bool won, uint256 prize, uint256 dice);
    event FundsAdded(address indexed admin, uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Yetkiniz yok");
        _;
    }

    // Çarkı Çevir
    function spin() payable public {
        require(msg.value == spinCost, "Lutfen 0.0005 ETH gonderin");
        
        // 0 ile 999 arası sayı üretir (Toplam 1000 ihtimal)
        uint256 dice = uint256(keccak256(abi.encodePacked(
            block.timestamp, 
            msg.sender, 
            block.prevrandao
        ))) % 1000;

        uint256 prize = 0;
        bool hasWon = false;

        // İSTEDİĞİN ÖZEL OLASILIKLAR:
        if (dice == 0) { 
            // 1000'de 1 İHTİMAL: 0.003 ETH (En Büyük Ödül)
            prize = 0.003 ether;
            hasWon = true;
        } else if (dice >= 1 && dice <= 3) { 
            // 1000'de 3 İHTİMAL: 0.002 ETH
            prize = 0.002 ether;
            hasWon = true;
        } else if (dice >= 4 && dice <= 8) { 
            // 1000'de 5 İHTİMAL: 0.001 ETH
            prize = 0.001 ether;
            hasWon = true;
        }

        if (hasWon) {
            require(address(this).balance >= prize, "Odul havuzu yetersiz!");
            (bool success, ) = payable(msg.sender).call{value: prize}("");
            require(success, "Transfer basarisiz");
        }

        emit SpinResult(msg.sender, hasWon, prize, dice);
    }

    // Ödül Havuzunu Doldur
    function addFunds() payable public onlyOwner {
        emit FundsAdded(msg.sender, msg.value);
    }

    // Kasa Çekimi (Tüm bakiyeyi çekmek için)
    function withdrawFunds() public onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "Cekilecek fon yok");
        (bool success, ) = payable(owner).call{value: balance}("");
        require(success, "Transfer basarisiz");
    }

    // Bakiyeyi Sorgula
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    // Doğrudan ETH gönderimlerini kabul etmek için
    receive() external payable {}
}
