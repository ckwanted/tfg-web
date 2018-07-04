const shortText = (text, length = 124) => {
    let newText = text.substring(0, length)

    if(text.length > length) newText += ' ...'

    return newText
}

const Functions = {
    shortText
}

export default Functions
