export default function (text: string): string {
    const newText = text.slice(0, text.length > 500 ? text.slice(0, 1000).lastIndexOf('.') + 1 : 1000)
    const len = newText.split(/\r\n|\r|\n/).length
    if (len < 10 ) {
        return text.slice(0, text.length > 500 ? text.slice(0, 500 / 10).lastIndexOf('.') + 1 : 500)
    } else {
        return text.slice(0, 50)
    }
    
}