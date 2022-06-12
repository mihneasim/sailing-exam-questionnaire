import { LitElement, html, css } from 'lit';

const marinarieData = new URL('../data/marinarie.json', import.meta.url).href;

export class QuestionnaireApp extends LitElement {
  static get properties() {
    return {
      title: { type: String }
    };
  }

  static get styles() {
    return css`
      :host {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        font-size: calc(10px + 2vmin);
        color: #1a2b42;
        max-width: 960px;
        margin: 0 auto;
        text-align: center;
        background-color: var(--questionnaire-app-background-color);
      }

      main {
        flex-grow: 1;
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
  }

  render() {
    return html`
      <main>
        <h1>${this.title}</h1>
      </main>

      <p class="app-footer">
        ⛵ Made with love by Mihnea S. and
        <a target="_blank" rel="noopener noreferrer" href="https://github.com/open-wc">open-wc</a>.
      </p>
    `;
  }
}
