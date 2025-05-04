// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract MedBridgeReport {
    struct ReportMetadata {
        string reportId;
        string ipfsCid;
        address patientWallet;
        address sharedWith;
        bool isShared;
    }

    mapping(string => ReportMetadata) public reports; // reportId → metadata

    event ReportUploaded(string reportId, string ipfsCid, address patientWallet);
    event AccessGranted(string reportId, address sharedWith);
    event AccessRevoked(string reportId);

    // Upload metadata CID
    function uploadReport(string memory _reportId, string memory _ipfsCid) public {
        require(bytes(reports[_reportId].reportId).length == 0, "Report already exists");

        reports[_reportId] = ReportMetadata({
            reportId: _reportId,
            ipfsCid: _ipfsCid,
            patientWallet: msg.sender,
            sharedWith: address(0),
            isShared: false
        });

        emit ReportUploaded(_reportId, _ipfsCid, msg.sender);
    }

    // Grant access to another hospital
    function grantAccess(string memory _reportId, address _sharedWith) public {
        require(reports[_reportId].patientWallet == msg.sender, "Only owner can grant access");

        reports[_reportId].sharedWith = _sharedWith;
        reports[_reportId].isShared = true;

        emit AccessGranted(_reportId, _sharedWith);
    }

    // Revoke access
    function revokeAccess(string memory _reportId) public {
        require(reports[_reportId].patientWallet == msg.sender, "Only owner can revoke access");

        reports[_reportId].sharedWith = address(0);
        reports[_reportId].isShared = false;

        emit AccessRevoked(_reportId);
    }

    // View metadata (only patient or sharedWith)
    function viewReport(string memory _reportId) public view returns (string memory, string memory, address, bool) {
        ReportMetadata memory report = reports[_reportId];
        require(
            msg.sender == report.patientWallet || msg.sender == report.sharedWith,
            "Not authorized"
        );
        return (report.reportId, report.ipfsCid, report.sharedWith, report.isShared);
    }
}
