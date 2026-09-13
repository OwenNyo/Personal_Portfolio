document.addEventListener('click', (event) => {
  const button = (event.target as HTMLElement).closest<HTMLButtonElement>('.card__flip');
  if (!button) return;
  const card = button.closest<HTMLElement>('.card');
  if (!card) return;

  const flipped = card.classList.toggle('is-flipped');
  const front = card.querySelector<HTMLElement>('.card__face--front');
  const back = card.querySelector<HTMLElement>('.card__face--back');
  if (!front || !back) return;

  front.toggleAttribute('inert', flipped);
  back.toggleAttribute('inert', !flipped);
  (flipped ? back : front).querySelector<HTMLButtonElement>('.card__flip')?.focus();
});
