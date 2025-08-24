# プロジェクト概要

## プロジェクトの目的
このプロジェクトは、Todoアプリケーションのフルスタック実装です。PythonのFlaskバックエンドとReact + TypeScriptフロントエンドで構成されています。MCPサーバーのテストプロジェクトとしても使用されているようです。

## 技術スタック

### バックエンド (Python)
- Flask 3.1.1+
- Python 3.12+
- TypedDict（型定義）
- メモリベースのデータベース実装

### フロントエンド (TypeScript/React)
- React 18.2.0
- TypeScript 4.7.4
- React Hook Form（フォーム管理）
- React DatePicker（日付選択）
- Webpack（バンドル）

## コードベース構造

### バックエンド (`todo_api/`)
- `domain/entity/` - エンティティ定義（Task）
- `domain/usecase/` - ビジネスロジック（operations）
- `memdb/` - インメモリデータベース実装
- `server/` - Flask API サーバー

### フロントエンド (`todo_frontend/`)
- `src/entity/` - TypeScript型定義
- `src/api/` - APIクライアント
- `src/views/` - React コンポーネント
- `public/` - 静的ファイル

## 主要コンポーネント
- **Task**: 両方の環境で中心的なデータ構造
- **TaskRepository**: データアクセス層
- **TaskOperations**: ビジネスロジック層
- **Flask API**: RESTful エンドポイント
- **React UI**: ユーザーインターフェース