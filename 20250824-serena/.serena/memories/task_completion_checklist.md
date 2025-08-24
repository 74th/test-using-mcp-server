# タスク完了時の手順

## 1. コード品質チェック

### Python
```bash
# テスト実行
python -m pytest

# 型チェック（もし使用している場合）
mypy todo_api/

# コードフォーマット（もし設定されている場合）
black todo_api/
isort todo_api/
```

### TypeScript
```bash
cd todo_frontend

# テスト実行
npm test

# 型チェック
npx tsc --noEmit

# ESLint（設定されている）
npx eslint src/

# ビルドテスト
npm run build
```

## 2. 動作確認
```bash
# バックエンドAPIテスト
curl http://localhost:8080/api/tasks

# フロントエンド動作確認
# ブラウザで http://localhost:3000 にアクセス
```

## 3. git関連
```bash
# 変更をステージング
git add .

# コミット
git commit -m "feat: implement new feature"

# プッシュ
git push
```

## 4. 統合テスト
- バックエンドが8080ポートで起動していることを確認
- フロントエンドが3000ポートで起動していることを確認  
- APIとUIが正しく連携していることを確認
- 新しいタスクの作成、完了マーク、一覧表示が動作することを確認

## 5. ドキュメント更新
- README.mdを必要に応じて更新
- API仕様に変更がある場合は文書化
- TypeScript型定義とPython型定義の一貫性を確認