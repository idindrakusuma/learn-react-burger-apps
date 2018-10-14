export const updateObject = (oldProperties, updatedProperties) => {
  return {
    ...oldProperties,
    ...updatedProperties,
  }
}