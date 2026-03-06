// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract BaseKitAccess {
    address public owner;
    mapping(address => bool) public isAuthorized;

    event AccessUpdated(address indexed user, bool status);

    constructor() {
        owner = msg.sender;
        isAuthorized[msg.sender] = true;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Yetkisiz islem: Sadece Temhem");
        _;
    }

    // Bir cüzdana yetki verir (Örn: Ekip arkadaşın)
    function grantAccess(address _user) public onlyOwner {
        isAuthorized[_user] = true;
        emit AccessUpdated(_user, true);
    }

    // Yetkiyi geri alır
    function revokeAccess(address _user) public onlyOwner {
        require(_user != owner, "Kendi yetkini alamazsin");
        isAuthorized[_user] = false;
        emit AccessUpdated(_user, false);
    }

    function hasAccess(address _user) public view returns (bool) {
        return isAuthorized[_user];
    }
}
