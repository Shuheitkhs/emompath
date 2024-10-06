-- exercisesテーブルの作成SQLコード
CREATE TABLE exercises (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    emom_id UUID NOT NULL,
    name TEXT NOT NULL,  --varcharよりも柔軟性を持たせるためにtext
    reps INTEGER NOT NULL, 
    FOREIGN KEY (emom_id) REFERENCES emoms(id) ON DELETE CASCADE
);


-- exercisesテーブルRLSポリシーの有効化
ALTER TABLE exercisess ENABLE ROW LEVEL SECURITY;

-- 全ての操作に対するデフォルトの拒否
CREATE POLICY "Restrict to owner" ON exercisess
    FOR ALL
    USING (emoms(id) = emom_id);
