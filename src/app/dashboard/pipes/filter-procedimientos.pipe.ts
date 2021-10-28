import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterProcedimientos'
})
export class FilterProcedimientosPipe implements PipeTransform {

  transform(value: any, args: any): any {
    const resultPost = []
    try {
      for (const option of value) {
        if (option.DataBeanProperties.Name.toLowerCase().indexOf(args.toLowerCase()) > -1 || option.DataBeanProperties.Description.toLowerCase().indexOf(args.toLowerCase()) > -1 || option.DataBeanProperties.ProcedureRow.toString().indexOf(args.toString()) > -1 ||
        option.DataBeanProperties.IDProcedure.toString().indexOf(args.toString()) > -1 ) {
          resultPost.push(option);
        }
      }
    } catch (error) {
      console.log(error);
    }
    return resultPost;
  }
}
