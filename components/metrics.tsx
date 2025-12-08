"use client";

import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Users,
  TrendingUp,
  DollarSign,
  TrendingDown,
  Brain,
  FileText,
  Target,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Metric = {
  value: number;
  label: string;
  description: string;
  suffix?: string;
  prefix?: string;
  icon: React.ReactNode;
  trend?: "up" | "down";
  format?: "number" | "percentage" | "range";
  rangeEnd?: number;
  color?: "chart-1" | "chart-2" | "chart-3" | "chart-4" | "chart-5";
};

const metrics: Metric[] = [
  {
    value: 100000,
    label: "Users Scaled",
    description: "From 1K to 100K+ active users",
    suffix: "+",
    icon: <Users className="h-5 w-5" />,
    trend: "up",
    color: "chart-2",
  },
  {
    value: 300,
    label: "Active Subscribers",
    description: "Grew from 0 to 300+ paying customers",
    suffix: "+",
    icon: <Target className="h-5 w-5" />,
    trend: "up",
    color: "chart-3",
  },
  {
    value: 85,
    label: "Infra Cost Reduction",
    description: "Cut infrastructure costs by 85%",
    suffix: "%",
    icon: <DollarSign className="h-5 w-5" />,
    trend: "down",
    format: "percentage",
    color: "chart-4",
  },
  {
    value: 50,
    label: "Churn Reduction",
    description: "Reduced from 50% to 10%",
    suffix: "%",
    icon: <TrendingDown className="h-5 w-5" />,
    trend: "down",
    format: "range",
    rangeEnd: 10,
    color: "chart-5",
  },
  {
    value: 30000,
    label: "AI Scans Processed",
    description: "Question Scan feature used by 20K+ students",
    suffix: "+",
    icon: <Brain className="h-5 w-5" />,
    trend: "up",
    color: "chart-1",
  },
  {
    value: 18000,
    label: "Documents Processed",
    description: "Processed for search and recommendations",
    suffix: "+",
    icon: <FileText className="h-5 w-5" />,
    trend: "up",
    color: "chart-2",
  },
];

const getColorClasses = (color: string) => {
  const colorMap: Record<
    string,
    {
      text: string;
      border: string;
      iconBg: string;
      iconHover: string;
      gradient: string;
    }
  > = {
    "chart-1": {
      text: "text-chart-1",
      border: "border-l-chart-1",
      iconBg: "bg-chart-1/10",
      iconHover: "group-hover:bg-chart-1/20",
      gradient: "from-chart-1/5",
    },
    "chart-2": {
      text: "text-chart-2",
      border: "border-l-chart-2",
      iconBg: "bg-chart-2/10",
      iconHover: "group-hover:bg-chart-2/20",
      gradient: "from-chart-2/5",
    },
    "chart-3": {
      text: "text-chart-3",
      border: "border-l-chart-3",
      iconBg: "bg-chart-3/10",
      iconHover: "group-hover:bg-chart-3/20",
      gradient: "from-chart-3/5",
    },
    "chart-4": {
      text: "text-chart-4",
      border: "border-l-chart-4",
      iconBg: "bg-chart-4/10",
      iconHover: "group-hover:bg-chart-4/20",
      gradient: "from-chart-4/5",
    },
    "chart-5": {
      text: "text-chart-5",
      border: "border-l-chart-5",
      iconBg: "bg-chart-5/10",
      iconHover: "group-hover:bg-chart-5/20",
      gradient: "from-chart-5/5",
    },
  };
  return colorMap[color] || colorMap["chart-2"];
};

function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  duration = 2000,
  format = "number",
  rangeEnd,
  color = "chart-2",
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  format?: "number" | "percentage" | "range";
  rangeEnd?: number;
  color?: string;
}) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            const startTime = Date.now();
            const startValue = 0;

            const animate = () => {
              const now = Date.now();
              const progress = Math.min((now - startTime) / duration, 1);

              // Easing function for smooth animation
              const easeOutQuart = 1 - Math.pow(1 - progress, 4);
              const current = Math.floor(
                startValue + (target - startValue) * easeOutQuart
              );

              setCount(current);

              if (progress < 1) {
                requestAnimationFrame(animate);
              } else {
                setCount(target);
              }
            };

            requestAnimationFrame(animate);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [target, duration, hasAnimated]);

  const formatNumber = (num: number): string => {
    if (format === "range" && rangeEnd !== undefined) {
      return `${num}% → ${rangeEnd}%`;
    }
    if (format === "percentage") {
      return num.toString();
    }
    if (num >= 100000) {
      return (num / 1000).toFixed(0) + "K";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(num % 1000 === 0 ? 0 : 1) + "K";
    }
    return num.toString();
  };

  const colors = getColorClasses(color);

  return (
    <div ref={ref} className="flex items-baseline gap-2">
      <span
        className={cn(
          `text-4xl font-bold md:text-5xl whitespace-nowrap`,
          colors.text
        )}
      >
        {prefix && (
          <span className="text-muted-foreground text-2xl md:text-3xl">
            {prefix}{" "}
          </span>
        )}
        {formatNumber(count)}
        {suffix && format !== "range" && suffix}
      </span>
    </div>
  );
}

export function Metrics() {
  return (
    <section className="mb-32" aria-labelledby="metrics-heading">
      <h2
        id="metrics-heading"
        className="mb-12 bg-gradient-to-r from-foreground to-chart-2 bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-4xl text-center"
      >
        Impact by Numbers
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {metrics.map((metric) => {
          const color = metric.color || "chart-2";
          const colors = getColorClasses(color);

          return (
            <Card
              key={metric.label}
              className={cn(
                `group border-l-4 shadow-md transition-all duration-300 hover:shadow-xl overflow-hidden relative h-full flex flex-col`,
                colors.border
              )}
            >
              <div
                className={cn(
                  `absolute inset-0 bg-gradient-to-br to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`,
                  colors.gradient
                )}
              />
              <CardContent className="pt-6 pb-6 px-6 relative flex-1 flex flex-col">
                <div className="space-y-4 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className={cn(
                        `p-2 rounded-lg transition-colors duration-300`,
                        colors.iconBg,
                        colors.text,
                        colors.iconHover
                      )}
                    >
                      {metric.icon}
                    </div>
                    {metric.trend && (
                      <div
                        className={cn(
                          `flex items-center gap-1 text-xs font-medium`,
                          colors.text
                        )}
                      >
                        {metric.trend === "up" ? (
                          <TrendingUp className="h-4 w-4" />
                        ) : (
                          <TrendingDown className="h-4 w-4" />
                        )}
                      </div>
                    )}
                  </div>
                  <div className="space-y-1 flex-1 flex flex-col">
                    <div className="flex-1 flex items-center">
                      <AnimatedCounter
                        target={metric.value}
                        suffix={metric.suffix}
                        prefix={metric.prefix}
                        duration={2500}
                        format={metric.format}
                        rangeEnd={metric.rangeEnd}
                        color={color}
                      />
                    </div>
                    <h3
                      className={cn(`text-base font-semibold mt-2`, colors.text)}
                    >
                      {metric.label}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {metric.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
