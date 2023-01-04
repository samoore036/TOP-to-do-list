export default class Task {
    constructor(name, date, priority, project, key) {
        this.name = name;
        this.date = date;
        this.priority = priority;
        /*
        gave project attribute a unique name to reduce 
        chance of conflict if user names their project 'project'
        */
        this.project1234unique = project;
        this.key = key;
    }

    getName() {
        return this.name;
    }

    getDate() {
        return this.date;
    }

    getReadableDate() {
        let year = this.date.split('-')[0];
        
        if (year === '') {
            return 'No Due Date';
        }

        let month = this.date.split('-')[1];
        let date = this.date.split('-')[2];
        return `${month}/${date}/${year}`;
    }

    getFullDate() {
        let year = parseInt(this.date.split('-')[0]);
        let month = parseInt(this.date.split('-')[1]) - 1;
        let date = parseInt(this.date.split('-')[2]);
        return new Date(year, month, date);
    }

    getPriority() {
        return this.priority;
    }

    getProject() {
        return this.project1234unique;
    }

    getKey() {
        return this.key;
    } 
}