export default class KeyboardButtons{
    constructor(buttons, resize_keyboard = true) {
        let keyboard = [];

        buttons.forEach(el=>{
            if(el.row) {
                let id_row = el.row - 1;
                let row = keyboard[id_row];
                delete el.row;

                if (!row)
                    keyboard[id_row] = [];

                keyboard[id_row].push(el);
            }else{
                keyboard.push([el]);
            }
        })

        return {
            reply_markup: {
                keyboard: keyboard,
                resize_keyboard
            }
        }
    }
}