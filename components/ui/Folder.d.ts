import { FC, ReactNode, CSSProperties } from 'react';

export interface FolderProps {
  color?: string;
  size?: number;
  items?: ReactNode[];
  onClick?: () => void;
  className?: string;
  style?: CSSProperties;
}

declare const Folder: FC<FolderProps>;
export default Folder;
