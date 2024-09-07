module.exports = {
  reactStrictMode: true,
  // I don't want it to run when compiling as I trust the CI stage of the pipeline and Husky.
  ignoreDuringBuilds: true,
};
// module.exports = {
//   webpack: (config) => {
//     config.module.rules.push({
//       test: /postcss\.config\.js$/,
//       use: [
//         'postcss-loader',
//         require('tailwindcss/webpack-plugin')(),
//       ],
//     });

//     return config;
//   },
// };
