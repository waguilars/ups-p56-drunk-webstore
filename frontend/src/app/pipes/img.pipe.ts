import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

@Pipe({
  name: 'img',
})
export class ImgPipe implements PipeTransform {
  transform(imgName: string, type: string = 'user'): string {
    imgName = !imgName ? 'deafult' : imgName;
    const url = ` ${environment.api}/${type}/img/${imgName}`;
    return url;
  }
}
