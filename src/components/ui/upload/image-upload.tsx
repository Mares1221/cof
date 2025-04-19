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

// Define the IFile type to match the API response
export type IFile = {
  image?: string | null; // URL string from the API
  thumbnail?: string | null; // URL string from the API
  uploading?: boolean;
  size?: number | null;
};

type Props = {
  onChange?: (file: IFile) => void;
  label?: string;
  error?: string;
  value?: string;
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
  const maxSizeInBytes = 10 * 1024 * 1024; // 10MB
  const [file, setFile] = React.useState<IFile | null>(null);
  const resetRef = React.useRef<() => void>(null);

  const onFileUpload = async (blob: File | null) => {
    if (!blob) return;

    if (blob.size > maxSizeInBytes) {
      message.error("Файлын хэмжээ 10MB байна");
      return;
    }

    setFile({
      image: null,
      thumbnail: null,
      uploading: true,
      size: blob.size,
    });
    onUploadStatus?.(true);

    try {
      // Upload the file
      const form = new FormData();
      form.append("file", blob);
      const res = await mediaApi.upload(form);

      // Update state with the API response
      setFile({
        image: res.image,
        thumbnail: res.thumbnail,
        uploading: false,
        size: blob.size,
      });

      // Notify parent component of the uploaded image
      $onChange?.(res);
    } catch (err) {
      message.error("Алдаа гарлаа");
      setFile({
        image: null,
        thumbnail: null,
        uploading: false,
        size: null,
      });
    } finally {
      onUploadStatus?.(false);
    }
  };

  // Handle initial value (if provided)
  React.useEffect(() => {
    if (value) {
      setFile({
        image: value,
        thumbnail: null, // If you have a thumbnail URL in the initial value, you can set it here
        uploading: false,
        size: null,
      });
    }
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
            file?.image ? (
              <Button w={w} h={h} {...props} variant="default" pos="relative">
                <Image
                  src={file.image} // Use the URL directly from the API response
                  fill
                  style={{
                    objectFit: "contain",
                  }}
                  alt="Uploaded image"
                />
                <LoadingOverlay
                  visible={file.uploading || false}
                  opacity={0.3}
                  loaderProps={{ size: "sm" }}
                />
              </Button>
            ) : (
              <Button
                variant="default"
                w={w}
                h={h}
                style={{ borderColor: error ? "red" : undefined }}
                {...props}
              >
                <Flex
                  direction="column"
                  justify="center"
                  align="center"
                  gap={5}
                >
                  {icon || <IconPhotoPlus color={error ? "red" : "gray"} />}
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
