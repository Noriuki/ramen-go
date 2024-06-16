class LoadingSpinner extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = `
      <style>
        .spinner {
          width: 50px;
          height: 50px;
          border: 5px solid var(--default-blue);
          border-top: 5px solid var(--default-red);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      </style>
      <div class="spinner"></div>
    `;
  }
}

customElements.define('loading-spinner', LoadingSpinner);