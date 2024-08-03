import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ControlContainer } from "@angular/forms";
import { Subject, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { Post } from "./post.model";

@Injectable({
    providedIn: 'root'
})

export class PostsService {

    error = new Subject<string>()

    constructor(private http: HttpClient) { }

    createAndSavePost(title: string, content: string) {
        const postData: Post = {
            title: title,
            content: content
        }
        this.http.post<any>('https://ng-complete-guide-5499e-default-rtdb.firebaseio.com/balvindar.json', postData, {
            observe: 'response'
        }).
            subscribe((postData) => {
                console.log(postData);
            }, error => {
                this.error.next(error.message);
            })
    }

    fetchPosts() {

        let searchParams = new HttpParams();
        searchParams = searchParams.append('print', 'prety');
        searchParams = searchParams.append('hi', 'balvindar');
        searchParams = searchParams.append('hi', 'aditya');

        return this.http.get<any>('https://ng-complete-guide-5499e-default-rtdb.firebaseio.com/balvindar.json',
            {
                headers: new HttpHeaders({
                    'custom-header': 'balvindar singh'
                }),
                params: searchParams
            })
            .pipe(map((responseData: any) => {
                const postArray: Post[] = [];
                for (const key in responseData) {
                    if (responseData.hasOwnProperty(key)) {
                        postArray.push({ ...responseData[key], id: key });
                    }
                }
                return postArray;
            }), catchError(errorResponse => {
                return throwError(errorResponse);
            })
            );
    }

    deletePosts() {
        return this.http.delete('https://ng-complete-guide-5499e-default-rtdb.firebaseio.com/balvindar.json',
            {
                observe: 'events'
            }).pipe(tap(event => {
                console.log(event);

                if (event.type === HttpEventType.Sent) {

                }

                if (event.type === HttpEventType.Response) {
                    console.log(event.body);
                }
            }));
    }

}