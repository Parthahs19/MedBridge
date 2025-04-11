// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract MedBridge {
    
    address public owner;

    enum Role { None, Admin, Doctor, Patient }

    struct MedicalRecord {
        string ipfsHash;
        address uploadedBy;
        uint256 timestamp;
    }

    mapping(address => Role) public roles;
    mapping(address => MedicalRecord[]) private patientRecords;

    event RecordAdded(address indexed patient, string ipfsHash, address indexed doctor);
    event RoleAssigned(address indexed user, Role role);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only contract owner can perform this action");
        _;
    }

    modifier onlyAdmin() {
        require(roles[msg.sender] == Role.Admin, "Only admin can perform this action");
        _;
    }

    modifier onlyDoctorOrAdmin() {
        require(
            roles[msg.sender] == Role.Admin || roles[msg.sender] == Role.Doctor,
            "Only admin or doctor can add records"
        );
        _;
    }

    constructor() {
        owner = msg.sender;
        roles[msg.sender] = Role.Admin; // Contract creator is the first Admin
    }

    // Admin assigns roles
    function assignRole(address user, Role role) external onlyAdmin {
        require(role != Role.None, "Invalid role");
        roles[user] = role;
        emit RoleAssigned(user, role);
    }

    // Doctor/Admin adds a record for patient
    function addRecord(address patient, string memory ipfsHash) public onlyDoctorOrAdmin {
        require(roles[patient] == Role.Patient, "Can only add records for patients");
        patientRecords[patient].push(MedicalRecord(ipfsHash, msg.sender, block.timestamp));
        emit RecordAdded(patient, ipfsHash, msg.sender);
    }

    // View records (patient sees their own, Admin/Doctor can access any)
    function getRecords(address patient) public view returns (MedicalRecord[] memory) {
        require(
            msg.sender == patient || roles[msg.sender] == Role.Admin || roles[msg.sender] == Role.Doctor,
            "Not authorized to view records"
        );
        return patientRecords[patient];
    }

    // Optional: View own role
    function myRole() public view returns (Role) {
        return roles[msg.sender];
    }
}
