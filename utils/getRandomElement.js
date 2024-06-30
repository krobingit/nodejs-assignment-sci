export const getRandomElement = (randomIds) => {
    const randomIndex = Math.floor(Math.random() * randomIds.length);
    const selectedRandomId = randomIds[randomIndex];
    return selectedRandomId;
  };