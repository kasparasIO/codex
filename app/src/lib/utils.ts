export const domainValidation = new RegExp('^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$');


export const copyToClipboard = (node: HTMLElement) => {
  const handleClick = () => {
    const text = node.textContent || '';
    navigator.clipboard.writeText(text);
    node.dispatchEvent(new CustomEvent('copied', {
      detail: { text: `Text copied! ${text}` },
      bubbles: true
    }));
  };

  node.addEventListener('click', handleClick);

  return {
    destroy() {
      node.removeEventListener('click', handleClick);
    }
  };
};