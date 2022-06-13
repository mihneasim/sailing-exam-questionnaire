import { LitElement, html, css } from 'lit';
import { classMap } from 'lit/directives/class-map.js';

export class QuizQuestion extends LitElement {
  static get properties() {
    return {
      question: { type: Object },
      questionId: { type: String },
      validated: { type: Boolean },
      correct: { type: Boolean },
      selectedAnswer: { type: Number }
    };
  }

  static get styles() {
    return css`
      p {
        padding-top: 1em;
      }
      .answer {
        font-size: smaller;
      }
      .answer.green {
        background-color: #baf59e;
      }
      .answer.red {
        background-color: rgb(255 212 212);
      }
    `;
  }

  constructor() {
    super();
    this.validated = this.correct = false;
    this.selectedAnswer = undefined;
  }

  onChange(e) {
    // another dirty one, i was in a hurry
    this.selectedAnswer = e.target.id.substr(e.target.id.lastIndexOf('-') + 1);
    console.log(`Selected answer`, this.selectedAnswer);
  }

  validate() {
    if (!this.selectedAnswer) return;
    this.correct = this.question.answers[this.selectedAnswer].correct === true;
    this.validated = true;
  }

  /**
   * Answer is:
   * * correct and selected: show green
   * * correct but not selected: show green
   * * incorrect and selected: show red
   */
  classMapForAnswer(answer, ind) {
    return {
      answer: true,
      green: this.validated && answer.correct, // && this.correct, - correct/incorrect reduces
      red: this.validated && this.selectedAnswer == ind && !answer.correct
    };
  }

  render() {
    return html`
      <p>${+this.questionId + 1}. ${this.question.text}</p>
      ${this.question.answers.map(
        (x, ind) => html`<div class="answer" class=${classMap(this.classMapForAnswer(x, ind))}>
          <input
            type="radio"
            name="${this.questionId}"
            id="${this.questionId}-${ind}"
            value="${x.correct ? 1 : 0}"
            @change=${this.onChange}
          />
          <label for="${this.questionId}-${ind}">${x.text}</label>
        </div>`
      )}
      <button @click=${this.validate}>Validează</button>
    `;
  }
}
