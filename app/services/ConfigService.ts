import {Injectable} from '@angular/core';

@Injectable()
export class ConfigService {
  private hostURL: string = "http://www.tngou.net/tnfs/api";

  constructor() {
  }

  getClassify() {
    return this.hostURL + "/classify";
  }

  getList() {
    return this.hostURL + "/list";
  }

  getDetails() {
    return this.hostURL + "/show";
  }

}
