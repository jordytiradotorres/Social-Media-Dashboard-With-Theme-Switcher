const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");

const webpack = require("webpack");

module.exports = {
	entry: path.resolve(__dirname, "src/index.js"),
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "app.js",
	},
	devtool: "inline-source-map",
	devServer: {
		hot: true,
		open: true,
		port: 9000,
	},
	module: {
		rules: [
			{
				test: /\.pug$/,
				use: ["pug-loader"],
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: "babel-loader",
			},
			{
				test: /\.css$/,
				use: [
					// el loder: miniCSSE... --> nos va a server para produccion
					// para desarrollo es mas rapido inyectar en el navegador
					{
						loader: MiniCSSExtractPlugin.loader,
					},
					"style-loader",
					"css-loader",
				],
			},
			{
				test: /\.s[ac]ss$/,
				use: ["style-loader", "css-loader", "sass-loader"],
			},
			{
				test: /\.jpg|png|gif|webp|woff|woff2|svg|mp4|mp3|webm$/,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "[path]/[name].[ext]",
						},
					},
				],
			},
		],
	},
	plugins: [
		// new webpack.HotModuleReplacementPlugin(),
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			title: "Social media",
			template: path.resolve(__dirname, "src/pug/index.pug"),
		}),
		// esto va hacer para produccion
		new MiniCSSExtractPlugin({
			filename: "css/[name].css",
		}),
	],
};
