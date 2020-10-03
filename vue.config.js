module.exports = {
  devServer: {
    writeToDisk: true,
    host: "localhost",
    port: 3001,
    headers: { "Access-Control-Allow-Origin": "*" },
    proxy: {
      "^/api": {
        target: "http://localhost:3000",
        ws: true,
        changeOrigin: true,
      },
    },
  },
};
