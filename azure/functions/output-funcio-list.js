"use strict";

/**
 * 関数一覧を出力する
 */

const path = require("path");
// 関数名(=ディレクトリ名)をキーに入出力バインド定義のオブジェクトに変換
const funcs = require("glob")
  .sync(`*/function.json`)
  .reduce((funcs, funcJsonPath) => {
    const name = path.basename(path.dirname(`${ROOT_DIR}/${funcJsonPath}`));
    const func = require(funcJsonPath);
    funcs[name] = {
      in: func.bindings.find((bind) => bind.direction === "in"),
      out: func.bindings.filter((bind) => bind.direction === "out"),
    };
    return funcs;
  }, {});
// 出力は適宜加工
Object.entries(funcs).forEach(([name, func]) => {
  console.log(
    `${name}\t${func.in.type}\t${func.out.map((e) => e.type).join("/")}`
  );
});
