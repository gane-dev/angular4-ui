import { Pipe } from '@angular/core';


@Pipe({ name: 'publishStatus' })
export class PublishStatusPipe {
  transform(status: null | string) {
      if (!status) return 'fa fa-circle-o';

      switch (status) {
      case 'C':
              return 'fa fa-circle';
      case 'P':
              return 'fa fa-adjust';
      case 'U':
              return 'fa fa-ban';
      default:
              return 'fa fa-circle-o';
    }
  }
}
