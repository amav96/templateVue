export const generateId = (): number => {
    // aca puede ir otra implementacion para generar id
    return new Date().getMilliseconds() + getRandomInt(100)
}

export const getRandomInt = (max: number) => Math.floor(Math.random() * max);
