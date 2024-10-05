-- emomsテーブルの作成SQLコード
CREATE TABLE emoms (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL,
    name TEXT NOT NULL, --varcharよりも柔軟性を持たせるためにtext
    ready INTEGER NOT NULL CHECK (ready <= 60), --フロントでも60秒以下に制限できるが、ここでもcheck
    set INTEGER NOT NULL CHECK (set <= 30),--フロントでも30セット以下に制限できるが、ここでもcheck
    FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE -- supabaseの標準機能auth.usersテーブルと紐付け
);