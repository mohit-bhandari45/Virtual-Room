export interface IRoomData {
    name: string,
    description: string,
    duration: number,
    // participants: ,
    type: string;
    privacy: "public" | "private"; // Default to public
}

interface IReturnValue {
    msg: string;
    status: boolean;
    field: string;
}

export function valueChecks(roomData: IRoomData): IReturnValue {
    const response: IReturnValue = {
        msg: "",
        status: false,
        field: ""
    };
    
    if (roomData.name === "") {
        response.msg = "Name should not be empty";
        response.field = "name";
        return response;
    } else if (roomData.description === "") {
        response.msg = "Description should not be empty";
        response.field = "description";
        return response;
    } else if (roomData.duration === 0) {
        response.msg = "Duration should be more than or equal to 1hr";
        response.field = "duration";
        return response;
    }

    response.msg = "All Set!";
    response.status = true;
    return response;
}