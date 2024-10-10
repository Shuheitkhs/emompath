# EMOM Path

## アプリの概要

EMOM Path は、「EMOM(Every Minute On the Minute)」と呼ばれるトレーニングプロトコルを用いて、短時間で高い効果のトレーニングを提案するアプリケーションです。

ユーザーが実行したトレーニングのボリューム（セット数 × 回数）を元に、次回のトレーニングの内容を提案します。

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
- **提案機能**: トレーニングのセット数とレップ数からボリュームを計算し、次回のトレーニング内容を提案します。
- **OAuth サインイン**: Google を使用した OAuth 認証で、簡単にサインインが可能です。
- **データの可視化**: エクササイズ結果を記録し、グラフで進捗を確認。

## 使用技術

- **Next.js**
- **React**
- **Tailwind CSS**
- **Supabase**: OAuth 認証およびバックエンドのデータベース管理に使用。
- **マテリアル UI**: 詳細ページのチャートに使用。
- **Atomic Design**: コンポーネント設計のためのアーキテクチャ。

## プロジェクト構造

- `/src/app` - API やページコンポーネントを管理。
  - `/api` - 認証やデータ管理のための API ルート。
  - `/auth` - 認証関連のページ。
  - `/emoms` - EMOM トレーニングに関するページ。
- `/src/components` - atom、molecules、organisms などの再利用可能な UI コンポーネント。
- `/src/db` - データベーススキーマおよび SQL ファイル。
- `/src/lib` - Supabase クライアントの設定ファイル。
- `/src/styles` - Tailwind CSS スタイル。

## アプリへのフィードバック

バグの報告や機能追加の提案は大歓迎です。GitHub の「Issues」からお気軽に報告してください。また、プルリクエストもお待ちしておりますので、ご協力をお願いいたします。

## ライセンス

このプロジェクトは MIT ライセンスの下で公開されています。

---

ぜひ、ご自身のフィットネス目標の管理に EMOM Path を活用してみてください！効率的かつ効果的に目標を達成しましょう！

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
