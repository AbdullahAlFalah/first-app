export function splitIntoLines(text: string, maxCharsPerLine: number): string[] {
    const words = text.split(' ');
    const lines: string[] = [];
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
    return lines;
    }

 