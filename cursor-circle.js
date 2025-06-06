class CursorCircle extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const style = `
      <style>
        .circle {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: white;
          position: fixed;
          pointer-events: none;
          z-index: 9999;
          mix-blend-mode: difference;
        }
      </style>
    `;

    const html = `<div class="circle"></div>`;
    this.shadowRoot.innerHTML = style + html;

    const circle = this.shadowRoot.querySelector('.circle');

    let mouseX = 0, mouseY = 0;
    let currentX = 0, currentY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX - 15;
      mouseY = e.clientY - 15;
    });

    const animate = () => {
      currentX += (mouseX - currentX) * 0.15;
      currentY += (mouseY - currentY) * 0.15;
      circle.style.transform = `translate(${currentX}px, ${currentY}px)`;
      requestAnimationFrame(animate);
    };

    animate();
  }
}

customElements.define('cursor-circle', CursorCircle);
