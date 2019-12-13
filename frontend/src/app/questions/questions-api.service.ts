import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import {API_URL} from '../env';
import {Question} from './questions.model';

@Injectable({providedIn: 'root'})
export class QuestionsApiService {

  constructor(private http: HttpClient) {
  }

  private static _handleError(err: HttpErrorResponse | any) {
    return Observable.throw(err.message || 'Error: Unable to complete request.');
  }

  // GET list of public, future events
  //getQuestions(): Observable<Question[]> {
  getQuestions(): Observable<any> {
    return this.http
      .get(`${API_URL}/questions`)
      .catch(QuestionsApiService._handleError);
  };
  getQuestion(question_num): Observable<any> {
    return this.http
      .get(`${API_URL}/questions/${question_num}`)
      .catch(QuestionsApiService._handleError);
  }
}