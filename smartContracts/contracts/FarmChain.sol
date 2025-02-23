// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FarmChain {
    address public owner;

    struct Farmer {
        address farmerAddress;
        string name;
        string location; // Human-readable location
        int latitude;    // Latitude in degrees
        int longitude;   // Longitude in degrees
        bool isRegistered;
    }

    struct Consumer {
        address consumerAddress;
        string name;
        string location; // Human-readable location
        int latitude;    // Latitude in degrees
        int longitude;   // Longitude in degrees
        bool isRegistered;
    }

    struct Product {
        uint id;
        string name;
        uint basePrice;   // Base price in Wei
        string description;
        string location;  // Farm location
        address payable farmer;
        bool sold;
        uint deliveryRange; // Maximum delivery range in kilometers
    }

    uint public productCount = 0;
    uint public deliveryFeePerKm = 1e15; // Default: 0.001 ETH per km

    mapping(address => Farmer) public farmers;
    mapping(address => Consumer) public consumers;
    mapping(uint => Product) public products;

    event FarmerRegistered(address indexed farmerAddress, string name);
    event ConsumerRegistered(address indexed consumerAddress, string name);
    event ProductRegistered(uint indexed productId, string name, uint basePrice);
    event ProductPurchased(uint indexed productId, address indexed buyer, uint finalPrice);
    event DeliveryFeeUpdated(uint newFee);

    modifier onlyFarmer() {
        require(farmers[msg.sender].isRegistered, "Only registered farmers can perform this action");
        _;
    }

    modifier onlyConsumer() {
        require(consumers[msg.sender].isRegistered, "Only registered consumers can perform this action");
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only contract owner can perform this action");
        _;
    }

    constructor() {
        owner = msg.sender; // Set contract owner
    }

    // Function to register a farmer with geolocation data
    function registerFarmer(string memory _name, string memory _location, int _latitude, int _longitude) public {
        require(!farmers[msg.sender].isRegistered, "Farmer already registered");
        
        farmers[msg.sender] = Farmer({
            farmerAddress: msg.sender,
            name: _name,
            location: _location,
            latitude: _latitude,
            longitude: _longitude,
            isRegistered: true
        });

        emit FarmerRegistered(msg.sender, _name);
    }

    // Function to register a consumer with geolocation data
    function registerConsumer(string memory _name, string memory _location, int _latitude, int _longitude) public {
        require(!consumers[msg.sender].isRegistered, "Consumer already registered");

        consumers[msg.sender] = Consumer({
            consumerAddress: msg.sender,
            name: _name,
            location: _location,
            latitude: _latitude,
            longitude: _longitude,
            isRegistered: true
        });

        emit ConsumerRegistered(msg.sender, _name);
    }

    // Function for farmers to register a product with delivery range
    function registerProduct(
        string memory _name,
        uint _basePrice,
        string memory _description,
        string memory _location,
        uint _deliveryRange
    ) public onlyFarmer {
        require(_basePrice > 0, "Base price must be greater than zero");

        productCount++;
        
        products[productCount] = Product({
            id: productCount,
            name: _name,
            basePrice: _basePrice,
            description: _description,
            location: _location,
            farmer: payable(msg.sender),
            sold: false,
            deliveryRange: _deliveryRange
        });

        emit ProductRegistered(productCount, _name, _basePrice);
    }

    // Function for consumers to buy a product with distance-based pricing
    function buyProduct(uint _id) public payable onlyConsumer {
        Product storage product = products[_id];
        
        require(!product.sold, "Product already sold");

        Farmer memory farmer = farmers[product.farmer];
        Consumer memory consumer = consumers[msg.sender];

        uint distance = calculateDistance(farmer.latitude, farmer.longitude, consumer.latitude, consumer.longitude);
        
        require(distance <= product.deliveryRange, "Product cannot be delivered to your location");

        uint finalPrice = product.basePrice + (distance * deliveryFeePerKm);

        require(msg.value >= finalPrice, "Insufficient funds");

        product.farmer.transfer(msg.value);
        
        product.sold = true;

        emit ProductPurchased(_id, msg.sender, finalPrice);
    }

    // Function to set delivery fee per km (Only owner can call this)
    function setDeliveryFeePerKm(uint _fee) public onlyOwner {
        require(_fee > 0, "Delivery fee must be greater than zero");
        deliveryFeePerKm = _fee;
        emit DeliveryFeeUpdated(_fee);
    }

    // Helper function to calculate distance using Haversine formula approximation
    function calculateDistance(int lat1, int lon1, int lat2, int lon2) internal pure returns (uint) {
        uint R = 6371; // Earth's radius in km

        int dLat = (lat2 - lat1) * 314159265 / 180000000; // Convert degrees to radians
        int dLon = (lon2 - lon1) * 314159265 / 180000000;

        uint a = uint(sin(dLat / 2) * sin(dLat / 2) +
                cos(lat1 * 314159265 / 180000000) * cos(lat2 * 314159265 / 180000000) *
                sin(dLon / 2) * sin(dLon / 2));

        uint c = 2 * atan2(sqrt(a), sqrt(1 - a));

        return R * c; // Distance in km
    }

    // Safe mathematical functions
    function sin(int x) internal pure returns (int) {
        return int(1e18 * (x - (x ** 3) / 6 + (x ** 5) / 120));
    }

    function cos(int x) internal pure returns (int) {
        return int(1e18 * (1 - (x ** 2) / 2 + (x ** 4) / 24));
    }

    function sqrt(uint x) internal pure returns (uint y) {
        if (x == 0) return 0;
        uint z = (x + 1) / 2;
        y = x;
        while (z < y) {
            y = z;
            z = (x / z + z) / 2;
        }
    }

    function atan2(uint y, uint x) internal pure returns (uint) {
        if (x == 0) return y > 0 ? 1570796327 : 0;
        return (y * 1000000000) / x;
    }
}