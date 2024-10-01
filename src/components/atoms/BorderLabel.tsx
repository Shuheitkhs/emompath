/**　ボーダー付きのリンクを作成
 *  重要なものを消去するとき、ユーザー情報の変更から/auth/mypageに戻るときなどに使用
 */

import Link from "next/link";
import React from "react";

interface BorderLabelProps {
  href: string;
  children: React.ReactNode;
}

const BorderLabel: React.FC<BorderLabelProps> = ({ href, children }) => {
  return (
    <div>
      <Link
        className="text-blue-500 border-b  border-blue-500 hover:text-blue-700 hover:border-blue-700"
        href={href}
      >
        {children}
      </Link>
    </div>
  );
};

export default BorderLabel;
