export function splitIntoLinesByCharNum(text: string, maxCharsPerLine: number): string[] {

    // Split by \n first to respect manual line breaks
    const paragraphs = text.split('\n');
    const lines: string[] = [];
  

    paragraphs.forEach(paragraph => {
        const words = paragraph.split(' ');
        let line = '';
        words.forEach(word => {
            if ((line + word).length <= maxCharsPerLine) {
                line += word + ' ';
            } else {
                lines.push(line.trim());
                line = word + ' ';
            }
        });

        if (line) lines.push(line.trim());
    });

    return lines;
}

// Only splits by manual line breaks (\n), ignores character limits
export function splitByNewlines(text: string): string[] {
    return text.split('\n').map(line => line.trim());
}


