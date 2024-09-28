CREATE DATABASE claimtrackr;

CREATE TABLE Users (
    user_id INT PRIMARY KEY,
    username VARCHAR(255) UNIQUE,
    password_hash VARCHAR(255),
    email VARCHAR(255),
    role ENUM('insured', 'contractor', 'adjuster', 'admin'),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
)

CREATE TABLE Claims (
    claim_id INT PRIMARY KEY,
    user_id INT FOREIGN KEY REFERENCES Users(user_id),
    claim_number VARCHAR(50) UNIQUE,
    property_address VARCHAR(255),
    claim_description TEXT,
    claim_amount DECIMAL(10, 2),
    status_id INT FOREIGN KEY REFERENCES ClaimStatus(status_id),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
)

CREATE TABLE ClaimStatus (
    status_id INT PRIMARY KEY,
    status_name VARCHAR(50) -- Examples: 'Filed', 'In Review', 'Approved', 'Rejected', 'Closed'
)

CREATE TABLE ThirdPartyAssignments (
    assignment_id INT PRIMARY KEY,
    claim_id INT FOREIGN KEY REFERENCES Claims(claim_id),
    user_id INT FOREIGN KEY REFERENCES Users(user_id),  -- Contractor or adjuster
    role ENUM('contractor', 'adjuster'),
    assigned_at TIMESTAMP
)

CREATE TABLE ClaimUpdates (
    update_id INT PRIMARY KEY,
    claim_id INT FOREIGN KEY REFERENCES Claims(claim_id),
    user_id INT FOREIGN KEY REFERENCES Users(user_id),  -- The user who made the update
    status_id INT FOREIGN KEY REFERENCES ClaimStatus(status_id),
    notes TEXT,
    updated_at TIMESTAMP
)

CREATE TABLE Documents (
    document_id INT PRIMARY KEY,
    claim_id INT FOREIGN KEY REFERENCES Claims(claim_id),
    file_path VARCHAR(255),
    uploaded_at TIMESTAMP
)
