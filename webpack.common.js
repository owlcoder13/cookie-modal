const path = require('path');

module.exports = {
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            api: 'modern',
                            sassOptions: {
                                // Отключаем предупреждение о Legacy JS API
                                silenceDeprecations: ['legacy-js-api']
                            }
                        }
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    }
}; 