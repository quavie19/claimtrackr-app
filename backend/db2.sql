CREATE TYPE user_role AS ENUM ('insured', 'contractor', 'adjuster', 'admin');

CREATE TABLE Customers (
    user_id SERIAL PRIMARY KEY,
    full_name VARCHAR(255),
    username VARCHAR(255) UNIQUE,
    password_hash VARCHAR(255),
    email VARCHAR(255),
    policy_number VARCHAR(255) UNIQUE,
    phone_number VARCHAR(15),
    zip_code VARCHAR(10),
    is_active BOOLEAN DEFAULT FALSE,  -- To track if the account is activated
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE Claims (
    claim_id INT PRIMARY KEY,
    user_id INT REFERENCES Users(user_id),  -- Foreign key for user_id
    claim_number VARCHAR(50) UNIQUE,
    claim_description TEXT,
    status_id INT REFERENCES ClaimStatus(status_id),  -- Foreign key for status_id
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
);

CREATE TYPE claim_status AS ENUM ('Iniital Contact Pending', 'Inpsection Pending', 'Pending required Documents', 'Estimate being written by adjuster', 'Estimate being reviewed', 'Ready to settle' 'Approved' 'Denied');
CREATE TABLE ClaimStatus (
    status_id INT PRIMARY KEY,
    status_name VARCHAR(50) -- Examples: 'Filed', 'In Review', 'Approved', 'Rejected', 'Closed'
)

CREATE TYPE third_party_role AS ENUM ('contractor', 'adjuster');
CREATE TABLE ThirdPartyAssignments (
    assignment_id INT PRIMARY KEY,
    claim_id INT REFERENCES Claims(claim_id),
    user_id INT REFERENCES Users(user_id),  -- Contractor or adjuster
    role third_party_role NOT NULL,
    assigned_at TIMESTAMP
);

CREATE TABLE ClaimUpdates (
    update_id INT PRIMARY KEY,
    claim_id INT REFERENCES Claims(claim_id),
    user_id INT REFERENCES Users(user_id),  -- The user who made the update
    status_id INT REFERENCES ClaimStatus(status_id),
    notes TEXT,
    updated_at TIMESTAMP
);

CREATE TABLE Documents (
    document_id INT PRIMARY KEY,
    claim_id INT REFERENCES Claims(claim_id),
    file_path VARCHAR(255),
    uploaded_at TIMESTAMP
);
