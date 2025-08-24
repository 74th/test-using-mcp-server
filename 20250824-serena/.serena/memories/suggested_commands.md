# 推奨コマンド

## 開発環境セットアップ

### Python バックエンド
```bash
# 依存関係のインストール
uv sync

# Python サーバーの実行
cd todo_api
python -m flask --app server.api run --port 8080 --debug

# テストの実行
python -m pytest
```

### TypeScript フロントエンド
```bash
cd todo_frontend

# 依存関係のインストール
npm install

# 開発サーバーの起動
npm start

# プロダクションビルド
npm run build

# テスト実行
npm test
```

## システムコマンド（macOS）
- `ls` - ディレクトリリスト
- `find` - ファイル検索
- `grep` - テキスト検索
- `git` - バージョン管理
- `cd` - ディレクトリ移動

## 便利なコマンド
```bash
# 両方のサーバーを同時に起動
# ターミナル1でバックエンド
cd todo_api && python -m flask --app server.api run --port 8080 --debug

# ターミナル2でフロントエンド  
cd todo_frontend && npm start

# 全テスト実行
python -m pytest && cd todo_frontend && npm test
```