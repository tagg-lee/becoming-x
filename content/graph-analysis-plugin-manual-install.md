---
title: Graph Analysis 플러그인 수동설치 방법 가이드
description: 옵시디언 Graph Analysis 플러그인을 수동으로 설치하는 방법을 안내합니다
tags: [obsidian, plugin, graph-analysis, tutorial]
uploaded_date: 2026-03-02
created_date: 2026-03-02
---

## 💬 질문

> 안녕하세요. <a href="https://fastcampus.co.kr/biz_online_obsidian" target="_blank">옵시디언 바이블</a> 강의를 보고 있습니다.
> Graph Analysis 플러그인은 업데이트가 없어 더 이상 사용하지 못하는 것이 맞을까요?
> <a href="https://slashpage.com/cmds-class/dwy5rvmj9rk652p46zn9?post=qpv5x4277dvxq2kyn3dw" target="_blank">[원문]</a>

## 💡 답변

Graph Analysis 플러그인은 현재 옵시디언 커뮤니티 플러그인 목록에서 **제거된 상태**입니다. 아래 4단계를 따라 수동으로 설치할 수 있습니다.

#### 📥 Step 1. 플러그인 파일 다운로드

아래 링크를 클릭해서 플러그인 ZIP 파일을 받아주세요.

<a href="/assets/graph-analysis-plugin-manual-install/graph-analysis.zip" download style="display:inline-block;padding:12px 28px;background:hsl(212,92%,45%);color:#fff;font-weight:600;border-radius:8px;text-decoration:none;font-size:1em;transition:background 0.2s;" onmouseover="this.style.background='hsl(212,92%,38%)'" onmouseout="this.style.background='hsl(212,92%,45%)'">📥 graph-analysis.zip 다운로드</a>

#### 📂 Step 2. 옵시디언 볼트의 plugins 폴더 찾기

옵시디언 볼트 폴더 안에는 숨겨진 `.obsidian/plugins/` 폴더가 있습니다.

| OS | 숨김 파일 보는 방법 |
|---|---|
| 🍎 Mac | Finder에서 `Cmd + Shift + .` 누르기 |
| 🪟 Windows | 파일 탐색기 → `보기` → `숨긴 항목` 체크 |

숨김 파일을 표시한 뒤, 아래 경로로 이동하세요:

**`볼트 폴더` → `.obsidian` → `plugins`**

![plugins 폴더 위치](/assets/graph-analysis-plugin-manual-install/plugins-folder-location.jpg)

#### 📦 Step 3. 플러그인 설치

1. 다운로드한 `graph-analysis.zip` 파일의 **압축을 풀어주세요**
2. 압축을 풀면 `graph-analysis` 폴더가 생깁니다
3. 이 폴더를 통째로 `.obsidian/plugins/` 안에 넣어주세요

> [!TIP]
> 최종 경로가 아래와 같으면 성공입니다:
>
> ```
> 볼트폴더
> └── .obsidian
>     └── plugins
>         └── graph-analysis
>             ├── main.js
>             ├── manifest.json
>             └── styles.css
> ```

#### ⚡ Step 4. 플러그인 활성화

1. 옵시디언을 **재시작**합니다
2. `설정` → `커뮤니티 플러그인`으로 이동합니다
3. 목록에서 **Graph Analysis**를 찾아 토글을 켜서 활성화합니다

> 🎉 이제 Graph Analysis 플러그인을 사용할 수 있습니다!
