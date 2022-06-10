const getAttributeType = (displayType: 'number' | 'string' | 'date', traitType: string, value: number | string | Date, key?: string) => {
    return {
        displayType: displayType,
        traitType: traitType,
        value,
        key,
    }
}

export default getAttributeType;