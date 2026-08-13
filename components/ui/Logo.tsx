import Image from "next/image";
import { assetPath } from "@/lib/asset";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`wordmark${compact ? " wordmark--compact" : ""}`}>
      <Image className="wordmark__image" src={assetPath("/brand/mattdesign.svg")} alt="Matt Design" width={281} height={43} priority unoptimized />
    </span>
  );
}
