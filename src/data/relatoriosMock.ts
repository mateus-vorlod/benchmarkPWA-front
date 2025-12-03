import { RelatorioPWA } from '../types/relatorio';

export const RELATORIOS_MOCK: RelatorioPWA[] = [
  {
    _id: '692c7d23c9423fdc3357cd64',
    url: 'http://localhost:5173/',
    geradoEm: '2025-11-30T17:21:39.802Z',
    lighthouseVersion: '13.0.1',
    scores: {
      performance: 0.64,
      accessibility: 0.97,
      bestPractices: 1,
      seo: 0.92,
    },
    metrics: {
      firstContentfulPaint: 4666.63325,
      largestContentfulPaint: 7826.6132,
      speedIndex: 4666.63325,
      totalBlockingTime: 0,
      cumulativeLayoutShift: 0,
    },
    improvements: [
      {
        id: 'first-contentful-paint',
        title: 'First Contentful Paint',
        score: 0.13,
        displayValue: '4.7 s',
        description:
          'First Contentful Paint marks the time at which the first text or image is painted.',
      },
      {
        id: 'largest-contentful-paint',
        title: 'Largest Contentful Paint',
        score: 0.03,
        displayValue: '7.8 s',
        description:
          'Largest Contentful Paint marks the time at which the largest text or image is painted.',
      },
      {
        id: 'speed-index',
        title: 'Speed Index',
        score: 0.69,
        displayValue: '4.7 s',
        description:
          'Speed Index shows how quickly the contents of a page are visibly populated.',
      },
      {
        id: 'interactive',
        title: 'Time to Interactive',
        score: 0.44,
        displayValue: '7.8 s',
        description:
          'Time to Interactive is the amount of time it takes for the page to become fully interactive.',
      },
      {
        id: 'landmark-one-main',
        title: 'Document does not have a main landmark.',
        score: 0,
        displayValue: null,
        description:
          'One main landmark helps screen reader users navigate a web page.',
      },
      {
        id: 'robots-txt',
        title: 'robots.txt is not valid',
        score: 0,
        displayValue: '28 errors found',
        description:
          'If your robots.txt file is malformed, crawlers may not be able to understand how you want your website to be crawled or indexed.',
      },
      {
        id: 'bf-cache',
        title: 'Page prevented back/forward cache restoration',
        score: 0,
        displayValue: '1 failure reason',
        description:
          'The back/forward cache (bfcache) can speed up return navigations.',
      },
      {
        id: 'network-dependency-tree-insight',
        title: 'Network dependency tree',
        score: 0,
        displayValue: null,
        description:
          'Avoid chaining critical requests para melhorar o carregamento.',
      },
    ],
    runWarnings: [],
  },
  // Exemplo de outro relatório (pode clonar e mudar dados)
  {
    _id: '692c7d23c9423fdc3357cd65',
    url: 'https://web.dev/',
    geradoEm: '2025-11-30T18:10:00.000Z',
    lighthouseVersion: '13.0.1',
    scores: {
      performance: 0.9,
      accessibility: 0.98,
      bestPractices: 1,
      seo: 1,
    },
    metrics: {
      firstContentfulPaint: 1500,
      largestContentfulPaint: 2100,
      speedIndex: 1700,
      totalBlockingTime: 10,
      cumulativeLayoutShift: 0.01,
    },
    improvements: [],
    runWarnings: [],
  },
];
