import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'markdown'
})
export class MarkdownPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string): SafeHtml {
    if (!value) return '';

    let html = value
      .replace(/\n\n/g, '</p><p>') // Convert double new lines to paragraphs
      .replace(/\n/g, '<br>') // Convert single new lines to <br>
      .replace(/^# (.*$)/gm, '<h1>$1</h1>') // Convert # Heading
      .replace(/^## (.*$)/gm, '<h2>$1</h2>') // Convert ## Heading
      .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>') // Convert **bold**
      .replace(/\*(.*?)\*/g, '<i>$1</i>') // Convert *italic*
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>') // Convert [text](url) to link
      .replace(/^- (.*$)/gm, '<li>$1</li>') // Convert - list items
      .replace(/(<li>.*<\/li>)/g, '<ul>$1</ul>'); // Wrap lists in <ul>

    // Wrap everything inside a <p> tag
    html = `<p>${html}</p>`;

    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
