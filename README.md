# Effector Geek for Next.js

**Next.js + Tailwind CSS + Firebase + Vercel**

## Effector Geek とは？
エフェクター好きによるエフェクター好きのためのエフェクター情報共有サイトです。

## 実装予定
チェック済みは実装完了している機能です。

- [x] エフェクターボードの投稿
- [x] 投稿されたエフェクターボードを表示
- [ ] エフェクターボードの一覧画面
- [x] エフェクターボードにエフェクターの情報を紐付ける
- [x] エフェクター登録画面の作成
- [x] 投稿されたエフェクターを表示
- [ ] エフェクターの一覧画面
- [ ] エフェクターの編集と削除
- [x] 検索機能
- [ ] 画像のアップロードをドラッグ&ドロップでできるようにする
- [ ] ログイン

## 開発
### バージョン
- Node.js v15.14.0
- npm 7.7.6
- yarn 1.22.5
- typescript@3.9.3

### 環境変数の設定
ホームディレクトリに`.env.local`を作成し、以下の環境変数を設定する。
```
NEXT_PUBLIC_FIREBASE_API_KEY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
NEXT_PUBLIC_FIREBASE_PROJECT_ID
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
NEXT_PUBLIC_FIREBASE_APP_ID
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
```

### 開発コマンド
```bash
# インストール
$ yarn                   # 全てのパッケージと依存関係
$ yarn add パッケージ名     # dependenciesにインストール
$ yarn add -D パッケージ名  # devDependenciesにインストール

# 開発モードで起動
$ yarn dev

# アプリのビルド
$ yarn build

# アプリの起動
$ yarn start
```
