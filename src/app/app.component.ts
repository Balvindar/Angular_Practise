import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, ValidatorFn, Validators } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { CustomValidators } from './custom-validators';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  // @ViewChild('signUpForm') signUpForm!: NgForm; // for template driven form
  title = 'rough_practise_angular';
  subscriptions = ['Basic', 'Advanced', 'Pro'];
  genders = ['male', 'female']
  selectedSubscription = 'Advanced';
  signUpForm!: FormGroup;  // for reactive form
  projectForm!: FormGroup;
  forbiddenUsernames = ['chris', 'anna'];
  projectStatus = ['Stable', 'Critical', 'Finished']
  odd: number[] = [];
  even: number[] = [];



  loadedPosts: Post[] = [];
  isFetching = false;



  constructor(private fb: FormBuilder, private http: HttpClient, private postsService: PostsService) { }



  ngOnInit() {

    this.onFetchPosts();
    // this.signUpForm = new FormGroup({
    //   'userData': new FormGroup({
    //     'username': new FormControl(null, [Validators.required, this.forbiddenNames]),
    //     'email': new FormControl(null, [Validators.email, Validators.required, this.forbiddenEmails]),
    //   }),
    //   'gender': new FormControl('male'),
    //   'hobbies': new FormArray([])
    // })

    // this.projectForm = new FormGroup({
    //   'projectName': new FormControl(null, Validators.required),
    //   'email': new FormControl(null, [Validators.email, Validators.required]),
    //   'projectStatus': new FormControl('Critical'),
    // })

  }
  //HTTP MODULE START

  onCreatePost(postData: { title: string; content: string }) {
    // Send Http request
    this.postsService.createAndSavePost(postData.title, postData.content);

  }
  //HTTP MODULE END 


  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signUpForm.get('hobbies')).push(control);

  }

  getControls() {
    return (<FormArray>this.signUpForm.get('hobbies')).controls;
  }

  onSubmit() {
    // console.log(this.signUpForm.value); // for template driven
    console.log(this.signUpForm);
  }
  onNumberEmit(number: number) {
    if (number % 2 == 0) {
      this.even.push(number);
    } else {
      this.odd.push(number);
    }
  }


  forbiddenNames(control: FormControl): { [s: string]: boolean } | any {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return { 'nameIsForbidden': { value: control.value } };
    }
    return null;
  }


  // async validator
  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({ 'emailIsForbidden': true });
        } else {
          resolve(null);
        }
      }, 1500)
    })
    return promise;
  }



  onProjectSubmit() {
    console.log(this.projectForm);

  }

  // vaidator for not allowing test as project name
  checkProjectName(control: FormControl): { [s: string]: boolean } | any {
    if (control.value === 'test') {
      return { 'nameIsForbidden': true };
    }
    return null;
  }

  onFetchPosts() {
    // Send Http request
    this.isFetching = true;
    this.postsService.fetchPosts().subscribe(posts => {
      this.isFetching = false;
      this.loadedPosts = posts;
    });
  }

  onClearPosts() {
    // Send Http request
    this.postsService.deletePosts().subscribe(() => {
      this.loadedPosts = [];
    });
  }
}
