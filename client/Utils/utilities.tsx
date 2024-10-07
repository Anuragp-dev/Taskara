import moment from "moment";


export const formatTime = (createdAt: string) => {
    const now = moment();
    const created = moment(createdAt);


    //if the task was created today
    if (created.isSame(now, "day")) {
        return "today";
    }

    //if the task was created yesterday
    if (created.isSame(now.subtract(1, "day"), "day")) {
        return "yesterday";
    }

    // check if created with the last 7 days 
    if (created.isAfter(moment().subtract(6, "day"))) {
        return created.fromNow();
    }

    //check if item was created within the last 4 weeks (up to 1 month ago )
    if (created.isAfter(moment().subtract(28, "day"))) {
        return created.fromNow();
    }

    return created.format("DD/MMM/YYYY");
}