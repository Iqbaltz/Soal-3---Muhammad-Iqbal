"use client";
import React, { ComponentProps, forwardRef, useRef } from "react";
import { Input } from "@nextui-org/react";

type FileUploadInputProps = ComponentProps<typeof Input> & {
  inputStyles?: string;
  textValue: string;
};

const FileUploadInput = forwardRef<HTMLInputElement, FileUploadInputProps>(
  ({ onClick, onChange, textValue, ...props }, _ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    return (
      <div
        onClick={() => {
          inputRef.current?.click();
        }}
      >
        <Input {...props} readOnly value={textValue} />
        <input
          accept={props.accept}
          type="file"
          name=""
          id=""
          hidden
          ref={inputRef}
          onChange={(e) => {
            // get file name
            if (e.target?.files?.length === 0) {
              return;
            }
            onChange?.(e);
          }}
        />
      </div>
    );
  }
);

FileUploadInput.displayName = "FileUploadInput";

export default FileUploadInput;
