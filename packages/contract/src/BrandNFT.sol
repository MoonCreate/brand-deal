// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract BrandNFT is ERC721URIStorage, Ownable {
    uint256 private _newTokenId;

    struct Brand {
        uint256 id;
        address brandOwner;
        string instanceName;
        string uri;
        uint256 NIB;
    }

    mapping(uint256 => Brand) public existingBrand;
    mapping(string => bool) public isBrandNameExist;
    mapping(uint256 => bool) public isNIBExist;

    event BrandNFTMinted(
        uint256 indexed tokenId,
        address indexed owner,
        string indexed instanceName,
        string metadataURI
    );

    constructor() ERC721("Brand Profile NFT", "BRAND") Ownable(msg.sender) {}

    function mintBrandNFT(
        address to,
        string calldata _instanceName,
        string calldata _metadataURI,
        uint256 _NIB
    ) external returns (uint256) {
        if (to == address(0)) {
            revert("ERC721: mint to the zero address");
        }
        if (bytes(_metadataURI).length == 0) {
            revert("Metadata URI cannot be empty");
        }
        if (isBrandNameExist[_instanceName] == true) {
            revert("Brand Name already exist");
        }
        if (isNIBExist[_NIB] == true) {
            revert("Brand Name already exist");
        }

        _newTokenId++;

        Brand memory brand = Brand({
            id: _newTokenId,
            brandOwner: to,
            instanceName: _instanceName,
            uri: _metadataURI,
            NIB: _NIB
        });

        existingBrand[_newTokenId] = brand;
        isBrandNameExist[_instanceName] = true;
        isNIBExist[_NIB] = true;

        _mint(to, _newTokenId);
        _setTokenURI(_newTokenId, _metadataURI);

        emit BrandNFTMinted(_newTokenId, to, _instanceName, _metadataURI);
        return _newTokenId;
    }
}
