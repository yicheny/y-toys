import './index.scss';

class Message {
    private readonly _messageBox: HTMLDivElement;
    private readonly _messageList: HTMLDivElement;

    constructor() {
        this._messageBox = document.createElement('div');
        this._messageBox.className = 'c-message-box';
        const root = document.querySelector('html');
        root && root.appendChild(this._messageBox);

        this._messageList = document.createElement('div');
        this._messageList.className = 'c-message-list';
        this._messageBox.append(this._messageList)
    }

    show(info:string){
        const node = document.createElement('div');
        node.className = 'c-message-item';
        node.onanimationend = () => {
            this._messageList.removeChild(node);
        }
        node.append(info)
        this._messageList.append(node)
    }
}

const message = new Message();
export default message;
