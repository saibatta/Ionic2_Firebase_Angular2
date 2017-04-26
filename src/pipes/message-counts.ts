import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'message_counts'
})
@Injectable()
export class MessageCounts implements PipeTransform {
  public onlineCount = 0;
  public object: string[];
  transform(string: any, arg: any) { 
    this.onlineCount = 0;
    return this.onlineCount;
  }
}
