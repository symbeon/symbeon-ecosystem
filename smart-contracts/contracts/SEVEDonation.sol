// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title SEVEDonation
 * @dev Contrato para receber doações e investimentos via crypto
 * Suporta múltiplos tipos de doação (geral, seed, series A, grants)
 */
contract SEVEDonation is Ownable, ReentrancyGuard {
    IERC20 public seveToken;
    
    enum DonationType { GENERAL, SEED, SERIES_A, GRANT }
    
    struct Donation {
        address donor;
        uint256 amount;
        DonationType donationType;
        string message;
        uint256 timestamp;
        bool withdrawn;
    }
    
    // Storage
    Donation[] public donations;
    mapping(address => uint256) public totalDonated;
    mapping(DonationType => uint256) public totalByType;
    mapping(address => uint256[]) public donorDonations;
    
    // Events
    event DonationReceived(
        address indexed donor,
        uint256 amount,
        DonationType donationType,
        string message,
        uint256 timestamp
    );
    
    event FundsWithdrawn(
        address indexed recipient,
        uint256 amount,
        uint256 timestamp
    );
    
    constructor(address _seveToken) {
        seveToken = IERC20(_seveToken);
    }
    
    /**
     * @dev Permite doar SEVE tokens
     */
    function donate(
        uint256 amount,
        DonationType donationType,
        string memory message
    ) external nonReentrant {
        require(amount > 0, "Amount must be greater than 0");
        require(
            seveToken.transferFrom(msg.sender, address(this), amount),
            "Transfer failed"
        );
        
        uint256 donationId = donations.length;
        
        donations.push(Donation({
            donor: msg.sender,
            amount: amount,
            donationType: donationType,
            message: message,
            timestamp: block.timestamp,
            withdrawn: false
        }));
        
        totalDonated[msg.sender] += amount;
        totalByType[donationType] += amount;
        donorDonations[msg.sender].push(donationId);
        
        emit DonationReceived(msg.sender, amount, donationType, message, block.timestamp);
    }
    
    /**
     * @dev Retorna estatísticas de doações
     */
    function getDonationStats() external view returns (
        uint256 totalDonations,
        uint256 uniqueDonors,
        uint256 totalAmount,
        uint256 generalDonations,
        uint256 seedInvestments,
        uint256 seriesAInvestments,
        uint256 grants
    ) {
        totalDonations = donations.length;
        totalAmount = seveToken.balanceOf(address(this));
        
        // Contar doadores únicos
        uniqueDonors = 0;
        for (uint256 i = 0; i < donations.length; i++) {
            if (donorDonations[donations[i].donor].length == 1) {
                uniqueDonors++;
            }
        }
        
        generalDonations = totalByType[DonationType.GENERAL];
        seedInvestments = totalByType[DonationType.SEED];
        seriesAInvestments = totalByType[DonationType.SERIES_A];
        grants = totalByType[DonationType.GRANT];
    }
    
    /**
     * @dev Retorna doações de um doador específico
     */
    function getDonorHistory(address donor) external view returns (uint256[] memory) {
        return donorDonations[donor];
    }
    
    /**
     * @dev Owner pode retirar fundos
     */
    function withdraw(uint256 amount) external onlyOwner nonReentrant {
        require(amount > 0, "Amount must be greater than 0");
        require(
            seveToken.transfer(owner(), amount),
            "Withdrawal failed"
        );
        
        emit FundsWithdrawn(owner(), amount, block.timestamp);
    }
    
    /**
     * @dev Owner pode retirar todos os fundos
     */
    function withdrawAll() external onlyOwner nonReentrant {
        uint256 balance = seveToken.balanceOf(address(this));
        require(balance > 0, "No funds to withdraw");
        require(
            seveToken.transfer(owner(), balance),
            "Withdrawal failed"
        );
        
        emit FundsWithdrawn(owner(), balance, block.timestamp);
    }
    
    /**
     * @dev Retorna balance do contrato
     */
    function getBalance() external view returns (uint256) {
        return seveToken.balanceOf(address(this));
    }
}

