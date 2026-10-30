import { useEffect, useState, type ReactNode } from "react";
import {
  Award,
  Briefcase,
  Code,
  Database,
  FileText,
  GraduationCap,
  Headset,
  Lightbulb,
  Rocket,
  Shield,
  Star,
  Target,
  TrendingUp,
  User,
  Users,
  Wrench,
} from "lucide-react";
import defaultContent from "../public/content.json";

export type SiteContent = typeof defaultContent;

export const iconMap = {
  Award,
  Briefcase,
  Code,
  Database,
  FileText,
  GraduationCap,
  Headset,
  Lightbulb,
  Rocket,
  Shield,
  Star,
  Target,
  TrendingUp,
  User,
  Users,
  Wrench,
};

export type IconName = keyof typeof iconMap;
export const iconNames = Object.keys(iconMap) as IconName[];

export function getIcon(name: string) {
  return iconMap[name as IconName] ?? Award;
}

export const contentUrl = () =>
  `${import.meta.env.BASE_URL}content.json?t=${Date.now()}`;

export function useSiteContent() {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  useEffect(() => {
    fetch(contentUrl(), { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => data && setContent(data))
      .catch(() => {});
  }, []);
  return content;
}

export { defaultContent };

// Renders text with **double-asterisk** segments wrapped in a highlighted span.
export function highlight(text: string, className: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <span key={i} className={className}>
        {part.slice(2, -2)}
      </span>
    ) : (
      part
    ),
  );
}
