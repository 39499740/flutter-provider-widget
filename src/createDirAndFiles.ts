/*
 * @Author: 郝怿
 * @Date: 2022-01-25 00:13:34
 * @LastEditTime: 2022-04-24 14:10:39
 * @LastEditors: 郝怿
 * @Description: 
 * @FilePath: /flutter-provider-less/src/createDirAndFiles.ts
 */
import { join } from "path";
import * as fs from "fs";



export async function createDir(dirPath: string, pageName: string) {
    var PG = pageName.charAt(0).toUpperCase() + pageName.slice(1)

    var dir = join(dirPath, pageName);
    if (!fs.existsSync(dir)) {
        fs.mkdir(dir, function (err) {
            createPageFile(dir, pageName)
            createProviderPage(dir, pageName)
        })
    }
}

function createPageFile(dirPath: string, pageName: string) {
    var PG = pageName.charAt(0).toUpperCase() + pageName.slice(1)
    var fileContent =
        `
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'provider.dart';

class ${PG}Page extends StatelessWidget {
    @override
    Widget build(BuildContext context) {
        return ChangeNotifierProvider(
            create: (BuildContext context) => ${PG}Provider(),
            builder: (context, child) => _buildPage(context),
        );
    }

    Widget _buildPage(BuildContext context) {
        final p = context.read<${PG}Provider>();
        final pp = Provider.of<${PG}Provider>(context,listen: true);
        p.init();
        return Scaffold(
          key: p.scaffoldkey,
        );
    }
}`

    fs.writeFile(join(dirPath, "view.dart"), fileContent, function (err) {
        if (err) {
            return console.log(err);
        }
    })
}

function createProviderPage(dirPath: string, pageName: string) {
    var PG = pageName.charAt(0).toUpperCase() + pageName.slice(1)
    var fileContent =
        `
import 'package:flutter/material.dart';

class ${PG}Provider extends ChangeNotifier {
    BuildContext? context;
    var scaffoldkey = GlobalKey<ScaffoldState>();
      
    bool _initialized = false;
      
    void init() {
        if (!_initialized) {
            _initialized = true;
            Future.delayed(const Duration(milliseconds: 100), () {
                context = scaffoldkey.currentContext;
            });
        }
    }
}
`

    fs.writeFile(join(dirPath, "provider.dart"), fileContent, function (err) {
        if (err) {
            return console.log(err);
        }
    })
}