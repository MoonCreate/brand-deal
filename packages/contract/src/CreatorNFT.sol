// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CreatorNFT is ERC721URIStorage, Ownable {
    uint256 private _newTokenId;

    event CreatorNFTMinted(uint256 indexed tokenId, address indexed owner, string metadataURI);

    constructor()
        ERC721("Creator Profile NFT", "CREATOR")
        Ownable(msg.sender)
    {}

    /**
     * @dev Mint Creator NFT. Hanya dapat dipanggil oleh owner (PlatformCore).
     * @param to Alamat yang akan menerima NFT.
     * @param _metadataURI URI metadata untuk NFT ini.
     */
    function mintCreatorNFT(address to, string calldata _metadataURI)
        external
        onlyOwner // PlatformCore akan menjadi owner dari kontrak ini setelah deploy
        returns (uint256)
    {
        require(to != address(0), "ERC721: mint to the zero address");
        require(bytes(_metadataURI).length > 0, "Metadata URI cannot be empty");

        _newTokenId++;
        uint256 newItemId = _newTokenId;
        _mint(to, newItemId);
        _setTokenURI(newItemId, _metadataURI); // Menyimpan URI metadata spesifik untuk NFT ini

        emit CreatorNFTMinted(newItemId, to, _metadataURI);
        return newItemId;
    }
    
    function setTokenURI(uint256 _tokenId, string calldata _uri) external onlyOwner {
        _setTokenURI(_tokenId, _uri);
    }
}