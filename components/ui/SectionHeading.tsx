import { BlurText } from "@/components/motion/BlurText";

export function SectionHeading({
  id,
  label,
  labelIcon,
  title,
  description,
}: {
  id: string;
  label?: string;
  labelIcon?: "expertise" | "cases";
  title: string;
  description?: string;
}) {
  return (
    <header className="section-heading">
      {label ? <p className={["section-label", labelIcon ? `section-label--${labelIcon}` : ""].filter(Boolean).join(" ")}>{label}</p> : null}
      <BlurText
        text={title}
        animateBy="words"
        delay={58}
        direction="top"
        as="h2"
        id={id}
      />
      {description ? (
        <BlurText
          text={description}
          animateBy="words"
          delay={28}
          startDelay={420}
          direction="top"
          className="section-heading__description"
        />
      ) : null}
    </header>
  );
}
