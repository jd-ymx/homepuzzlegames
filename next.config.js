/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['play2048.co', 'tetris.com', 'www.google.com', 'www.chess.com', 'sudoku.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}

module.exports = nextConfig 