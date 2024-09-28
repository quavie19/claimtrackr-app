POST /api/claims/:claimId/documents         // Upload a document related to a claim (insured, contractor, adjuster)
GET /api/claims/:claimId/documents          // Get all documents for a claim
GET /api/claims/:claimId/documents/:docId   // Download a specific document
DELETE /api/claims/:claimId/documents/:docId // Delete a document (admin or the uploader)
