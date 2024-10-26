# EMOM Path

## デモアカウント

以下の Email アドレスと Password でログインできます。デモ用のデータも入れているので、チャートなどの動きもぜひご確認ください。

<details><summary>Email&Password</summary>

```rb
Email 'xxx@xxx.com'
Password '20241020'
```

</details>

## アプリの概要

EMOM Path は、「EMOM(Every Minute On the Minute)」と呼ばれるトレーニングプロトコルを用いて、短時間で高い効果のトレーニングを提案するアプリケーションです。

EMOM Path は、ユーザーが実行したトレーニングのボリューム（セット数 × 回数）を元に、次回のトレーニングの内容を提案します。最初に行いたいトレーニングさえ決めてしまえば、自動的にトレーニングの原則のひとつ「Progressive Overload（漸進性過負荷・少しずつ運動量や重さを増やしていくこと）」の条件を満たしたトレーニング内容を提案してくれます。

忙しいビジネスマンや、運動不足になりがちなデスクワーカーにおすすめのフィットネスアプリです。

## EMOM とは

**EMOM (Every Minute On the Minute)** とは、1 分ごとに特定のエクササイズを開始するトレーニング方法です。1 分間の間に指定された回数の運動を行い、その残りの時間を休憩に充てます。次の 1 分が始まると同時に、再びエクササイズを開始します。この形式により、短時間で心拍数を上げ、筋力や持久力を効率的に鍛えることができます。

### EMOM の例

例えば、スクワットと腕立て伏せを使用した EMOM トレーニングは以下のようになります。

1. **1 分目**: 10 回のスクワットを行い、さらに腕立て伏せ 5 回を行い、その残りの時間を休憩。
2. **2 分目**: 再びスクワットと腕立て伏せを開始し、その残りの時間を休憩。
3. 3 分目：以降を同じように繰り返します。

このように、各 1 分間で指定された回数の運動を行い、短時間で全身を鍛えることが可能です。

## 対象ユーザー

- 日々運動に時間の割けないビジネスマン
- 運動習慣を身に付けたい社会人

### ユーザーの課題

- 忙しいスケジュールの中で運動時間を確保するのが難しい
- 運動の継続が難しい、モチベーションの維持が課題

### 解決方法

EMOM Path は、短時間で効率的な運動を提供することで、これらの課題を解決します。ユーザーはシンプルなインターフェースでワークアウトを計画・管理し、進捗を可視化することでモチベーションを維持することができます。

## 機能

- **ワークアウト管理**: EMOM（Every Minute On the Minute）形式のエクササイズプランを簡単に作成・管理。
- **タイマー機能**: 登録したセット数に合わせ、1 分間のタイマー表示が繰り返されます。タイマーは残り時間を表示し、1 分が経過するとアラートで通知します。
- **提案機能**: トレーニングのセット数と回数からボリュームを計算し、次回のトレーニング内容を提案します。
- **OAuth サインイン**: Google を使用した OAuth 認証で、簡単にサインインが可能です。
- **データの可視化**: エクササイズ結果を記録し、グラフで進捗を確認。

## 使用技術

- **Next.js**
- **React**
- **Tailwind CSS**
- **Supabase**: OAuth 認証およびバックエンドのデータベース管理に使用。
- **マテリアル UI**: 各アイコンや、詳細ページのチャートに使用。
- **zod**: 各入力のバリデーションに使用。
- **Atomic Design**: コンポーネント設計のためのアーキテクチャ。

## プロジェクト構造

- `/src/app` - API やページコンポーネントを管理。
  - `/api` - 認証やデータ管理のための API ルート。
  - `/auth` - 認証関連のページ。
  - `/emoms` - EMOM トレーニングに関するページ。
- `/src/components` - atom、molecules、organisms などの再利用可能な UI コンポーネント。
- `/src/db` - データベーススキーマおよび SQL ファイル。
- `/src/lib` - Supabase クライアントの設定ファイル。

## アプリへのフィードバック

