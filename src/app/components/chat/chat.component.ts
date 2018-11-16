import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
    title: string;
    model = {
        message: ''
    };

    private questionNum;
    private mt;
    private divr;
    private divi;
    question;
    private output;
    private mes;

    constructor() {
        this.title = 'Chat';
    }

    ngOnInit() {
        this.questionNum = 0;
        this.mt = '<strong>Bot:</strong><br>';
        this.divr = '<div class="request">';
        this.divi = '</div>';                                        // keep count of question, used for IF condition
        this.question = this.mt + 'What is your id?';                // first question

        this.output = document.getElementById('AutoMessage');        // store id="output" in output variable
        this.output.innerHTML = this.question;
        this.mes = document.getElementById('request');

    }

    bot() {
        if (this.questionNum === 0) {
            this.mes.innerHTML = this.divr + this.model.message + this.divi;         // output response
            // document.getElementById('message-box').value = '';           // clear text box
            this.model.message = '';
            this.question = this.mt + 'how old are you?';
            this.timedQuestion();
        } else if (this.questionNum === 1) {
            this.mes.innerHTML = this.divr + this.model.message + this.divi;
            this.model.message = '';
            this.question = this.mt + 'where are you from??';
            this.timedQuestion();
        } else if (this.questionNum === 2) {
            this.mes.innerHTML = this.divr + this.model.message + this.divi;
            this.model.message = '';
            this.question = this.mt + 'is that good?';
            this.timedQuestion();
        }
    }

    timedQuestion() {
        this.output.innerHTML = this.question;
    }

    // push enter key, to run bot function
    typingMessage(e) {
        if (e.which === 13) {
            this.bot();
            if (this.questionNum === 2) {
                this.questionNum = 0;
            } else {
                this.questionNum++;
            }
        }
    }
}

