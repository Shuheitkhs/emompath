// MUIからのインポート
import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// カスタムButtonコンポーネント
import Button from "@/components/atoms/Button";

// Dialogが受け取るプロップスの定義
interface AlertDialogProps {
  openText?: string;
  title?: string;
  content?: string;
  agreeText?: string;
  disagreeText?: string;
  onAgree?: () => void;
  onDisagree?: () => void;
}

const AlertDialog: React.FC<AlertDialogProps> = ({
  // お試しデフォルト
  openText = "ひらけごま",
  title = "デフォルトのテキストですか？",
  content = "デフォルトのテキストです",
  agreeText = "Yes",
  disagreeText = "No",
  onAgree = () => {},
  onDisagree = () => {},
}) => {
  // ダイアログの開閉
  const [open, setOpen] = React.useState(false);
  // オープンでダイアログ展開
  const handleClickOpen = () => {
    setOpen(true);
  };
  // 閉じる関数の定義
  const handleClose = () => {
    setOpen(false);
  };
  //
  const handleAgree = () => {
    onAgree();
    handleClose();
  };

  const handleDisagree = () => {
    onDisagree();
    handleClose();
  };

  return (
    <React.Fragment>
      <Button size="large" color="primary" onClick={handleClickOpen}>
        {openText}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: "#444444", // dialogの背景色を指定
            minWidth: "300px", //dialogの最低幅
            minHeight: "300px", //dialogの最低高
          },
        }}
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: "space-between", // ボタンを両端揃えに変更
            padding: "16px",
            gap: "8px", // ボタン間のスペースを調整
          }}
        >
          <Button size="medium" color="danger" onClick={handleDisagree}>
            {disagreeText}
          </Button>
          <Button size="medium" color="primary" onClick={handleAgree}>
            {agreeText}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default AlertDialog;
