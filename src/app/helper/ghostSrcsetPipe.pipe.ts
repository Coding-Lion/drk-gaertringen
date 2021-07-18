import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ghostSrcsetPipe'
})
export class GhostSrcsetPipePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    const sizes = [300, 600, 1000, 2000];
    if (value.includes("images.unsplash.com")) {
      return sizes.map(size => `${value.replace('&w=2000', `&w=${size}`)} ${size}w`).join(', ');
    }
    return sizes.map(size => `${value.replace('/content/images/', `/content/images/size/w${size}/`)} ${size}w`).join(', ');
  }

}
