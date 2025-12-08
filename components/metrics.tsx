"use client";

import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollAnimate } from "@/components/scroll-animate";

type Metric = {
  value: string;
  label: string;
  suffix?: string;
  prefix?: string;
};

const metrics: Metric[] = [
  { value: "100000", label: "Users Scaled", suffix: "+" },
  { value: "300", label: "Active Subscribers", suffix: "+" },
  { value: "85", label: "Infra Cost Reduction", suffix: "%" },
  { value: "50", label: "Churn Reduction", suffix: "% → 10%" },
  { value: "30000", label: "AI Scans Processed", suffix: "+" },
  { value: "18000", label: "Documents Processed", suffix: "+" },
];

function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  duration = 2000,
}: {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
              const current = Math.floor(startValue + (target - startValue) * easeOutQuart);
              
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
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [target, duration, hasAnimated]);

  const formatNumber = (num: number): string => {
    if (num >= 100000) {
      return (num / 1000).toFixed(0) + "K";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(num % 1000 === 0 ? 0 : 1) + "K";
    }
    return num.toString();
  };

  return (
    <div ref={ref}>
      <span className="text-4xl font-bold text-chart-2 md:text-5xl">
        {prefix && <span className="text-muted-foreground text-2xl md:text-3xl">{prefix} </span>}
        {formatNumber(count)}
        {suffix}
      </span>
    </div>
  );
}

export function Metrics() {
  return (
    <section className="mb-32" aria-labelledby="metrics-heading">
      <ScrollAnimate direction="up" delay={0}>
        <h2
          id="metrics-heading"
          className="mb-12 bg-gradient-to-r from-foreground to-chart-2 bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-4xl text-center"
        >
          Impact by Numbers
        </h2>
      </ScrollAnimate>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {metrics.map((metric, index) => (
          <ScrollAnimate key={metric.label} direction="up" delay={index * 0.1}>
            <Card className="border-l-4 border-l-chart-2 shadow-md transition-all duration-300 hover:shadow-lg text-center">
              <CardContent className="pt-6 pb-6">
                <div className="space-y-2">
                  <AnimatedCounter
                    target={parseInt(metric.value)}
                    suffix={metric.suffix}
                    prefix={metric.prefix}
                    duration={2500}
                  />
                  <p className="text-sm font-medium text-muted-foreground">
                    {metric.label}
                  </p>
                </div>
              </CardContent>
            </Card>
          </ScrollAnimate>
        ))}
      </div>
    </section>
  );
}

