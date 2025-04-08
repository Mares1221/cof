import React from "react";
import Image from "next/image";
import { IconPhotoPlus } from "@tabler/icons-react";
import {
  Button,
  FileButton,
  LoadingOverlay,
  Text,
  Flex,
  InputWrapper,
} from "@mantine/core";
import { mediaApi } from "@/apis";
import { message } from "@/utils/message";
import { IImage } from "@/interfaces/image";

export type IFile = {
  uploading: boolean;
  file: Blob | null;
  value?: string;
  url?: string;
  size?: number;
};

type Props = {
  onChange?: (file: IImage) => void;
  label?: string;
  error?: string;
  value: string;
  required?: boolean;
  w: string;
  h: string;
  onUploadStatus?: (uploading: boolean) => void;
  placeholder?: string;
  icon?: any;
};

export function ImageUpload({
  value,
  onChange: $onChange,
  label,
  error,
  w,
  h,
  required,
  onUploadStatus,
  placeholder,
  icon,
}: Props) {
  const maxSizeInBytes = 10 * 1024 * 1024; //10mb
  const [file, setFile] = React.useState<IFile>();
  const resetRef = React.useRef<() => void>(null);

  const onFileUpload = (blob: Blob | null) => {
    if (!blob) return;

    if (blob.size > maxSizeInBytes) {
      message.error("Файлын хэмжээ 10MB байна");
      return;
    }

    (async () => {
      try {
        const form = new FormData();
        form.append("file", blob);
        const res = await mediaApi.upload(form);

        $onChange && $onChange(res);

        setFile({
          file: null,
          url: res?.url,
          uploading: false,
          size: blob.size,
        });
      } catch (err) {
        message.error("Алдаа гарлаа");

        setFile((state) => ({
          file: state?.file!,
          url: state?.url,
          uploading: false,
          size: state?.size,
        }));
      } finally {
        onUploadStatus && onUploadStatus(false);
      }
    })();

    setFile({
      file: blob,
      uploading: true,
    });

    onUploadStatus && onUploadStatus(true);
  };

  React.useEffect(() => {
    value &&
      setFile({
        file: null,
        url: value,
        uploading: false,
      });
  }, [value]);

  return (
    <InputWrapper required={required} label={label} error={error}>
      <div>
        <FileButton
          resetRef={resetRef}
          onChange={onFileUpload}
          accept="image/png,image/jpeg,image/heic,image/webp,image/avif"
        >
          {(props) =>
            file ? (
              <Button w={w} h={h} {...props} variant="default">
                <Image
                  src={
                    file?.file ? URL?.createObjectURL(file?.file) : file?.url!
                  }
                  fill
                  style={{
                    objectFit: "contain",
                  }}
                  alt=""
                />
                <LoadingOverlay
                  visible={file.uploading}
                  opacity={0.3}
                  loaderProps={{ size: "sm" }}
                />
              </Button>
            ) : (
              <Button
                variant="default"
                w={w}
                h={h}
                style={{ borderColor: error && "red" }}
                {...props}
              >
                <Flex
                  direction="column"
                  justify="center "
                  align="center"
                  gap={5}
                >
                  <IconPhotoPlus color={error ? "red" : "gray"} />
                  <Text size="xs" c={error ? "red" : "gray"}>
                    {placeholder || "Зураг хуулах"}
                  </Text>
                </Flex>
              </Button>
            )
          }
        </FileButton>
      </div>
    </InputWrapper>
  );
}
