// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BrandNFT is ERC721URIStorage, Ownable {
    uint256 private _newTokenId;

    event BrandNFTMinted(uint256 indexed tokenId, address indexed owner, string metadataURI);

    constructor()
        ERC721("Brand Profile NFT", "BRAND")
        Ownable(msg.sender)
    {}

    /**
     * @dev Mint Brand NFT. Hanya dapat dipanggil oleh owner (PlatformCore).
     * @param to Alamat yang akan menerima NFT.
     * @param _metadataURI URI metadata untuk NFT ini.
     */
    function mintBrandNFT(address to, string calldata _metadataURI)
        external
        onlyOwner // PlatformCore akan menjadi owner dari kontrak ini setelah deploy
        returns (uint256)
    {
        require(to != address(0), "ERC721: mint to the zero address");
        require(bytes(_metadataURI).length > 0, "Metadata URI cannot be empty");

        _newTokenId++;
        _mint(to, _newTokenId);
        _setTokenURI(_newTokenId, _metadataURI); // Menyimpan URI metadata spesifik untuk NFT ini

        emit BrandNFTMinted(_newTokenId, to, _metadataURI);
        return _newTokenId;
    }

    function setTokenURI(uint256 _tokenId, string calldata _uri) external onlyOwner {
        _setTokenURI(_tokenId, _uri);
    }
}