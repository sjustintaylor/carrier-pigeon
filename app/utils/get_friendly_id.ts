import { predicates, objects } from 'friendly-words'

export const getFriendlyId = () => {
  const predicate = predicates[Math.floor(Math.random() * predicates.length)]
  const object = objects[Math.floor(Math.random() * objects.length)]
  return `${predicate}-${object}`
}
