// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./BrandNFT.sol";
import "./CreatorNFT.sol";
import "./CampaignNFT.sol";

// Catatan: Contoh ini menggunakan Ether (native token) untuk stake/pembayaran.
// Jika ingin menggunakan ERC20, Anda perlu mengimpor SafeERC20 dan IERC20.

contract PlatformCore is Ownable {
    uint256 private _nextCampaignInstanceId; // Untuk ID unik setiap campaign yang dibuat

    // Alamat kontrak-kontrak NFT
    BrandNFT public brandNFT;
    CreatorNFT public creatorNFT;
    CampaignNFT public campaignNFT;

    address public platformWallet;
    uint256 public constant PLATFORM_COMMISSION_PERCENT = 5; // 5% komisi

    // Struktur data untuk Campaign (disimpan di PlatformCore, linked by Campaign NFT's tokenId)
    struct Campaign {
        address brandAddress;       // Alamat Brand yang membuat campaign
        uint256 stakedAmount;       // Jumlah dana yang di-stake oleh Brand
        address creatorAddress;     // Alamat Creator yang dipilih untuk campaign ini (0x0 jika belum ada)
        uint256 campaignDeadline;   // Deadline untuk persetujuan / penyelesaian campaign (timestamp)
        bool isApproved;            // Apakah campaign/tugas sudah disetujui
        bool isCompletedAndPaid;    // Apakah campaign sudah diselesaikan dan dibayar
        uint256 campaignNFTId;
    }

    // Mapping: Campaign Instance ID => Campaign details
    mapping(uint256 => Campaign) public campaigns;
    // Mapping: Campaign NFT tokenId => Campaign Instance ID (untuk memudahkan lookup)
    mapping(uint256 => uint256) public campaignNFTIdToInstanceId;
    mapping(uint256 => mapping(address => bool)) public creatorPool;

    // --- Events ---
    event BrandRegistered(uint256 indexed brandNFTId, address indexed brandAddress, string name, string metadataURI);
    event CreatorRegistered(uint256 indexed creatorNFTId, address indexed creatorAddress, string name, string metadataURI);
    event CampaignCreated(
        uint256 indexed campaignInstanceId,
        uint256 indexed campaignNFTId,
        address indexed brandAddress,
        uint256 stakedAmount,
        uint256 campaignDeadline,
        string campaignMetadataURI
    );
    event CreatorAssigned(
        uint256 indexed campaignInstanceId,
        address indexed creatorAddress,
        uint256 deadline
    );
    event CreatorApply(
        uint256 indexed campaignInstanceId,
        address indexed creatorAddress
    );
    event CreatorWithdraw(
        uint256 indexed campaignInstanceId,
        address indexed creatorAddress
    );
    event TaskSubmittedForReview(
        uint256 indexed campaignInstanceId,
        address indexed creatorAddress
    );
    event CampaignApproved(
        uint256 indexed campaignInstanceId,
        address indexed approver,
        uint256 amountTransferred
    );
    event CampaignDisputeOrTimeout(
        uint256 indexed campaignInstanceId,
        string reason
    );
    event PlatformCommissionPaid(
        uint256 indexed campaignInstanceId,
        uint256 commissionAmount
    );

    // --- Constructor ---
    constructor(
        address _brandNFTAddress,
        address _creatorNFTAddress,
        address _campaignNFTAddress
    )
        Ownable(msg.sender)
    {
        brandNFT = BrandNFT(_brandNFTAddress);
        creatorNFT = CreatorNFT(_creatorNFTAddress);
        campaignNFT = CampaignNFT(_campaignNFTAddress);
    }

    // --- Modifiers ---
    // Memastikan caller adalah Brand yang terdaftar (memiliki Brand NFT)
    modifier onlyRegisteredBrand() {
        require(brandNFT.balanceOf(_msgSender()) > 0, "Caller is not a registered brand (no Brand NFT)");
        // Anda bisa menambahkan verifikasi tambahan jika Brand bisa punya banyak NFT
        // misalnya, cek apakah Brand NFT pertama mereka adalah yang dimaksud
        _;
    }

    // Memastikan caller adalah Creator yang terdaftar (memiliki Creator NFT)
    modifier onlyRegisteredCreator() {
        require(creatorNFT.balanceOf(_msgSender()) > 0, "Caller is not a registered creator (no Creator NFT)");
        _;
    }

    modifier onlyBrandOfCampaign(uint256 _campaignInstanceId) {
        require(campaigns[_campaignInstanceId].brandAddress == _msgSender(), "Caller is not the brand of this campaign");
        _;
    }

    modifier onlyCreatorOfAssignedCampaign(uint256 _campaignInstanceId) {
        require(campaigns[_campaignInstanceId].creatorAddress == _msgSender(), "Caller is not the creator assigned to this campaign");
        _;
    }

    modifier onlyAdminOrBrandOfCampaign(uint256 _campaignInstanceId) {
        require(owner() == _msgSender() || campaigns[_campaignInstanceId].brandAddress == _msgSender(), "Caller is not admin or brand");
        _;
    }

    // --- User Registration Functions (Dipanggil oleh user untuk mendaftar) ---

    /**
     * @dev User mendaftar sebagai Brand. Kontrak akan memanggil BrandNFT untuk mint NFT.
     * @param _name Nama Brand.
     * @param _metadataURI URI metadata spesifik untuk NFT Brand ini.
     */
    function registerBrand(string calldata _name, string calldata _metadataURI) public {
        require(brandNFT.balanceOf(_msgSender()) == 0, "Address already registered as a brand");
        require(bytes(_name).length > 0, "Brand name cannot be empty");
        require(bytes(_metadataURI).length > 0, "Metadata URI cannot be empty");

        // Panggil kontrak BrandNFT untuk mint NFT ke _msgSender()
        // PlatformCore adalah owner dari BrandNFT, jadi ia bisa memanggil mintBrandNFT
        uint256 newBrandNFTId = brandNFT.mintBrandNFT(_msgSender(), _metadataURI);

        emit BrandRegistered(newBrandNFTId, _msgSender(), _name, _metadataURI);
    }

    /**
     * @dev User mendaftar sebagai Creator. Kontrak akan memanggil CreatorNFT untuk mint NFT.
     * @param _name Nama Creator.
     * @param _metadataURI URI metadata spesifik untuk NFT Creator ini.
     */
    function registerCreator(string calldata _name, string calldata _metadataURI) public {
        require(creatorNFT.balanceOf(_msgSender()) == 0, "Address already registered as a creator");
        require(bytes(_name).length > 0, "Creator name cannot be empty");
        require(bytes(_metadataURI).length > 0, "Metadata URI cannot be empty");

        // Panggil kontrak CreatorNFT untuk mint NFT ke _msgSender()
        uint256 newCreatorNFTId = creatorNFT.mintCreatorNFT(_msgSender(), _metadataURI);

        emit CreatorRegistered(newCreatorNFTId, _msgSender(), _name, _metadataURI);
    }

    // --- Core Platform Functions ---

    /**
     * @dev Brand membuat campaign baru, menyetor dana, dan sebuah Campaign NFT di-mint.
     * @param _campaignMetadataURI URI metadata untuk NFT Campaign ini.
     */
    function createCampaign(string calldata _campaignMetadataURI)
        public
        payable
        onlyRegisteredBrand // Hanya Brand yang terdaftar yang bisa membuat campaign
    {
        require(msg.value > 0, "Staked amount must be greater than zero");
        require(bytes(_campaignMetadataURI).length > 0, "Campaign metadata URI cannot be empty");

        _nextCampaignInstanceId++;
        uint256 currentCampaignInstanceId = _nextCampaignInstanceId;

        // Mint Campaign NFT melalui kontrak CampaignNFT
        uint256 newCampaignNFTId = campaignNFT.mintCampaignNFT(_msgSender(), currentCampaignInstanceId, _campaignMetadataURI);

        campaigns[currentCampaignInstanceId] = Campaign({
            brandAddress: _msgSender(),
            stakedAmount: msg.value,
            creatorAddress: address(0),
            campaignDeadline: 0,
            isApproved: false,
            isCompletedAndPaid: false,
            campaignNFTId: newCampaignNFTId
        });

        campaignNFTIdToInstanceId[newCampaignNFTId] = currentCampaignInstanceId;

        emit CampaignCreated(
            currentCampaignInstanceId,
            newCampaignNFTId,
            _msgSender(),
            msg.value,
            0,
            _campaignMetadataURI
        );
    }

    function creatorApplyToCampaign(uint256 campaignInstanceId) public onlyRegisteredCreator {
        creatorPool[campaignInstanceId][_msgSender()] = true;

        emit CreatorApply(campaignInstanceId, _msgSender());
    }
    
    function creatorWithdrawFromCampaign(uint256 campaignInstanceId) public onlyRegisteredCreator {
        delete creatorPool[campaignInstanceId][_msgSender()];
        emit CreatorWithdraw(campaignInstanceId, _msgSender());
    }

    /**
     * @dev Brand memilih creator untuk bergabung dengan campaign.
     * @param _campaignNFTId ID NFT Campaign yang akan diisi.
     * @param _creatorAddress Alamat creator yang dipilih.
     * @param _deadlineInDays hari deadline dihitung dari waktu assign + hari.
     */
    function assignCreatorToCampaign(uint256 _campaignNFTId, address _creatorAddress, uint256 _deadlineInDays)
        public
        onlyRegisteredBrand // Hanya Brand yang terdaftar yang bisa memanggil ini
    {
        uint256 campaignInstanceId = campaignNFTIdToInstanceId[_campaignNFTId];
        require(campaignInstanceId > 0, "Invalid Campaign NFT ID"); // Memastikan Campaign NFT valid
        Campaign storage campaign = campaigns[campaignInstanceId];

        // Memastikan caller adalah pemilik NFT Campaign ini
        require(campaignNFT.balanceOf(msg.sender, _campaignNFTId) > 0, "Caller is not the owner of this Campaign NFT");

        require(campaign.creatorAddress == address(0), "Creator already assigned for this campaign");
        require(_creatorAddress != address(0), "Creator address cannot be zero");
        require(creatorNFT.balanceOf(_creatorAddress) > 0, "Chosen address is not a registered creator");

        campaignNFT.mintCampaignToCreator(_creatorAddress, _campaignNFTId, campaignInstanceId);
        campaign.creatorAddress = _creatorAddress;
        campaign.campaignDeadline = block.timestamp + (_deadlineInDays *  1 days);

        emit CreatorAssigned(campaignInstanceId, _creatorAddress, campaign.campaignDeadline);
    }

    /**
     * @dev Creator mengajukan pekerjaan/tugas untuk ditinjau.
     * @param _campaignNFTId ID NFT Campaign yang relevan.
     */
    function submitTaskForReview(uint256 _campaignNFTId) public onlyRegisteredCreator {
        uint256 campaignInstanceId = campaignNFTIdToInstanceId[_campaignNFTId];
        require(campaignInstanceId > 0, "Invalid Campaign NFT ID");
        Campaign storage campaign = campaigns[campaignInstanceId];

        // Memastikan creator yang memanggil adalah creator yang ditugaskan untuk campaign ini
        require(campaign.creatorAddress == _msgSender(), "Only assigned creator can submit");
        require(!campaign.isApproved, "Campaign already approved");
        require(!campaign.isCompletedAndPaid, "Campaign already completed and paid");

        emit TaskSubmittedForReview(campaignInstanceId, _msgSender());
    }

    /**
     * @dev Brand atau Admin menyetujui tugas yang diajukan dan mentransfer dana.
     * @param _campaignNFTId ID NFT Campaign yang akan disetujui.
     */
    function approveCampaign(uint256 _campaignNFTId) public {
        uint256 campaignInstanceId = campaignNFTIdToInstanceId[_campaignNFTId];
        require(campaignInstanceId > 0, "Invalid Campaign NFT ID");
        Campaign storage campaign = campaigns[campaignInstanceId];

        // Memastikan caller adalah Brand pemilik campaign atau owner kontrak PlatformCore
        require(campaign.brandAddress == _msgSender() || owner() == _msgSender(), "Caller is not admin or brand of this campaign");
        require(campaign.creatorAddress != address(0), "Creator not assigned yet");
        require(!campaign.isApproved, "Campaign already approved");
        require(!campaign.isCompletedAndPaid, "Campaign already completed and paid");
        require(campaign.stakedAmount > 0, "No funds staked for this campaign");

        uint256 creatorPayment = campaign.stakedAmount - (campaign.stakedAmount * PLATFORM_COMMISSION_PERCENT / 100);
        uint256 platformCommission = campaign.stakedAmount - creatorPayment;

        // Transfer ke Creator
        (bool successCreator,) = payable(campaign.creatorAddress).call{value: creatorPayment}("");
        require(successCreator, "Failed to send Ether to creator");

        // Transfer komisi ke platform
        (bool successPlatform,) = payable(platformWallet).call{value: platformCommission}("");
        require(successPlatform, "Failed to send commission to platform");

        campaign.isApproved = true;
        campaign.isCompletedAndPaid = true;

        // Opsional: Transfer Campaign NFT dari Brand ke Creator sebagai bukti pekerjaan
        // atau burn Campaign NFT
        // campaignNFT.transferFrom(campaign.brandAddress, campaign.creatorAddress, _campaignNFTId);
        // campaignNFT.burn(_campaignNFTId); // Jika ingin membakar NFT campaign

        emit CampaignApproved(campaignInstanceId, _msgSender(), creatorPayment);
        emit PlatformCommissionPaid(campaignInstanceId, platformCommission);
    }

    /**
     * @dev Fungsi untuk menangani kasus deadline terlampaui tanpa persetujuan.
     * Admin atau Brand bisa memanggil ini.
     * Dalam skenario kompleks, ini bisa memicu sengketa atau pengembalian dana ke brand.
     */
    function handleDeadlineExceeded(uint256 _campaignNFTId) public {
        uint256 campaignInstanceId = campaignNFTIdToInstanceId[_campaignNFTId];
        require(campaignInstanceId > 0, "Invalid Campaign NFT ID");
        Campaign storage campaign = campaigns[campaignInstanceId];

        // Memastikan caller adalah Brand pemilik campaign atau owner kontrak PlatformCore
        require(campaign.brandAddress == _msgSender() || owner() == _msgSender(), "Caller is not admin or brand of this campaign");
        require(!campaign.isApproved, "Campaign already approved");
        require(!campaign.isCompletedAndPaid, "Campaign already completed and paid");
        require(block.timestamp > campaign.campaignDeadline, "Deadline not yet exceeded");

        // Kembalikan dana ke Brand
        (bool success,) = payable(campaign.brandAddress).call{value: campaign.stakedAmount}("");
        require(success, "Failed to return funds to brand");

        campaign.isCompletedAndPaid = true;
        emit CampaignDisputeOrTimeout(campaignInstanceId, "Deadline exceeded, funds returned to brand.");
    }

    /**
     * @dev Fungsi untuk menangani kasus deadline terlampaui tanpa persetujuan.
     * Admin atau Brand bisa memanggil ini.
     * Dalam skenario kompleks, ini bisa memicu sengketa atau pengembalian dana ke brand.
     */
    function handleCancelCampaign(uint256 _campaignNFTId) public {
        uint256 campaignInstanceId = campaignNFTIdToInstanceId[_campaignNFTId];
        require(campaignInstanceId > 0, "Invalid Campaign NFT ID");
        Campaign storage campaign = campaigns[campaignInstanceId];

        // Memastikan caller adalah Brand pemilik campaign atau owner kontrak PlatformCore
        require(campaign.brandAddress == _msgSender() || owner() == _msgSender(), "Caller is not admin or brand of this campaign");
        require(!campaign.isApproved, "Campaign already approved");
        require(!campaign.isCompletedAndPaid, "Campaign already completed and paid");
        require(campaign.campaignDeadline == 0, "Campaign already in progress");

        // Kembalikan dana ke Brand
        (bool success,) = payable(campaign.brandAddress).call{value: campaign.stakedAmount}("");
        require(success, "Failed to return funds to brand");

        campaign.isCompletedAndPaid = true;
        emit CampaignDisputeOrTimeout(campaignInstanceId, "Deadline exceeded, funds returned to brand.");
    }

    // Untuk menerima Ether (native token) ke kontrak (untuk staking)
    receive() external payable {}
    fallback() external payable {}
}