module.exports = {
    async rewrites() {
        return [
            {
                source: '/api/upload',
                destination: '/server/api/upload'
            }
        ];
    }
};