バグの報告や機能追加の提案は大歓迎です。GitHub の「Issues」からお気軽に報告してください。また、プルリクエストもお待ちしておりますので、ご協力をお願いいたします。

## 使い方の解説

### サインインページ

![signin](https://github.com/user-attachments/assets/b0f42fb6-2cf6-4459-ab51-b030707762c1)

google アカウント、もしくはメールアドレス+パスワードの組み合わせで認証するページです。

1. google 認証ボタン
2. メールアドレス・パスワードでの認証ボタン
3. 新規ユーザー登録ページ（Sign Up）へのリンク

### EMOM List ページ

![EMOMlistpage](https://github.com/user-attachments/assets/72d11374-1e71-4f65-b338-5cd40fe8dca8)

今まで作成した EMOM の一覧を表示するページです。**Create New EMOM**のボタンから EMOM を新規作成できます。

### Create ページ

![createpage](https://github.com/user-attachments/assets/2cce7320-206c-4f24-979e-dffe34115101)

新しく EMOM を作成するページです。

1. EMOM の名前を入力するインプット。例:**上半身**:**下半身**:**腕立て伏せ**
2. Ready を変更する UI。タイマーが開始してから本番セットが始まるまでの準備時間を入力できます。
3. セット数を変更する UI。セット数の分だけ、タイマーページでセットが繰り替えされます。
4. トレーニングの名前を入力するインプット。例:**スクワット**:**懸垂**:**バーピージャンプ**
5. 1 分間でのトレーニングの目標回数を変更する UI。
6. EMOM のセット数と、トレーニングの目標回数からボリューム(総負荷)を計算し、表示。
7. トレーニングを追加するボタン。1 つの EMOM につき、3 つまでトレーニングを追加できます。
8. EMOM 開始ボタン。入力している情報を保存し、タイマーページに移行します。

### Timer ページ

![timerpage](https://github.com/user-attachments/assets/17980fda-f4bf-44bb-be2f-07c7ef6851ed)

EMOM を実行する Timer のページです。

1. EMOM を中断して一覧表示のページまで戻ります。
2. 準備時間か、本番か表示します。
3. 残りの時間を表示します。
4. 選択している EMOM の内容の表示
5. タイマーを開始するボタン、一時停止もできます。

### Complete ダイアログ

![complete](https://github.com/user-attachments/assets/3312f054-6aa8-4e36-9124-aa4a37e4c72f)

完了した EMOM を更新するダイアログです。次回のトレーニングのためにボリュームを 10%~30%の幅で更新でき、継続的に負荷を高めていくことができます。

1. 増加するボリュームの割合を表示
2. 更新する EMOM の内容を表示

---

ぜひ、ご自身のフィットネス目標の管理に EMOM Path を活用してください！

---

# Overview and Features

## Overview

EMOM Path is an application designed to propose highly effective training in a short period of time using a training protocol called "EMOM (Every Minute On the Minute)."

The app suggests the content of the next training based on the total volume of exercises performed by the user.

## What is EMOM?

**EMOM (Every Minute On the Minute)** is a training method where a specific exercise is started every minute. During each minute, you perform the required number of exercises and rest for the remainder of the minute. As soon as the next minute starts, you begin the exercise again. This format allows you to raise your heart rate and train your strength and endurance efficiently in a short amount of time.

### Example of EMOM

For example, an EMOM workout using squats and push-ups could look like this:

1. **Minute 1**: Perform 10 squats and then perform 5 push-ups, rest for the remainder of the minute.
2. **Minute 2**: Start squats and push-ups again, then rest for the remainder of the minute.
3. **Minute 3**: Continue in the same way.

In this manner, you can train your entire body in a short time by performing the specified number of exercises during each minute.

## Features

- **Workout Management**: Easily create and manage exercise plans in EMOM format.
- **Timer Function**: Displays a 1-minute timer repeated according to the registered number of sets.
- **Suggestion Function**: Calculates volume from the number of sets and reps and suggests the content of the next workout.
- **OAuth Sign-in**: Easy sign-in using Google OAuth authentication.
- **Data Visualization**: Record exercise results and check progress with graphs.
