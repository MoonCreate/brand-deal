// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CampaignNFT is ERC1155URIStorage, Ownable {
    uint256 private _newTokenId;

    event CampaignNFTMinted(uint256 indexed tokenId, address indexed owner, uint256 indexed campaignInstanceId, string metadataURI);
    event CreatorAssignedToCampaign(uint256 indexed tokenId, address indexed owner, uint256 indexed campaignInstanceId, string metadataURI);

    constructor(string memory _uri)
        ERC1155(_uri)
        Ownable(msg.sender)
    {}

    /**
     * @dev Mint Campaign NFT. Hanya dapat dipanggil oleh owner (PlatformCore).
     * @param to Alamat Brand yang akan menerima NFT Campaign.
     * @param campaignInstanceId ID unik campaign dari PlatformCore.
     * @param _metadataURI URI metadata untuk NFT Campaign ini.
     */
    function mintCampaignNFT(address to, uint256 campaignInstanceId, string calldata _metadataURI)
        external
        onlyOwner
        returns (uint256)
    {
        require(to != address(0), "ERC721: mint to the zero address");
        require(campaignInstanceId > 0, "Campaign Instance ID must be valid");
        require(bytes(_metadataURI).length > 0, "Metadata URI cannot be empty");

        _newTokenId++;
        uint256 newItemId = _newTokenId;
        _mint(to, newItemId, 1, "");
        _setURI(newItemId, _metadataURI);

        emit CampaignNFTMinted(newItemId, to, campaignInstanceId, _metadataURI);
        return newItemId;
    }

    function mintCampaignToCreator(address to, uint256 campaignTokenId, uint256 campaignInstanceId) external onlyOwner {
        _mint(to, campaignTokenId, 1, "");
        emit CreatorAssignedToCampaign(campaignTokenId, to, campaignInstanceId, uri(campaignTokenId));
    }

    function burnBatch(address to, uint256[] calldata ids, uint256[] calldata values) external onlyOwner {
        _burnBatch(to, ids, values);
    }
}