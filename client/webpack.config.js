const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    //模式
    mode : "development",
    //入口
    entry : "./app/main.js",
    //出口
    output : {
        publicPath : "xuni",
        filename : "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: "style-loader" // creates style nodes from JS strings
                    }, 
                    {
                        loader: "css-loader" // translates CSS into CommonJS
                    }, 
                    {
                        loader: "less-loader" // compiles Less to CSS
                    }
                ]
            }
        ]
    },
    plugins: [
        // 请确保引入这个插件！
        new VueLoaderPlugin()
    ],
    resolve : {
        alias : {
            "vue$": "vue/dist/vue.esm.js"
        },
        //默认首页
        mainFiles: ['index','Index'],
        //省略拓展名，自动检测拓展名
        extensions: [".js", ".vue"]
    },
    //... 设置代理跨域
    devServer: {
        proxy: {
            '/api': {
            target: 'http://localhost:3000',
            pathRewrite: {'^/api' : ''}
            }
        }
    }
}