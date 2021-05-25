import Content from './content.js'

export default class Comment extends Content {
    constructor(id, name, content, createdAt) {
        super(id, name, content, createdAt);
    }

    toListItem() {
        let li = document.createElement('li')
        li.classList.add('comment')

        let h4 = document.createElement('h4')
        h4.innerText = this.name + " " + this.createdAt()

        let p = document.createElement('p')
        p.innerText = this.content

        li.append(h4, p)
        return li
    }
}