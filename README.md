# GAS

[Google Apps Script](https://developers.google.com/apps-script/)でいろいろ作る。

## 開発環境の構築

Web上のIDEが慣れないのでローカルで開発したい。

* 補完が弱い
* ショートカットが使いづらい

### (deprecated)node-google-apps-scriptをインストールする

[Google Apps Scriptの開発をモダンに行う方法](https://tech.speee.jp/entry/2016/04/28/190236)を参考に`node-google-apps-script`を試してみる。なお、[手軽にGoogle Apps ScriptのコードをGitHubで管理する](https://techblog.recruitjobs.net/development/maneged_google-apps-script_by_github)に以下のように書いてあるので注意が必要かもしれない。

> `node-google-apps-script`まわりはGoogleも推奨しているのですが、一度IDE上で修正すると、Git管理から外れることになってしまいます。

```sh
❯ npm install -g node-google-apps-script
/usr/local/bin/gapps -> /usr/local/lib/node_modules/node-google-apps-script/bin/gapps
+ node-google-apps-script@1.3.1
added 73 packages from 89 contributors in 10.584s
```

このまま進めようと思ったけど、[danthareja/node-google-apps-script](https://github.com/danthareja/node-google-apps-script#11-default-apps-script-developer-console-project)に`DEPRECATION NOTICE`と書かれている。代わりに[google/clasp](https://github.com/google/clasp)を利用する。


### [clasp](https://github.com/google/clasp)をインストールする

[claspを使い、Google Apps Scriptプロジェクトをgitでバージョン管理する](https://qiita.com/rf_p/items/7492375ddd684ba734f8)
あたりを参考に進めていく。

```sh
❯ sudo npm i @google/clasp -g
/usr/local/bin/clasp -> /usr/local/lib/node_modules/@google/clasp/src/index.js
+ @google/clasp@1.6.3
added 278 packages from 159 contributors in 40.157s
```

[ここ](https://script.google.com/home/usersettings)にアクセスして、`Google Apps Script API`をオンにする。


```sh
❯ clasp login
```

ブラウザが立ち上がるのでログインする。
ターミナルに`Authorization successful.`と出る。

ブラウザのプロジェクト上から`スクリプトID`を持ってきて、以下のようにcloneする。

```sh
❯ clasp clone <スクリプトID>
```

上記でプロジェクト上のファイルがローカルにcloneされるが、一緒に`.clasp.json`が生成される。
この中に`スクリプトID`が書かれているので、
***`.gitignore`に忘れずに記載すること。***

ローカルで編集したファイルは、以下のようにプロジェクトにpushできる。

```sh
❯ clasp push
```

同じくブラウザ上で編集したらpullできる。

```sh
❯ clasp pull
```

同じように`clasp run <Function名>`で実行できる。`console.log`だったら`clasp logs`で確認できる。ハマるポイントなどは以下が詳しい。

* [clasp run できないとき。2018-09-25](https://qiita.com/abetomo/items/59379e26679e342ef6e3)
* [clasp logs でログを確認する。2018-09-26](https://qiita.com/abetomo/items/a63dfacde419f44cd8ca)

~~これで一通り開発環境は整った。~~
と思ったが`clasp run`の挙動が想定と違う。

### clasp runをローカルでしたい

事象は以下の通り。

1. ローカルでコードを編集
1. `clasp push`する。
1. `clasp run`すると2.で`push`したコードが実行されない。

切り分けをしたところ

- 2.で`clasp version`や`clasp deploy`を加えても同じ挙動
- ブラウザ上のプロジェクトで見ると`公開 - 実行可能APIとして導入...`が2.で上げたバージョンになっていない

以下で解決した。

```sh
❯ clasp run --dev listupfiles
Result: 15
```

## GASでTypeScript

[\[GAS\] claspで設定不要でTypescriptが使えるようになりました](https://qiita.com/mildcoffee/items/56a79e271dd28eb038b7)
をもとに触ってみる。記事の通り`test`ディレクトリを切った。

`yarn add @types/google-apps-script`で初期化。

フィボナッチ数列までできた。

## TODO: slackのファイルを取り扱う

[Slackの古くなったファイルを自動で削除してみた](http://lyncs.hateblo.jp/entry/2017/06/04/191421)が参考になる。

ファイルのリストアップは[ここ](https://api.slack.com/methods/files.list)で試せる。
`Tester`タブに書いてあるURLをトークンとして利用すればよい。

トークンをコードに直書きしたくないので、GASのプロジェクトに紐付ける。
ブラウザからGASを開いて、`ファイル` -> `プロジェクトのプロパティ`から、`スクリプトのプロパティ`を開くと環境変数っぽく設定できる。使うときは以下のようにすればOK。

```js
var TOKEN = PropertiesService.getScriptProperties().getProperty("TOKEN");
```

## References
* [Google Apps Script](https://developers.google.com/apps-script/)
* [Google Apps Scriptの開発をモダンに行う方法](https://tech.speee.jp/entry/2016/04/28/190236)
* [手軽にGoogle Apps ScriptのコードをGitHubで管理する](https://techblog.recruitjobs.net/development/maneged_google-apps-script_by_github)
* [Slackの古くなったファイルを自動で削除してみた](http://lyncs.hateblo.jp/entry/2017/06/04/191421)
* [Slack API](https://api.slack.com/)
* [danthareja/node-google-apps-script](https://github.com/danthareja/node-google-apps-script#11-default-apps-script-developer-console-project)
* [Google Apps Scriptの新しい3つの機能 その③ CLI Tool Clasp](https://qiita.com/soundTricker/items/354a993e354016945e44)
* [clasp run できないとき。2018-09-25](https://qiita.com/abetomo/items/59379e26679e342ef6e3)
* [clasp logs でログを確認する。2018-09-26](https://qiita.com/abetomo/items/a63dfacde419f44cd8ca)
* [clasp](https://github.com/google/clasp)
* [\[GAS\] claspで設定不要でTypescriptが使えるようになりました](https://qiita.com/mildcoffee/items/56a79e271dd28eb038b7)
* [\[GAS\]実行に失敗: その操作を実行する権限がありません。に悩んだこと](https://qiita.com/VirgomanBros/items/41a46d778dc6fcac0d0b)
* [\[GAS\] 実行する権限がありません。についての対策まとめ](https://qiita.com/NickelCreate/items/55b888b66695527c85b0)
* [
Manifests - Google Apps Script](https://developers.google.com/apps-script/concepts/manifests)
* [
Authorization Scopes - Google Apps Script](https://developers.google.com/apps-script/concepts/scopes)