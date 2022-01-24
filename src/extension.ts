// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { createDir } from './createDirAndFiles';


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	const createIndexCommand = vscode.commands.registerCommand(
		'createproviderpage',
		(uri: vscode.Uri) => {
			// uri会给出命令执行时选择的路径
			// 如果右键点击文件夹，这里就是文件夹的路径
			const dirPath = uri.fsPath
			// 需要实现一个生成index.ts文件的函数
			vscode.window.showInputBox(
				{ // 这个对象中所有参数都是可选参数
					password: false, // 输入内容是否是密码
					ignoreFocusOut: true, // 默认false，设置为true时鼠标点击别的地方输入框不会消失
					placeHolder: '请输入页面名称', // 在输入框内的提示信息
					prompt: '页面名称首字母会自动大写，请根据驼峰形式命名', // 在输入框下方的提示信息
				}).then(function (msg) {
					if (msg != undefined) {
						msg = msg.replace(/^\s*|\s*$/g, "");
						if (msg != "") {
							msg = msg.replace(" ", "_");
							createDir(dirPath, msg)
						}
					}

				});
		}
	)


	// 注册到监听队列中
	context.subscriptions.push(createIndexCommand)

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "flutter-provider-widget" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('flutter-provider-widget.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from flutter_provider_less!');
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
