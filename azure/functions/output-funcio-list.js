"use strict";

/**
 * 関数一覧を出力する
 */
// 関数名(=ディレクトリ名)をキーに入出力バインド定義のオブジェクトに変換
const funcs = require("glob")
  .sync(`*/function.json`)
  .reduce((funcs, funcJsonPath) => {
    const name = require("path").dirname(funcJsonPath);
    const func = require(`./${funcJsonPath}`);
    funcs[name] = {
      in: func.bindings.find((bind) => bind.direction === "in"),
      out: func.bindings.filter((bind) => bind.direction === "out"),
    };
    return funcs;
  }, {});
// 出力は適宜加工
Object.entries(funcs)
  .sort()
  .forEach(([name, func]) => {
    console.log(
      [
        name,
        func.in.type,
        func.out.map((e) => e.type).join("/"),
        func.in.authLevel,
      ].join("\t")
    );
  });
