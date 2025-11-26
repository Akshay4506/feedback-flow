-- Create feedback table
CREATE TABLE feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  rating SMALLINT CHECK (rating BETWEEN 1 AND 5),
  message TEXT,
  status TEXT DEFAULT 'new', 
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert feedback (public form)
CREATE POLICY "Anyone can submit feedback" 
ON feedback 
FOR INSERT 
WITH CHECK (true);

-- Policy: Anyone can view feedback (for displaying submissions)
CREATE POLICY "Anyone can view feedback" 
ON feedback 
FOR SELECT 
USING (true);

-- Policy: Allow updates for status changes (admin functionality)
CREATE POLICY "Anyone can update feedback status" 
ON feedback 
FOR UPDATE 
USING (true);

-- Create index for faster queries
CREATE INDEX idx_feedback_created_at ON feedback(created_at DESC);
CREATE INDEX idx_feedback_status ON feedback(status);