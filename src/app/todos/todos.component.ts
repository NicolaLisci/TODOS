import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Component, OnInit} from "@angular/core";
import * as firebase from 'firebase/app';
import {AuthService} from "../core/auth.service";
import {Location} from "@angular/common";


interface todos {
  description: string;
  done: boolean;
  color: string;
  UID : string;
}

interface todo extends todos {
  id: string;

}

@Component({
  selector: 'app-root',
  templateUrl: './todos.component.html',
  styleUrls: ["todos.component.css"]
})
export class TodosComponent implements OnInit {
  description: string;
  todosCollection: AngularFirestoreCollection<todos>;
  todos: Observable<{ id: string; data: todo }[]>;
  public email: string;

  constructor(
    private afs: AngularFirestore,
    public authService: AuthService,
    private location : Location,
) {

  }

  ngOnInit() {
    var user = firebase.auth().currentUser;
    var uid;
    if (user != null){
      uid = user.uid;
      console.log(uid);
      this.email = user.email;
    }
    else {
      uid = 0;
    }
    this.todosCollection = this.afs.collection('todos');
    this.todos = this.todosCollection.snapshotChanges()
      .map(actions => {
        return actions
          .map(a => {
          const data = a.payload.doc.data() as todo;
          const id = a.payload.doc.id;
          return {id, data};
        }).filter(data => data.data.UID == uid);
      });
  }

  addTodo() {
    var user = firebase.auth().currentUser;
    var uid;
    if (user != null){
      uid = user.uid;
      console.log(uid);
    }
    else {
       uid = 0;
    }
    this.afs.collection('todos').add({
      'description': this.description,
      'done': false,
      'color': '',
      'UID': uid
    });

  }

  updateTodo(id, event) {
    const checkedVal = event.target.checked;
    this.afs.doc('todos/' + id).update({
      'done': checkedVal
    });
  }
  removeTodo(id){
    this.afs.doc('todos/' + id).delete();
  }

  updateColor(id, color) {
    this.afs.doc('todos/' + id).update({
      'color': color
    });
  }

  logout(){
    this.authService.doLogout()
      .then((res) => {
        this.location.back();
      }, (error) => {
        console.log("Logout error", error);
      });
  }

}
