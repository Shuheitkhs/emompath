"use client";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Button } from "@/components/Button";
import { Fab } from "@mui/material";
import Image from "next/image";

export default function Home() {
  const Hello = () => {
    alert("Hello");
  };

  return (
    <div>
      <h1>Hello World</h1>
      <p>フォントのテスト</p>
      <p>exercise</p>
      <Button size="extra-small" color="secondary" onClick={Hello}>
        {" "}
        <AddIcon />
      </Button>
      <Button size="extra-small" color="secondary" onClick={Hello}>
        {" "}
        <RemoveIcon />
      </Button>
      <Button
        size="small"
        color="secondary"
        children={"テスト"}
        onClick={Hello}
      ></Button>
      <Button
        size="small"
        color="secondary"
        children={"テスト"}
        onClick={Hello}
      ></Button>
      <Button
        size="small"
        color="secondary"
        children={"テスト"}
        onClick={Hello}
      ></Button>
      <Button
        size="medium"
        color="danger"
        children={"Start!"}
        onClick={Hello}
      ></Button>
      <Button
        size="medium"
        color="danger"
        children={"Cancel"}
        onClick={Hello}
      ></Button>
      <Button size="large" children={"テスト"} onClick={Hello}></Button>
      <Button
        size="medium"
        color="danger"
        children={"テスト"}
        onClick={Hello}
      ></Button>
    </div>
  );
}
