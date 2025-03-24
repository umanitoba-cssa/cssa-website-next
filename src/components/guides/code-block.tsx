"use client";

import React, { useEffect } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-csharp';
import 'prism-themes/themes/prism-atom-dark.css';

interface CodeBlockProps {
  content: string;
  language?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ content, language = 'javascript' }) => {
  useEffect(() => {
    Prism.highlightAll();
  }, [content, language]);

  return (
    <pre className="rounded-md overflow-x-auto">
      <code className={`language-${language}`}>{content.trim()}</code>
    </pre>
  );
};

export default CodeBlock; 