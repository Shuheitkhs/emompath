// CompleteDialogで更新する割合をクリックした後のダイアログ

"use client";

import Button from "./atoms/Button";
import { useRouter } from "next/navigation";

interface UpdateDialogProps {
  onClose: () => void;
}

const UpdateDialog: React.FC<UpdateDialogProps> = () => {
  const router = useRouter();

  const handleCloseUpdate = () => {
    router.push("/emoms"); // '/emoms'ページへ遷移
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-danger p-3 rounded shadow-lg">
        <p className="text-5xl my-5">Updated!!</p>
        <Button size="large" color="primary" onClick={handleCloseUpdate}>
          Back to EMOM List
        </Button>
      </div>
    </div>
  );
};

export default UpdateDialog;
