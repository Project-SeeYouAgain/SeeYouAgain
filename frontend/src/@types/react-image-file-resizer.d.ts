declare module 'react-image-file-resizer' {
    export function resizeImageFile(file: File, maxWidth: number, maxHeight: number, outputFormat: 'JPEG' | 'PNG' | 'WEBP', quality?: number, rotation?: number): Promise<ResizedImage>;

    interface ResizedImage {
        file: File;
        dataURL: string;
        width: number;
        height: number;
        type: string;
    }
}
