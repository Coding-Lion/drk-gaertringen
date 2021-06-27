import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormatPipe'
})
export class DateFormatPipePipe implements PipeTransform {

  transform(value: string): unknown {
    return new Date(value).toDateString();
  }

}
