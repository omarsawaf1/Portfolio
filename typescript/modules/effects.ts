export function typewriterEffect(element: HTMLElement, text: string) {
  element.textContent = "";
  let i = 0;
  const speed = 50;

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}
