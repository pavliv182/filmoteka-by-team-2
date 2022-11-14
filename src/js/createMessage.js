// выводит сообщение об ошибке под ИНПУТОМ.

export default function createMessage() {
  const messageEl = document.querySelector('.message');
  messageEl.classList.remove('ishidden');
  setTimeout(() => {
    messageEl.classList.add('ishidden');
  }, 2000);
}
