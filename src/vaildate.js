export function validate(zip){

    return /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zip)
}

export function showMessage(message, className)
{
    const div = document.createElement('div')
    div.className = `alert ${className}`
    div.appendChild(document.createTextNode(message))

    const container = document.querySelector('.container')

    container.insertAdjacentElement('afterbegin', div)

    setTimeout(()=> document.querySelector('.alert').remove(),3000)

}