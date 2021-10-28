import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterModelo'
})
export class FilterModeloPipe implements PipeTransform {

  transform(value: any, args: any): any {
    const resultPost = [];
    try {
      for (const option of value){
      if (option.DataBeanProperties.Name.toLowerCase().indexOf(args.toLowerCase()) > -1 ||
      (option.DataBeanProperties.IDBusinessProcess.toString()).indexOf(args.toString()) > -1) {
        resultPost.push(option);
      }
      }
    } catch (error) {
    }
    return resultPost;
  }

}
