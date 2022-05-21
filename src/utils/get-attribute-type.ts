const getAttributeType = (displayType: 'number' | 'string' | 'date', traitType: string, value: number | string | Date) => {
    return {
        displayType: displayType,
        traitType: traitType,
        value: value
    }
}

export default getAttributeType;