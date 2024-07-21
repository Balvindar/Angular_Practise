import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ControlContainer } from "@angular/forms";
import { map } from "rxjs/operators";
import { Post } from "./post.model";

@Injectable({
    providedIn: 'root'
})

export class PostsService {

    constructor(private http: HttpClient) { }

    createAndSavePost(title: string, content: string) {
        const postData: Post = {
            title: title,
            content: content
        }
        this.http.post<{ name: string }>('https://ng-complete-guide-5499e-default-rtdb.firebaseio.com/balvindar.json', postData).
            subscribe((postData) => {
                console.log(postData);
            })
    }

    fetchPosts() {
        return this.http.get<{ [key: string]: Post }>('https://ng-complete-guide-5499e-default-rtdb.firebaseio.com/balvindar.json')
            .pipe(map((responseData) => {
                const postArray: Post[] = [];
                for (const key in responseData) {
                    if (responseData.hasOwnProperty(key)) {
                        postArray.push({ ...responseData[key], id: key });
                    }
                }
                return postArray;
            }));
    }

    deletePosts() {
        return this.http.delete('https://ng-complete-guide-5499e-default-rtdb.firebaseio.com/balvindar.json');
    }

}