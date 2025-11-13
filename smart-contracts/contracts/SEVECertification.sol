// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title SEVECertification
 * @dev Certificação ética como NFT
 * Cada certificado é um NFT único com metadata armazenada em IPFS
 */
contract SEVECertification is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _certificateIds;
    
    struct Certificate {
        uint256 id;
        address organization;
        string projectName;
        string ipfsHash;
        uint256 issueDate;
        uint256 expiryDate;
        bool isValid;
        string complianceLevel;
        string[] complianceStandards; // ["LGPD", "GDPR", "HIPAA", etc.]
    }
    
    // Storage
    mapping(uint256 => Certificate) public certificates;
    mapping(address => uint256[]) public organizationCertificates;
    mapping(string => uint256) public projectNameToCertificate;
    
    uint256 public certificationPrice;
    uint256 public renewalDiscount = 50; // 50% discount on renewal
    
    // Events
    event CertificateIssued(
        uint256 indexed certificateId,
        address indexed organization,
        string projectName,
        string complianceLevel,
        uint256 expiryDate
    );
    
    event CertificateRevoked(
        uint256 indexed certificateId,
        string reason
    );
    
    event CertificateRenewed(
        uint256 indexed certificateId,
        uint256 newExpiryDate
    );
    
    constructor(uint256 _price) ERC721("SEVE Ethical Certification", "SEVECERT") {
        certificationPrice = _price;
    }
    
    /**
     * @dev Emite um novo certificado
     */
    function issueCertificate(
        address organization,
        string memory projectName,
        string memory ipfsHash,
        uint256 validityPeriodInDays,
        string memory complianceLevel,
        string[] memory complianceStandards
    ) external onlyOwner returns (uint256) {
        require(
            projectNameToCertificate[projectName] == 0,
            "Certificate already exists for this project"
        );
        
        _certificateIds.increment();
        uint256 certificateId = _certificateIds.current();
        
        uint256 expiryDate = block.timestamp + (validityPeriodInDays * 1 days);
        
        certificates[certificateId] = Certificate({
            id: certificateId,
            organization: organization,
            projectName: projectName,
            ipfsHash: ipfsHash,
            issueDate: block.timestamp,
            expiryDate: expiryDate,
            isValid: true,
            complianceLevel: complianceLevel,
            complianceStandards: complianceStandards
        });
        
        _mint(organization, certificateId);
        _setTokenURI(certificateId, ipfsHash);
        
        organizationCertificates[organization].push(certificateId);
        projectNameToCertificate[projectName] = certificateId;
        
        emit CertificateIssued(
            certificateId,
            organization,
            projectName,
            complianceLevel,
            expiryDate
        );
        
        return certificateId;
    }
    
    /**
     * @dev Revoga um certificado
     */
    function revokeCertificate(
        uint256 certificateId,
        string memory reason
    ) external onlyOwner {
        require(certificates[certificateId].isValid, "Certificate already revoked");
        certificates[certificateId].isValid = false;
        emit CertificateRevoked(certificateId, reason);
    }
    
    /**
     * @dev Renova um certificado existente
     */
    function renewCertificate(
        uint256 certificateId,
        uint256 additionalDays
    ) external onlyOwner {
        require(certificates[certificateId].id > 0, "Certificate does not exist");
        
        uint256 newExpiryDate = certificates[certificateId].expiryDate + (additionalDays * 1 days);
        certificates[certificateId].expiryDate = newExpiryDate;
        certificates[certificateId].isValid = true;
        
        emit CertificateRenewed(certificateId, newExpiryDate);
    }
    
    /**
     * @dev Verifica se um certificado é válido
     */
    function verifyCertificate(uint256 certificateId) 
        external 
        view 
        returns (
            bool isValid,
            Certificate memory cert
        ) 
    {
        cert = certificates[certificateId];
        isValid = cert.isValid && block.timestamp < cert.expiryDate;
    }
    
    /**
     * @dev Retorna todos os certificados de uma organização
     */
    function getOrganizationCertificates(address organization) 
        external 
        view 
        returns (uint256[] memory) 
    {
        return organizationCertificates[organization];
    }
    
    /**
     * @dev Atualiza o preço de certificação
     */
    function setCertificationPrice(uint256 newPrice) external onlyOwner {
        certificationPrice = newPrice;
    }
    
    /**
     * @dev Atualiza desconto de renovação
     */
    function setRenewalDiscount(uint256 newDiscount) external onlyOwner {
        require(newDiscount <= 100, "Discount cannot exceed 100%");
        renewalDiscount = newDiscount;
    }
    
    /**
     * @dev Verifica se um projeto já tem certificado
     */
    function hasActiveCertificate(string memory projectName) external view returns (bool) {
        uint256 certId = projectNameToCertificate[projectName];
        if (certId == 0) return false;
        
        Certificate memory cert = certificates[certId];
        return cert.isValid && block.timestamp < cert.expiryDate;
    }
}


