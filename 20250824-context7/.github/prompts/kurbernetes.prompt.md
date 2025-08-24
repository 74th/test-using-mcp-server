---
mode: agent
tools: ['extensions', 'codebase', 'usages', 'vscodeAPI', 'think', 'problems', 'changes', 'testFailure', 'terminalSelection', 'terminalLastCommand', 'openSimpleBrowser', 'fetch', 'findTestFiles', 'searchResults', 'githubRepo', 'todos', 'editFiles', 'runNotebooks', 'search', 'new', 'runCommands', 'runTasks', 'context7']
---

manifests/ ディレクトリに、以下のマニフェストを作って。

- kustomize で管理して、1ファイルにつき1つのマニフェストと作成する。
- nginx の Deployment を作成する
- 40%のCPUでスケールさせる
- Serviceには一旦ClusterIP、ポート番号13532で構築する

Kubernetesのマニフェストを作るために #get-library-docs を使って、最新の情報を取得して。
context7CompatibleLibraryID は /websites/kubernetes_io を参照して。