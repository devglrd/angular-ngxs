import { Pipe, PipeTransform } from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";

@Pipe({
  name: 'innerHTML',
  standalone: true
})
export class InnerHTMLPipe implements PipeTransform {

  constructor(
    private sanitaze: DomSanitizer
  ) {
  }

  transform(value: string, ...args: unknown[]): unknown {
    return this.sanitaze.bypassSecurityTrustHtml(value);
  }

}
