import Image from "next/image";
import { assetPath } from "@/lib/asset";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`wordmark${compact ? " wordmark--compact" : ""}`}>
      <Image className="wordmark__image" src={assetPath("/brand/mattdesign.svg")} alt="Matt Design" width={239} height={42} priority unoptimized />
    </span>
  );
}
