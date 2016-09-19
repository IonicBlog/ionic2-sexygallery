import {Injectable, Inject} from  '@angular/core';
import {Http, HTTP_PROVIDERS, Response, Headers} from '@angular/http';
import {ConfigService} from "./services/ConfigService";
import {Observable} from  'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class SexyService {
    constructor(
        private http: Http,
        private configService: ConfigService
    ) {

    }

    // 获取抽屉菜单
    getMenuItems() {
        let url = this.configService.getClassify();
        return this.http.get(url).map(
            res => res.json().tngou
        ).catch(this.handleError);
    }

    // 获取列表
    getGalleries(id) {
        let url = this.configService.getList() + "?id=" + id;
        return this.http.get(url).map(
            res => res.json().tngou
        ).catch(this.handleError);
    }
    
    // 获取图片集合
    getDetails(id){
        let url = this.configService.getDetails() + "?id="+id;
       return this.http.get(url).map(
            res => res.json().list
        ).catch(this.handleError);
    }

    // 处理错误
    private handleError(error: Response) {
        console.log(error);
        return Observable.throw(error.json().error || 'Server Error');
    }
}
