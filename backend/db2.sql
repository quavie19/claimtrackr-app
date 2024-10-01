-- customer frontend application

-- 1. Customers Table
CREATE TABLE Customers (
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone_number VARCHAR(15),
    zip_code VARCHAR(10),
    is_active BOOLEAN DEFAULT FALSE,  -- To track if the account is activated
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Policies Table (Recommended)
CREATE TABLE Policies (
    policy_id SERIAL PRIMARY KEY,
    customer_id INT NOT NULL REFERENCES Customers(user_id) ON DELETE CASCADE,
    policy_number VARCHAR(255) UNIQUE NOT NULL,
    policy_type VARCHAR(50),  -- E.g., Auto, Home, Health
    start_date DATE NOT NULL,
    end_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Adjusters Table
CREATE TABLE Adjusters (
    adjuster_id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone_number VARCHAR(15),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. ClaimStatus Table
CREATE TABLE ClaimStatus (
    status_id SERIAL PRIMARY KEY,
    status_name VARCHAR(50) UNIQUE NOT NULL -- Examples: 'Filed', 'In Review', 'Approved', 'Rejected', 'Closed'
);

-- Populate ClaimStatus Table
INSERT INTO ClaimStatus (status_name) VALUES
('Filed'),
('In Review'),
('Approved'),
('Rejected'),
('Closed');

-- 5. Claims Table
CREATE TABLE Claims (
    claim_id SERIAL PRIMARY KEY,
    policy_id INT NOT NULL REFERENCES Policies(policy_id) ON DELETE CASCADE,
    claim_number VARCHAR(50) UNIQUE NOT NULL,
    claim_description TEXT,
    adjuster_id INT REFERENCES Adjusters(adjuster_id),
    status_id INT REFERENCES ClaimStatus(status_id),
    date_of_loss DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. ENUM Type for ClaimProgress
CREATE TYPE progress AS ENUM (
    'Claim Received',
    'Initial Contact Pending',
    'Inspection Pending',
    'Coverage Pending',
    'Finalizing Claim'
);

-- 7. ClaimProgress Table
CREATE TABLE ClaimProgress (
    update_id SERIAL PRIMARY KEY,
    claim_id INT NOT NULL REFERENCES Claims(claim_id) ON DELETE CASCADE,
    progress_stage progress NOT NULL,
    notes TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 8. Documents Table
CREATE TABLE Documents (
    document_id SERIAL PRIMARY KEY,
    claim_id INT NOT NULL REFERENCES Claims(claim_id) ON DELETE CASCADE,
    file_path VARCHAR(255) NOT NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 9. Messages Table (Optional)
CREATE TABLE Messages (
    message_id SERIAL PRIMARY KEY,
    claim_id INT NOT NULL REFERENCES Claims(claim_id) ON DELETE CASCADE,
    sender_type VARCHAR(10) NOT NULL CHECK (sender_type IN ('Customer', 'Adjuster')),
    sender_id INT NOT NULL,  -- Could reference Customers(user_id) or Adjusters(adjuster_id)
    message_text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Example Indexes
CREATE INDEX idx_claims_policy_id ON Claims(policy_id);
CREATE INDEX idx_claims_adjuster_id ON Claims(adjuster_id);
CREATE INDEX idx_claims_status_id ON Claims(status_id);


-- THIRD PARTY SIDE 

CREATE TYPE third_party_role AS ENUM ('contractor', 'adjuster');
CREATE TABLE ThirdPartyAssignments (
    assignment_id INT PRIMARY KEY,
    claim_id INT REFERENCES Claims(claim_id),
    user_id INT REFERENCES Users(user_id),  -- Contractor or adjuster
    role third_party_role NOT NULL,
    assigned_at TIMESTAMP
);