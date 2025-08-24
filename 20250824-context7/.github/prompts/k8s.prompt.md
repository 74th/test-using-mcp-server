---
mode: agent
tools: ['context7', 'get-library-docs']
---

manifests/ ディレクトリに、以下のマニフェストを作って。

- kustomize で管理して、1ファイルにつき1つのマニフェストと作成する。
- nginx の Deployment を作成する
- 40%のCPUでスケールさせる
- Serviceには一旦ClusterIP、ポート番号13532で構築する