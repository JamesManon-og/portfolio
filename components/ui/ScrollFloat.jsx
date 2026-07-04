'use client';

import { useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useDeviceCapability } from '@/lib/useDeviceCapability';
import './ScrollFloat.css';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollFloat({
  children,
  as: Tag = 'div',
  scrollContainerRef = null,
  containerClassName = '',
  textClassName = '',
  animationDuration = 1,
  ease = 'back.inOut(2)',
  scrollStart = 'center bottom+=50%',
  scrollEnd = 'bottom bottom-=40%',
  stagger = 0.03,
}) {
  const containerRef = useRef(null);
  const { reducedMotion, tier, mounted } = useDeviceCapability();
  // Static text (no scroll-scrubbed reveal) on reduced-motion / low-end.
  const animationsDisabled = mounted && (reducedMotion || tier === 'lite');

  const splitText = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    // Chars are inline-block spans, which wrap anywhere — group them by word
    // so lines never break mid-word.
    return text.split(/(\s+)/).map((part, partIndex) =>
      /^\s+$/.test(part) ? (
        ' '
      ) : (
        <span className="word" key={partIndex}>
          {part.split('').map((char, index) => (
            <span className="char" key={index}>
              {char}
            </span>
          ))}
        </span>
      )
    );
  }, [children]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    if (animationsDisabled) return; // leave text in its static, visible state

    const scroller =
      scrollContainerRef?.current ? scrollContainerRef.current : window;

    const charElements = el.querySelectorAll('.char');

    const ctx = gsap.context(() => {
      gsap.fromTo(
        charElements,
        {
          willChange: 'opacity, transform',
          opacity: 0,
          yPercent: 120,
          scaleY: 2.3,
          scaleX: 0.7,
          transformOrigin: '50% 0%',
        },
        {
          duration: animationDuration,
          ease,
          opacity: 1,
          yPercent: 0,
          scaleY: 1,
          scaleX: 1,
          stagger,
          scrollTrigger: {
            trigger: el,
            scroller,
            start: scrollStart,
            end: scrollEnd,
            scrub: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [animationsDisabled, scrollContainerRef, animationDuration, ease, scrollStart, scrollEnd, stagger]);

  return (
    <Tag ref={containerRef} className={`scroll-float ${containerClassName}`}>
      <span className={`scroll-float-text ${textClassName}`}>{splitText}</span>
    </Tag>
  );
}
