# コードスタイルと規約

## Python コードスタイル
- **型ヒント**: TypedDictを使用した構造化データ定義
- **インポート**: 相対インポートを使用（`from .entity import Task`）
- **命名規約**: 
  - クラス名: PascalCase (`Task`, `TaskRepository`)
  - 関数名: snake_case (`add_task`, `show_tasks`)
  - 変数名: snake_case
- **Docstrings**: 現在はあまり使用されていない
- **テスト**: pytestを使用、`_test.py`サフィックス

## TypeScript コードスタイル
- **型定義**: interfaceを使用（`export interface Task`）
- **インポート**: ES6 modules (`import { Task } from ...`)
- **命名規約**:
  - インターフェース名: PascalCase (`Task`)
  - 関数名: camelCase (`loadTasks`, `postTask`)
  - 変数名: camelCase
- **JSDoc**: TypeScriptコメント形式（`/** * タスク */`）
- **コンポーネント**: 関数コンポーネント + Hooks

## ファイル構造規約
- **Python**: domain-driven design パターン
  - `entity/` - データ構造
  - `usecase/` - ビジネスロジック
  - `memdb/` - データアクセス層
- **TypeScript**: 機能別分離
  - `entity/` - 型定義
  - `api/` - APIクライアント
  - `views/` - UIコンポーネント

## データ型の一貫性
- **日付**: Python では `date` 型、TypeScript では ISO文字列
- **Optional値**: Python `Optional[T]`、TypeScript `T?`
- **Task構造**: 両環境で同じフィールド構造を維持