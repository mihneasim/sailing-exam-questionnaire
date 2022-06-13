import { LitElement, html, css } from 'lit';

const marinarieData = new URL('../data/marinarie.json', import.meta.url).href;

export class QuestionnaireApp extends LitElement {
  static get properties() {
    return {
      title: { type: String },
      questions: { type: Array },
      score: { type: String }
    };
  }

  static get styles() {
    return css`
      :host {
        min-height: 100vh;
        padding: 15px;
        display: flex;
        flex-direction: column;
        /* align-items: center; */
        justify-content: flex-start;
        font-size: calc(10px + 2vmin);
        color: #1a2b42;
        max-width: 960px;
        /* margin: 0 auto; */
        /* text-align: center; */
        background-color: var(--questionnaire-app-background-color);
      }

      main {
        flex-grow: 1;
        margin-bottom: 1em;
      }

      .app-footer {
        font-size: calc(12px + 0.5vmin);
        align-items: center;
      }

      .app-footer a {
        margin-left: 5px;
      }
    `;
  }

  constructor() {
    super();
    this.title = 'Simulator examen categoria C';
    this.questions = [];
    this.score = 'necalculat';
  }

  connectedCallback() {
    super.connectedCallback();
    fetch(marinarieData)
      .then((x) => x.json())
      .then((x) => {
        this.questions = [...this.questions, ...x];
      });
  }

  validate() {
    // A quickie, should instead use a custom event to ask
    // questions to validate themselves and report status to
    // sum up a score
    let correct = 0;
    let total = 0;
    Array.from(this.shadowRoot.getElementById('main').getElementsByTagName('quiz-question')).forEach((x) => {
      x.validate();
      if (x.correct) correct++;
      total++;
    });
    this.score = `${correct} / ${total}`;
  }

  render() {
    return html`
      <main id="main">
        <h1>${this.title}</h1>

        ${this.questions.map((x, ind) => html`<quiz-question questionId="${ind}" .question="${x}"></quiz-question>`)}
      </main>

      <p>Scor: ${this.score}</p>

      <button @click=${this.validate}>Validează tot</button>

      <p class="app-footer">
        ⛵ Made with love by Mihnea S. and
        <a target="_blank" rel="noopener noreferrer" href="https://github.com/open-wc">open-wc</a>.
      </p>
    `;
  }
}
