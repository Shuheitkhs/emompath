-- exercise-historiesテーブルの生成コード
-- volumeとcompleted_atでグラフを作成
CREATE TABLE exercise_histories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    exercise_id UUID NOT NULL,
    volume INTEGER NOT NULL,
    completed_at TIMESTAMP NOT NULL DEFAULT NOW(), --現在の年月日時間を取得/全部取得して、フロントで適宜整形したデータを使う。
    FOREIGN KEY (exercise_id) REFERENCES exercises(id) ON DELETE CASCADE
);
