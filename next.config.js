const nextConfig = {
    /*
    crossOrigin: 'anonymous',
    async headers() {
        return [
            {
                source: "/api/:path*",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "http://localhost:3000" },
                    { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
                    { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
                ]
            }
        ]
    },

    images: {
        domains: ['github.com', 'avatars.githubusercontent.com'], // Add any other domains you need
    },
    */

    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: '**',
          },
        ],
      },
}

module.exports = nextConfig