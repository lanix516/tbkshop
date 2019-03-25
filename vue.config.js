module.exports = {
  outputDir: "./dist",
  publicPath: process.env.NODE_ENV === "production" ? "/" : "/",
  devServer: {
    proxy: {
      "/api": {
        target: "https://www.chengdongkeji.com",
        changeOrigin: true,
        ws: true,
        secure: false,
        pathRewrite: {
          "^/api": "/interface"
        }      
      }
    }
  }
};
