module.exports = {
    pages: {
        index: {
            title: '東方夜魔傳（東方闇魔伝）',
            entry: 'src/main.js',
            template: 'public/index.html',
            filename: 'index.html',
        }
    },
    devServer: {
        disableHostCheck: true
    },
    publicPath: process.env.NODE_ENV === 'production'
        ? '/edu2021/'
        : '/'
};
