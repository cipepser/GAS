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

このまま進めようと思ったけど、[danthareja/node-google-apps-script](https://github.com/danthareja/node-google-apps-script#11-default-apps-script-developer-console-project)に`DEPRECATION NOTICE`と書かれている。代わりに`[google/clasp](https://github.com/google/clasp)`を利用する。


### [google/clasp](https://github.com/google/clasp)をインストールする

```sh
sudo npm i @google/clasp -g
```


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
