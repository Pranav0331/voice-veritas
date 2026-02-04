-- Create the detections table for storing voice analysis results
CREATE TABLE public.detections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    language TEXT NOT NULL CHECK (language IN ('Tamil', 'English', 'Hindi', 'Malayalam', 'Telugu')),
    classification TEXT NOT NULL CHECK (classification IN ('AI_GENERATED', 'HUMAN')),
    confidence_score NUMERIC(3,2) NOT NULL CHECK (confidence_score >= 0.0 AND confidence_score <= 1.0),
    explanation TEXT NOT NULL,
    audio_filename TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.detections ENABLE ROW LEVEL SECURITY;

-- Allow public read access for history
CREATE POLICY "Anyone can read detections"
ON public.detections
FOR SELECT
USING (true);

-- Allow public insert for detection results
CREATE POLICY "Anyone can insert detections"
ON public.detections
FOR INSERT
WITH CHECK (true);