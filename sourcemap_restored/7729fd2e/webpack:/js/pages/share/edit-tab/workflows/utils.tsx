import React from 'react';

import { Text } from '@loomhq/lens';

type Step = {
  heading: string;
  timestamp: string;
  content: string;
  image_url?: string;
};

export const parseSections = (contentBody: string): Record<string, string> => {
  if (!contentBody) {
    return {};
  }

  const lines = contentBody.split('\n');
  const sections: Record<string, string> = {};
  let currentSection = '';
  let currentContent: string[] = [];

  const formatSectionName = (name: string): string => {
    return name.trim().toLowerCase().replace(/\s+/g, '_');
  };

  const removeHashtags = (line: string): string => {
    return line.replace(/^#+\s*/, '').trim();
  };

  const isSectionHeader = (line: string): boolean => {
    return /^#{2,}/.test(line.trim());
  };

  const titleLine = lines.find(
    line => line.trim().startsWith('##') && !line.trim().startsWith('###')
  );
  if (titleLine) {
    sections.title = removeHashtags(titleLine);
  }

  lines.forEach((line: string) => {
    const trimmedLine = line.trim();

    if (!trimmedLine) {
      return;
    }

    if (isSectionHeader(trimmedLine)) {
      if (currentSection) {
        sections[currentSection] = currentContent
          .filter(line => line.trim())
          .join('\n')
          .trim();
        currentContent = [];
      }
      currentSection = formatSectionName(removeHashtags(trimmedLine));
    } else {
      currentContent.push(line.trim());
    }
  });

  if (currentSection) {
    sections[currentSection] = currentContent
      .filter(line => line.trim())
      .join('\n')
      .trim();
  }

  return sections;
};

export const formatSectionContent = ({
  content,
  hasEllipsis,
}: {
  content: string;
  hasEllipsis?: boolean;
}): React.JSX.Element[] => {
  // Return empty array if content is undefined, null, or empty
  if (!content || typeof content !== 'string') {
    return [];
  }

  let cleanContent = content.replace(/<[^>]*>/g, '');

  // Remove timestamps and links [HH:MM](url)
  cleanContent = cleanContent.replace(/\[\d+:\d+\]\([^)]+\)/g, '');

  // Remove &nbsp;
  cleanContent = cleanContent.replace(/&nbsp;/g, '');

  // Filter out images
  cleanContent = cleanContent.replace(
    /^!\[generated-image-at-[^\]]+\]\([^\)]+\)$/gm,
    ''
  );

  const lines = cleanContent
    .split('\n')
    .map(line => line.trim())
    .filter(line => line !== '');

  return lines.map((line, index) => {
    // Process bold text
    const parts: React.ReactNode[] = [];
    let currentIndex = 0;
    const boldRegex = /\*\*(.*?)\*\*/g;
    let boldMatch;

    while ((boldMatch = boldRegex.exec(line)) !== null) {
      if (boldMatch.index > currentIndex) {
        parts.push(line.slice(currentIndex, boldMatch.index));
      }
      parts.push(
        <strong key={`bold-${index}-${boldMatch.index}`}>{boldMatch[1]}</strong>
      );
      currentIndex = boldMatch.index + boldMatch[0].length;
    }

    if (currentIndex < line.length) {
      parts.push(line.slice(currentIndex));
    }

    return (
      <Text
        key={index}
        htmlTag="p"
        alignment="left"
        hasEllipsis={hasEllipsis}
        color={'bodyDimmed'}
      >
        {parts}
      </Text>
    );
  });
};

export const formatSteps = (steps: Step[]): string => {
  if (steps === undefined) {
    return '';
  }
  let formattedSteps = '';

  steps.map(step => {
    const { heading, content } = step as unknown as {
      heading: string;
      content: string[];
    };

    formattedSteps += `#${heading}\n`;

    if (content.length > 0) {
      formattedSteps += content + '\n\n';
    }
  });

  return formattedSteps;
};
