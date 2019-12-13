import {Component, OnInit, OnDestroy} from '@angular/core';
import {DomSanitizer, SafeStyle} from '@angular/platform-browser';
import {Subscription} from 'rxjs/Subscription';
import {QuestionsApiService} from './questions/questions-api.service';
import {Question} from './questions/questions.model';

function hexEncode(str){
    var hex, i;

    var result = "";
    for (i=0; i<str.length; i++) {
        hex = str.charCodeAt(i).toString(16);
        result += ("000"+hex).slice(-4);
        result += `(${str.charAt(i)}) `
     }

    return result
}
function hexDecode(hexstr){
    var j;
    var hexes = hexstr.match(/.{1,4}/g) || [];
    var back = "";
    for(j = 0; j<hexes.length; j++) {
        back += String.fromCharCode(parseInt(hexes[j], 16));
    }

    return back;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'app';
  questionsSubs: Subscription;
  question_index: number;
  answer_index: number;
  last_question_index: number; //Is the index of the last question in the list (not the last question visited)
  questions: Array<Question>;
  textmatches : boolean;
  solution_shown : boolean;
  left_style : SafeStyle;
  constructor(private questionsApi: QuestionsApiService, private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.questionsSubs = this.questionsApi
      .getQuestions()
      .subscribe(res => {
          this.questions = res;
          this.question_index = 0;
          this.answer_index = 0;
          this.last_question_index = res.length;
          this.textmatches = false;//for now it does not validate when filling the form
          this.solution_shown = false;
          this.left_style = this.sanitizer.bypassSecurityTrustStyle("background-color:blue;");
        },
        console.error
      );
  }

  validate(event: any){
    let input = event.target.innerHTML.replace(/(<([^>]+)>)/ig,"").replace(/(&nbsp;)/ig," ");
    let target: string = this.questions[this.answer_index].files[0].answers_yaml.replace(/(\s*)$/ig, "");
    this.textmatches = input==target;
    if (this.textmatches) {
      this.left_style = this.sanitizer.bypassSecurityTrustStyle("background-color:green;");
    } else {
      this.left_style = this.sanitizer.bypassSecurityTrustStyle("background-color:blue;");
    }
    /* let originput: string = event.target.innerHTML;
    console.log(`originput ${originput} ltr ${hexEncode(originput)}`);
    console.log(`now input ${hexEncode(input)} ${input.length}`);
    console.log(`now target ${hexEncode(target)} ${target.length} eq ${areequal}`); */
  }
  next(){
    //Advance to the next question for reviewing
    this.question_index=this.question_index+1;
  }
  advance(){
    /*Advance to the next question/answer, asumed that the answer is validated correct (ie that the Next button could be clicked only if the answer is correct, and that the user didn't run this function from the console)*/
    let next_qa = this.answer_index+1;
    this.answer_index = next_qa;
    this.question_index = next_qa;
  }
  back(){
    //Return to the previous question for reviewing
    console.log(`back ${this.question_index}`);
    this.question_index=this.question_index-1;
  }
  reset(){
    //console.log(`reset ${this.answer_index} ${this.questions[this.answer_index].files[0].stage_yaml}`);
    document.getElementById("editor").innerHTML = this.questions[this.answer_index].files[0].stage_yaml;
  }
  show_solution(){
    this.solution_shown = true;
  }
  hide_solution(){
    this.solution_shown = false;
  }
  ngOnDestroy() {
    this.questionsSubs.unsubscribe();
  }
}