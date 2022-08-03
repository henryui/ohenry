/* eslint-disable import/no-commonjs */
module.exports = function (api) {
  const config = {
    presets: [
      [
        '@babel/preset-env',
        {
          useBuiltIns: 'entry',
          corejs: 3,
          modules: false,
          shippedProposals: true,
        },
      ],
      '@babel/preset-react',
      [
        '@babel/preset-typescript',
        {
          allowDeclareFields: true,
        },
      ],
    ],
    plugins: [
      ['import', { libraryName: 'antd', libraryDirectory: 'es' }],
      ['babel-plugin-macros'],
    ],
  };

  if (api.env('development')) {
    const plugins = [
      'babel-plugin-styled-components',
      require.resolve('react-refresh/babel'),
    ];
    config.plugins.push(...plugins);
  }

  return config;
};
