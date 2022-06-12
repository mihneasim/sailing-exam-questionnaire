import { LitElement, html, css } from 'lit';

export class QuizQuestion extends LitElement {
  static get properties() {
    return {
      question: { type: Object },
      questionId: { type: String }
    };
  }

  static get styles() {
    return css``;
  }

  constructor() {
    super();
  }

  render() {
    return html`
      <p>${this.question.text}</p>
      ${this.question.answers.map(
        (x, ind) => html`<div class="answer">
          <input type="radio" name="${this.questionId}" id="${this.questionId}-${ind}" value="${x.correct ? 1 : 0}" />
          <label for="${this.questionId}-${ind}">${x.text}</label>
        </div>`
      )}
    `;
  }
}
