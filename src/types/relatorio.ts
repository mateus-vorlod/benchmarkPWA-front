export interface LighthouseScores {
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
}

export interface LighthouseMetrics {
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  speedIndex: number;
  totalBlockingTime: number;
  cumulativeLayoutShift: number;
}

export interface Improvement {
  id: string;
  title: string;
  score: number | null;
  displayValue: string | null;
  description: string;
}

export interface RelatorioPWA {
  _id: string;
  url: string;
  geradoEm: string; // ISO string
  lighthouseVersion: string;
  scores: LighthouseScores;
  metrics: LighthouseMetrics;
  improvements: Improvement[];
  runWarnings: string[];
}
