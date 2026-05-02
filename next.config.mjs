/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export', // Required for GitHub Pages static hosting
    images: {
      unoptimized: true, // GitHub Pages doesn't support the default Next.js Image Optimization
    },
    // If your repository name is NOT <username>.github.io, 
    // uncomment the next line and add your repository name:
    // basePath: '/your-repo-name', 
  };
  
  export default nextConfig;