module.exports = {
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.(ts|tsx)$': [
            'babel-jest',
            {
                presets: [
                    '@babel/preset-env',
                    '@babel/preset-typescript'
                ],
            },
        ],
        '^.+\\.m?js$': [
            'babel-jest', 
            {
                presets: ['@babel/preset-env']
            }
        ],
    },
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': '<rootDir>/__mocks__/styleMock.js',
    },
    setupFilesAfterEnv: ['./jest.setup.js'],
    transformIgnorePatterns: [
        "node_modules/(?!(@testing-library/preact))"
    ],
}; 