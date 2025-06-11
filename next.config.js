/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['play2048.co', 'tetris.com', 'www.google.com', 'www.chess.com', 'sudoku.com', 'king.com', 'www.washingtonpost.com', 'scratch.mit.edu', 'www.nytimes.com', 'agar.io', 'slither.io'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}

module.exports = nextConfig 