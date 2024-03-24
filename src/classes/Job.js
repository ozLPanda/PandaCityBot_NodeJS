export default class Job{
    _cmd_name = null
    _json = null

    events = [
        // {
        //     text: "Вам пизданули лопатой, вы потеряли сознания и выебались",
        //     payday: 0,
        //     chance: 0.2
        // }
    ]

    constructor(job) {
        this._cmd_name = job.cmd_name;

        if(job.events != null) {
            this._json = job.events;
            this.events = job.events;
        }
    }

    // Получить случайное событие
    getRandomEvent(){
        const lerp = (min, max, value) => ((1 - value) * min + value * max);

        const drop = events => {
            const total = events.reduce((accumulator, item) => (accumulator + item.chance), 0);
            const chance = lerp(0, total, Math.random());

            let current = 0;
            for (const item of events) {
                if (current <= chance && chance < current + item.chance) {
                    return item;
                }

                current += item.chance;
            }
        }

        return drop(this.events);
    }
}