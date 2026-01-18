import { useEffect, useState } from 'react';

export default function TypewriterText({ text, className = "" }) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (displayedText.length < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setIsComplete(true);
    }
  }, [displayedText, text]);

  return (
    <span className={className}>
      {displayedText}
      {!isComplete && <span className="animate-pulse">|</span>}
    </span>
  );
}
