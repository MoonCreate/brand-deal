// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./BrandNFT.sol";
import "./CreatorNFT.sol";
import "./CampaignContract.sol";

contract BrandDeal is Ownable {
    BrandNFT public brandNFT;
    CreatorNFT public creatorNFT;
    CampaignContract public campaignContract;

    // Mapping: Campaign NFT tokenId => Campaign Instance ID (untuk memudahkan lookup)
    mapping(uint256 => mapping(address => bool)) public creatorPool;
   
    event BrandRegistered(uint256 indexed brandNFTId, address indexed brandAddress, string indexed name, string metadataURI, uint256 NIB);
    event CreatorRegistered(uint256 indexed creatorNFTId, address indexed creatorAddress, string indexed name, string metadataURI);
    event CampaignCreated(
        uint256 indexed campaignNFTId, 
        address indexed ownerCampaign, 
        string indexed campaignName, 
        address approvedCreator, 
        uint256 stakedAmount, 
        uint256 campaignDeadline,
        string campaignMetadataURI
    );
    event CreatorAssigned(
        uint256 indexed campaignId,
        address indexed creatorAddress
    );
    event CreatorApply(
        uint256 indexed campaignId,
        address indexed creatorAddress
    );
    event SubmitTaskCreator(
        uint256 indexed campaignId,
        address indexed creatorAddress,
        string submitMetadataUri
    );
    event TaskSubmittedForReview(
        uint256 indexed campaignId,
        address indexed creatorAddress
    );
    event CreatorCancelledApplyForCampaign(uint256 indexed campaignId, address indexed creator);
    event CampaignApproved(
        uint256 indexed campaignId,
        address indexed approver
    );
    event ResolveCampaign(uint256 indexed campaignId, address indexed ownerCampaign, address indexed creatorAddress);

    // --- Modifiers ---
    // Memastikan caller adalah Brand yang terdaftar (memiliki Brand NFT)
    modifier onlyRegisteredBrand() {
        require(brandNFT.balanceOf(_msgSender()) > 0, "Caller is not a registered brand (no Brand NFT)");
        _;
    }

    // Memastikan caller adalah Creator yang terdaftar (memiliki Creator NFT)
    modifier onlyRegisteredCreator() {
        require(creatorNFT.balanceOf(_msgSender()) > 0, "Caller is not a registered creator (no Creator NFT)");
        _;
    }

    modifier appliedCampaign(uint256 _campaignId) {
        require (creatorPool[_campaignId][msg.sender] == true, "The caller has already been applied to this Campaign");
        _;
    }

    modifier onlyBrandOfCampaign(uint256 _campaignId) {
        (, address ownerCampaign,,,,,,) = campaignContract.campaigns(_campaignId);
        require(ownerCampaign == _msgSender(), "Caller is not the brand of this campaign");
        _;
    }

    modifier onlyCampaignCreator(uint256 _campaignId) {
        (,,address approvedCreator,,,,,) = campaignContract.campaigns(_campaignId);
        require(approvedCreator == _msgSender(), "Caller is not the creator of this campaign");
        _;
    }

    modifier onlyAdminOrBrandOfCampaign(uint256 _campaignId) {
        (, address ownerCampaign,,,,,,) = campaignContract.campaigns(_campaignId);
        require(owner() == _msgSender() || ownerCampaign == _msgSender(), "Caller is not admin or brand");
        _;
    }


    constructor(address _brandNFT, address _creatorNFT, address _campaignContract) Ownable(msg.sender) {
        brandNFT = BrandNFT(_brandNFT);
        creatorNFT = CreatorNFT(_creatorNFT);
        campaignContract = CampaignContract(_campaignContract);
    }

    function registerBrand(string calldata _instanceName, string calldata _metadataURI, uint256 _NIB) public {
        if(brandNFT.balanceOf(_msgSender()) > 0) {
            revert("The owner has already registered a brand (no Brand NFT)");
        }
        if(bytes(_instanceName).length == 0) {
            revert("Instance name cannot be empty.");
        }
        
        uint256 brandNFTId = brandNFT.mintBrandNFT(_msgSender(), _instanceName, _metadataURI, _NIB);

        emit BrandRegistered(brandNFTId, msg.sender, _instanceName, _metadataURI, _NIB);
    }

    function registerCreator(string calldata _name, string calldata _metadataURI) public {
        if(creatorNFT.balanceOf(_msgSender()) > 0) {
            revert("The owner has already registered a creator (no Creator NFT)");
        }
        if(bytes(_name).length == 0) {
            revert("Creator name cannot be empty.");
        }

        uint256 creatorNFTId = creatorNFT.mintCreatorNFT(_msgSender(), _name, _metadataURI);

        emit CreatorRegistered(creatorNFTId, msg.sender, _name, _metadataURI);
    }

    function createCampaign(string calldata _campaignName, uint256 _rewards, uint256 _deadline, string calldata _metadataURI) public onlyRegisteredBrand {
        if(_msgSender() == address(0))  {
            revert("Caller should be the owner.");
        }
        if(bytes(_campaignName).length == 0) {
            revert("Campaign name cannot be empty");
        }
        
        uint256 campaignNFTId = campaignContract.mintCampaignNFT(_msgSender(), _campaignName, _rewards, _deadline, _metadataURI);

        emit CampaignCreated(campaignNFTId, _msgSender(), _campaignName, address(0), _rewards, _deadline, _metadataURI);
    }

    function creatorApplyToCampaign(uint256 _campaignId) public onlyRegisteredCreator {
        campaignContract.creatorApplyToCampaign(_campaignId, _msgSender());

        creatorPool[_campaignId][_msgSender()] = true;
        
        emit CreatorApply(_campaignId, _msgSender());
    }

    function assignCreatorToCampaign(uint256 _campaignId, address _creatorAddress) public onlyBrandOfCampaign(_campaignId) {
        campaignContract.assignCreatorToCampaign(_campaignId, _creatorAddress);
 
       emit CreatorAssigned( _campaignId, _creatorAddress);
       emit CampaignApproved(_campaignId, msg.sender);
    }

    function submitTaskCampaignCreator(uint256 _campaignId, string memory _submitMetadataUri) public onlyCampaignCreator(_campaignId) {
        campaignContract.submitTaskCampaignCreator(_campaignId, _submitMetadataUri);

        emit SubmitTaskCreator(_campaignId, msg.sender, _submitMetadataUri);
    }

    function cancelApply(uint256 _campaignId) public appliedCampaign(_campaignId) {
        campaignContract.cancelApply(_campaignId, msg.sender);

        emit CreatorCancelledApplyForCampaign(_campaignId, msg.sender);
    }

    function resolveCampaign(uint256 _campaignId) public onlyAdminOrBrandOfCampaign(_campaignId) {
        (,address ownerCampaign, address approvedCreator,,, uint256 campaignDeadline,,string memory submitMetadataUri) = campaignContract.campaigns(_campaignId);
        if (approvedCreator == address(0)) revert("The creator is not approved for this Campaign yet.");
        if(bytes(submitMetadataUri).length == 0) revert("The creator not have been submitted the campaign");
        if(block.timestamp <= campaignDeadline) revert("Cannot resolve the campaign until deadline");

        campaignContract.resolveCampaign(_campaignId);

        emit ResolveCampaign(_campaignId, ownerCampaign, approvedCreator);
    }
}