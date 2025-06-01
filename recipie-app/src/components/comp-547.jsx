import { AlertCircleIcon, ImageIcon, UploadIcon, XIcon } from "lucide-react"

import {
  formatBytes,
  useFileUpload,
} from "@/hooks/use-file-upload"
import { Button } from "@/components/ui/button"

import { X } from "lucide-react"

export default function Component({onUploadVisible, onUpload}) {
  const maxSizeMB = 20
  const maxSize = maxSizeMB * 1024 * 1024
  const maxFiles = 4

  const [
    { files, isDragging, errors },
    {
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      openFileDialog,
      removeFile,
      clearFiles,
      getInputProps,
    },
  ] = useFileUpload({
    accept: "image/png,image/jpeg,image/jpg",
    maxSize,
    multiple: true,
    maxFiles
  })

  return (
    <div className="flex flex-col gap-2">
      {/* Drop area */}
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        data-dragging={isDragging || undefined}
        data-files={files.length > 0 || undefined}
        className="border-input data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 relative flex min-h-52 flex-col items-center overflow-hidden rounded-xl border border-dashed p-4  bg-background transition-colors not-data-[files]:justify-center has-[input:focus]:ring-[3px]">
        <input {...getInputProps()} className="sr-only" aria-label="Upload image file" />
        <div
          className="flex flex-col items-center justify-center px-4 py-3 text-center">
          <div
            className="bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border"
            aria-hidden="true">
            <ImageIcon className="size-4 opacity-60" />
          </div>
          <p className="mb-1.5 text-sm font-medium">Drop your images here</p>
          <p className="text-muted-foreground text-xs">
             PNG, JPG, JPEG (max. {maxSizeMB}MB)
          </p>
          <Button variant="outline" className="mt-4" onClick={openFileDialog}>
            <UploadIcon className="-ms-1 opacity-60" aria-hidden="true" />
            Select images
          </Button>
        </div>
        <div className="absolute top-0 right-0 m-2">
          <Button onClick={onUploadVisible}>
            <X/>
          </Button>
        </div>
      </div>
      {errors.length > 0 && (
        <div className="text-destructive flex items-center gap-1 text-xs" role="alert">
          <AlertCircleIcon className="size-3 shrink-0" />
          <span>{errors[0]}</span>
        </div>
      )}
      {/* File list */}
      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file) => (
            <div
              key={file.id}
              className="bg-background flex items-center justify-between gap-2 rounded-lg border p-2 pe-3">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="bg-accent aspect-square shrink-0 rounded">
                  <img
                    src={file.preview}
                    alt={file.file.name}
                    className="size-10 rounded-[inherit] object-cover" />
                </div>
                <div className="flex min-w-0 flex-col gap-0.5">
                  <p className="truncate text-[13px] font-medium">
                    {file.file.name}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {formatBytes(file.file.size)}
                  </p>
                </div>
              </div>

              <Button
                size="icon"
                variant="ghost"
                className="text-muted-foreground/80 hover:text-destructive -me-2 size-8 hover:bg-transparent"
                onClick={() => removeFile(file.id)}
                aria-label="Remove file">
                <XIcon aria-hidden="true" />
              </Button>
            </div>
          ))}
          {/* Remove/Upload all files buttons */}
          {files.length > 0 && (
            <div className="flex flex-row justify-between">
              <div>
                <Button size="sm" variant="outline" className="hover:text-destructive" onClick={clearFiles}>
                  Remove Files
                </Button>
              </div>
              <div>
                <Button size="sm" variant="outline" className="hover:text-green-600" onClick={onUpload}>
                  Upload Files
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
      <p
        aria-live="polite"
        role="region"
        className="text-white mt-2 text-center text-xs">
        Multiple image uploader w/ image list ∙{" "}
        <a
          href="https://github.com/origin-space/originui/tree/main/docs/use-file-upload.md"
          className="hover:text-foreground underline">
          API
        </a>
      </p>
    </div>
  );
}
