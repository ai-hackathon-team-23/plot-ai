"use client";
import React from "react";
import DragIntoList from "~/app/models/_components/drag-into-list";
import { Button, defaultTheme, Provider } from "@adobe/react-spectrum";

type Props = {};

const Page = (props: Props) => {
  return (
    <Provider theme={defaultTheme}>
      <DragIntoList />
    </Provider>
  );
};

export default Page;
