import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LoadingController } from "@ionic/angular";
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class HttpCallInterceptor implements HttpInterceptor {
    constructor(
        public loadingController: LoadingController
    ) { }

    isLoading = false;
    loaderToShow: any;

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        this.present();
        const accessToken = localStorage.getItem("accessToken");
        let tokenizedRequest = request.clone({
            setHeaders: {
                "x-access-token": `${accessToken}`
            },
        });

        return next.handle(tokenizedRequest).pipe(
            map((event: HttpEvent<any>) => {
                this.dismiss();
                if (event instanceof HttpResponse) {
                }
                return event;
            }));
    }

    public loader: any
    async present() {
        this.loader = await this.loadingController.create({
            cssClass: 'my-custom-class',
            message: 'Please wait...',
            duration: 2000
        });
        await this.loader.present();
    }


    async dismiss() {
        let topLoader = await this.loadingController.getTop();
        while (topLoader) {
            if (!(await topLoader.dismiss())) {
                // throw new Error('Could not dismiss the topmost loader. Aborting...');
                break
            }
            topLoader = await this.loadingController.getTop();
        }
    }
}
