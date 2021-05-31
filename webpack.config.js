/*
берем из нпм модулей пас для того что бы задать путь к файлам для вебпака.
Этот модуль будет возвращать строчку с абсолютным путем
*/
const path = require('path');
/*
плагин для осчистки файлов вебпака
*/
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
/*
плагин для хтмл билда
*/
const HtmlWebpackPlugin = require('html-webpack-plugin');
/*
плагин для фавиконок
*/
const CopyPlugin = require('copy-webpack-plugin');
/*
минификация цсс, сбор ее из разных файлов так же джиэс файлов и т.д.
*/
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

/*
определяем состояние сборки проекта либо разработка либо продакшен.
Это делается с помощью глобальной переменной процесс.энв это зашито в нод она
определяет состояние окружения системы в момент запуска приложения.
А определяем ее с момощью npm i cross-env и в
packege.json мы ее обозначили при запуске команд.
cross-env NODE_ENV=development | cross-env NODE_ENV=production
*/
const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd

//создаем функцию генератор имен в режиме разработки и продакшенаъ
const filename = ext => isDev
  ? `bundle.${ext}`
  : `bundle.[hash].${ext}`;

/*
создаем функцию для ес линта и бэйбла, что бы
она могла возвращать много лоадеров
*/
const jsLoaders = () => {
  const loaders = [{
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-env'],
    },
  }]

  if (isDev) {
    loaders.push('eslint-loader')
  }

  return loaders
}

module.exports = {
  /*
  тут мы указываем контекст к файлам исходникам.
  Дир нэйм это путь к нашему локальному файлу и добавляем конкатинацией src
  */
  context: path.resolve(__dirname, 'src'),
  //по умолчанию он в продакшене и мы меняем его на разработку
  mode: 'development',
  //находим сам обьект входа
  entry: ['@babel/polyfill', './index.js'],
  //что и куда будем собирать
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: { //изменение расширений модулей
    extensions: ['.js'],
    alias: {
      //упрощает написание импортов и путей импортов, уходим от вложенности
      //теперь этот значек содержит путь к папке src
      '@': path.resolve(__dirname, 'src'),
      //теперь этот значек содержит путь к папке src/core
      '@core': path.resolve(__dirname, 'src/core'),
    },
  },
  /*
  добавляем sourcemap и условие, если режим разработки добавляем если нет то
  не добавляем
  */
  devtool: isDev ? 'source-map' : false,
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 4000,
    hot: false,
    compress: true,
    // что бы в папке дист записывались файлы а не уходили сразу на серв
    writeToDisk: isDev,
  },
  //в 5-м вебпаке нам нужно указать точный таргет браузерлиста
  target: isDev
    ? 'web'
    : 'browserslist',
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      //путь к стартовому шаблону
      template: 'index.html',
      minify: {
        // если мы запускаем билд в режиме разработки то у нас не минифицируется html
        removeComments: isProd,
        //если мы запускаем билд в режиме продакшена то минифицируется, убираются пробелы и коментарии
        collapseWhitespace: isProd,
      },
    }),
    new CopyPlugin({ //плагин для фавиконок
      patterns: [{
        from: path.resolve(__dirname, 'src/favicon.png'), //откуда берем
        to: path.resolve(__dirname, 'dist'), //куда вставляем
      }],
    }),
    new MiniCssExtractPlugin({
      filename: filename('css'), //в какой файл помещаем файл цсс
    }),
  ],
  module: { // сейчас мы будем пропускать все js & scss файлы через модули вебпака
    rules: [
      { //подтягиваем препроцессор сасс
        test: /\.s[ac]ss$/i,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader, //минифицируем цсс
          'css-loader',
          'sass-loader',
        ],
      },
      { // подтягиваем бэбл для перевода в ес 5 синтасис
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: jsLoaders(),
      },
    ],
  },
}
