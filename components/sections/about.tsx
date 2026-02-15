import { Section } from "@/components/ui/section";
import { BlurFade } from "../ui/blur-fade";
import { NumberTicker } from "../ui/number-ticker";
import portfolioData from "@/data/portfolio.json";

const stats = portfolioData.about.stats;
const detailedBio = portfolioData.about.detailed_bio;

// Helper to parse "Heading: content" format
function parseBioParagraph(text: string, index: number, total: number) {
  const isLast = index === total - 1;
  const isFirst = index === 0;

  // Check if paragraph has "Heading:" format
  const headingMatch = text.match(/^([^:]+):\s*(.+)$/);

  if (isFirst) {
    // First paragraph - render with inline highlights for key terms
    return (
      <p key={index}>
        {text.split(/(Full-Stack JavaScript Developer|eSparkBiz)/g).map((part, i) =>
          part === "Full-Stack JavaScript Developer" || part === "eSparkBiz" ? (
            <span key={i} className="font-semibold text-foreground">{part}</span>
          ) : (
            part
          )
        )}
      </p>
    );
  }

  if (isLast) {
    // Last paragraph - blockquote style
    return (
      <p key={index} className="text-foreground font-medium border-l-4 border-primary pl-4 py-2 bg-muted/30 rounded-r-lg">
        {text}
      </p>
    );
  }

  if (headingMatch) {
    // Middle paragraphs with "Heading: content" format
    return (
      <div key={index}>
        <span className="font-semibold text-foreground">{headingMatch[1]}</span>
        : {headingMatch[2]}
      </div>
    );
  }

  // Fallback - plain paragraph
  return <p key={index}>{text}</p>;
}

export function About() {
  return (
    <Section id="about" className="py-20 md:py-28">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <BlurFade delay={0} inView>
          <header className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              About Me
            </h2>
            <p className="text-muted-foreground text-lg">Get to know me better</p>
          </header>
        </BlurFade>

        {/* Content */}
        <BlurFade delay={0.1} inView>
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            {detailedBio.map((paragraph, index) =>
              parseBioParagraph(paragraph, index, detailedBio.length)
            )}
          </div>
        </BlurFade>

        {/* Stats */}
        <div className="mt-16 pt-12 border-t">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => {
              return (
                <div key={stat.label} className="text-center">
                  <div className="mb-2">
                    <NumberTicker
                      value={Number(stat.value)}
                      className="text-4xl md:text-5xl font-bold"
                    />
                    <span className="text-4xl md:text-5xl font-bold">+</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}
