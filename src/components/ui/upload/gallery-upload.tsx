import React, { memo, useCallback, useEffect, useState } from "react";
import NextImage from "next/image";
import { IconPhotoPlus, IconX } from "@tabler/icons-react";
import {
  Button,
  FileButton,
  Text,
  Flex,
  ActionIcon,
  LoadingOverlay,
  InputWrapper,
} from "@mantine/core";
import { nanoid } from "nanoid";
import classes from "./gallery-upload.module.css";

import { generalApi } from "@/apis";
import { message } from "@/utils/message";
import { IImage } from "@/interfaces/image";
import { Image } from "@/models/image";

export type IFile = {
  key?: string;
  _id?: string;
  blob: Blob | null;
  name?: string;
  url?: string;
  size?: number;
  error?: string;
  uploading?: boolean;
};

type Props = {
  images?: IImage[];
  name: string;
  error?: string;
  required?: boolean;
  onChange?: (images: IImage[]) => void;
  onUploadStatus?: (loading: boolean) => void;
};

const maxSizeInBytes = 10 * 1024 * 1024;

export function GalleryUpload({
  error,
  images,
  onChange: $onChange,
  required,
  onUploadStatus,
}: Props) {
  const [files, setFiles] = useState<{ [k: string]: IFile }>(
    (images || []).reduce((acc, iter) => {
      const key = nanoid();
      return {
        ...acc,
        [key]: {
          key,
          _id: iter._id,
          url: iter.url,
          blob: null,
          uploading: false,
        } as IFile,
      };
    }, {}),
  );

  const onFileUpload = (blobs: Blob[]) => {
    if (blobs?.length > 0) {
      const items = blobs.reduce((acc, iter) => {
        const key = nanoid();
        return {
          ...acc,
          [key]: {
            key,
            blob: iter,
            error:
              iter.size > maxSizeInBytes
                ? "Файлын хэмжээ 10MB байна"
                : undefined,
            uploading: true,
          },
        };
      }, files);

      if (Object.values(items).find((i) => i.error)) {
        message.error("Файлын хэмжээ 10MB байна");
      }

      const changeds = Object.values(items)
        .filter((i) => !i.error)
        .reduce(
          (acc, iter) => ({
            ...acc,
            [iter.key!]: iter,
          }),
          files,
        );

      setFiles(changeds);

      const requests = Object.values(changeds).map((file) => {
        return async () => {
          if (file.blob) {
            try {
              const form = new FormData();
              form.append("file", file.blob!);
              const res = await generalApi.upload(form);

              // onChange({
              //   key: file.key,
              //   _id: res._id,
              //   blob: null,
              //   name: res.name,
              //   url: res.url,
              //   size: res.size,
              // });

              setFiles((state) => ({
                ...state,
                [file.key!]: {
                  key: file.key,
                  _id: res._id,
                  blob: null,
                  name: res.name,
                  url: res.url,
                  size: res.size,
                  uploading: false,
                },
              }));
            } catch (err) {
              message.error("Зураг бичлэг хуулах үед алдаа гарлаа!");
            }
          }
        };
      });

      requests.forEach((fn) => fn());
    }
  };

  const onRemove = (key: string) => {
    const values = Object.values(files).filter((f) => f.key !== key);

    setFiles(
      values.reduce((acc, iter) => {
        return {
          ...acc,
          [iter.key!]: iter,
        };
      }, {}),
    );

    $onChange && $onChange(Object.values(files).map((f) => Image.fromJson(f)));
  };

  useEffect(() => {
    $onChange && $onChange(Object.values(files).map((f) => Image.fromJson(f)));

    if (Object.values(files).find((f) => f.uploading)) {
      onUploadStatus && onUploadStatus(true);
    } else {
      onUploadStatus && onUploadStatus(false);
    }
  }, [files]);

  return (
    <InputWrapper error={error} required={required}>
      <div className={classes.galleryList}>
        {Object.keys(files).map((key) => {
          const file = files[key];

          return (
            <div key={key} className={classes.galleryItem}>
              <NextImage
                width={160}
                height={160}
                src={file.url || URL?.createObjectURL(file.blob!)}
                style={{
                  objectFit: "contain",
                }}
                alt=""
              />
              <ActionIcon
                className={classes.galleryX}
                variant="subtle"
                onClick={() => onRemove(key)}
              >
                <IconX />
              </ActionIcon>
              <LoadingOverlay
                visible={file.uploading}
                opacity={0.4}
                loaderProps={{ size: "sm" }}
              />
            </div>
          );
        })}

        <FileButton
          onChange={onFileUpload}
          accept="image/png,image/jpeg,image/heic,image/webp,image/avif"
          multiple
        >
          {(props) => (
            <Button
              {...props}
              variant="default"
              w={160}
              h={160}
              mb={5}
              style={error ? { borderColor: "red" } : {}}
            >
              <Flex direction="column" justify="center" gap={5} align="center">
                <IconPhotoPlus color={error ? "red" : "gray"} />
                <Text size="xs" fw={500} c={error ? "red" : "gray"}>
                  Зураг оруулах
                </Text>
              </Flex>
            </Button>
          )}
        </FileButton>
      </div>
    </InputWrapper>
  );
}
