import { useEffect, useState } from "react";
import { TrigToast } from "../../request/Toast";
import { defaultReqPost } from "../../request/main";
import { date } from "yup";

type PropsRecurrent = {
    refresh: any,
    setRefresh: any,
    dataImport?: any;
    filmDetailsId: string;
    theatreId: string;
};

type PropsOnetime = {
    refresh: any,
    setRefresh: any,
    dataImport?: any;
    filmDetailsId: string;
    theatreId: string;
};

export const ModelRecurrent: React.FC<PropsRecurrent> = ({ refresh, setRefresh, dataImport, filmDetailsId, theatreId }) => {
    const data = dataImport ? dataImport : { title: "Schedule Movie", day: "", time: "", from: "", till: "", id: null }


    const [selectedDays, setSelectedDays] = useState<string[]>([]);
    const [selectedTime, setSelectedTime] = useState<string>("");
    const [fromDate, setFromDate] = useState<string>('');
    const [tillDate, setTillDate] = useState<string>('');

    const dayOrder = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    useEffect(() => {
        setSelectedDays(data.day.split(","))
        setSelectedTime(data.time)
        setFromDate(data.from)
        setTillDate(data.till)
    }, [dataImport]);


    const handleDayClick = (day: string) => {
        setSelectedDays((prevSelectedDays) => {
            let updatedDays;

            if (prevSelectedDays.includes(day)) {
                updatedDays = prevSelectedDays.filter((selectedDay) => selectedDay !== day);
            } else {
                updatedDays = [...prevSelectedDays, day];
            }
            return updatedDays.sort((a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b));
        });
    };

    const handleSaveChanges = async () => {

        if (!(selectedDays.length > 0)) {
            TrigToast("Please Select at least one day", "error")
            return
        }
        if (!selectedTime) {
            TrigToast("Please Select time", "error")
            return
        }
        if (!fromDate) {
            TrigToast("Please Select Start date", "error")
            return
        } if (!tillDate) {
            TrigToast("Please Select End date", "error")
            return
        }
        
        const newRecurrentFilm = {
            id: data.id,
            filmDetailsId: filmDetailsId,
            theatreId: theatreId,
            type: "recurrent",
            day: selectedDays.filter(Boolean).join(','),
            time: selectedTime,
            from: fromDate,
            till: tillDate,
        };

        try {
            const response = await defaultReqPost(newRecurrentFilm, 'films/schedule-film');

            TrigToast("Changes Saved", "success")
        } catch (error: any) {
            TrigToast("Error! " + error.response.data.error, "error")
        }

        setRefresh(!refresh)

    };

    const handleResetForm = () => {
        setSelectedDays([]);
        setSelectedTime('');
        setFromDate('');
        setTillDate('');
    };

    return (
        <div className="modal fade" id="RecurrentModel" data-bs-backdrop="static" role="dialog" aria-labelledby="staticBackdrop" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">{data.title}</h5>
                    </div>

                    <div className="modal-body">
                        <div className="d-flex justify-content-around mb-3">
                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                                <button
                                    key={day}
                                    type="button"
                                    className={`btn btn-sm ${selectedDays.includes(day) ? 'btn-primary' : 'btn-light'} font-weight-bold`}
                                    onClick={() => handleDayClick(day)}
                                >
                                    {day}
                                </button>
                            ))}

                        </div>

                        <div className="mb-3">
                            <label htmlFor="timePicker" className="form-label">Time</label>
                            <input
                                type="time"
                                className="form-control"
                                id="timePicker"
                                value={selectedTime}
                                onChange={(e) => setSelectedTime(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="fromDatePicker" className="form-label">From</label>
                            <input
                                type="date"
                                className="form-control"
                                id="fromDatePicker"
                                value={fromDate}
                                onChange={(e) => setFromDate(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="tillDatePicker" className="form-label">Till</label>
                            <input
                                type="date"
                                className="form-control"
                                id="tillDatePicker"
                                value={tillDate}
                                onChange={(e) => setTillDate(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="modal-footer">
                        <button type="button" onClick={handleResetForm} className="btn btn-sm btn-light-danger font-weight-bold" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-sm btn-primary font-weight-bold" onClick={handleSaveChanges}>Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    );
};



export const ModelOnetime: React.FC<PropsOnetime> = ({ refresh, setRefresh, dataImport, filmDetailsId, theatreId }) => {
    const data = dataImport ? dataImport : { title: "Schedule Movie", date: "", time: "", id: null }
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [selectedTime, setSelectedTime] = useState<string>('');

    useEffect(() => {
        setSelectedDate(data.date)
        setSelectedTime(data.time)

    }, [dataImport]);



    const handleSaveChanges = async () => {

        if (!selectedTime) {
            TrigToast("Please Select time", "error")
            return
        }
        if (!selectedDate) {
            TrigToast("Please Select date", "error")
            return
        }
        const newOnetimeFilm = {
            id: data.id,
            filmDetailsId: filmDetailsId,
            theatreId: theatreId,
            type: "onetime",
            date: selectedDate,
            time: selectedTime,
            
        };

        try {
            const response = await defaultReqPost(newOnetimeFilm, 'films/schedule-film');
            TrigToast("Changes Saved", "success")
        } catch (error: any) {
            TrigToast("Error! " + error.response.data.error, "error")
        }

        setRefresh(!refresh)
    };
    const handleResetForm = () => {
        setSelectedDate("");
        setSelectedTime('');

    };

    return (
        <div className="modal fade" id="SingleModel" data-bs-backdrop="static" role="dialog" aria-labelledby="staticBackdrop" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">{data.title}</h5>
                    </div>

                    <div className="modal-body">

                        <div className="mb-3">
                            <label htmlFor="fromDatePicker" className="form-label">From</label>
                            <input
                                type="date"
                                className="form-control"
                                id="fromDatePicker"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="timePicker" className="form-label">Time</label>
                            <input
                                type="time"
                                className="form-control"
                                id="timePicker"
                                value={selectedTime}
                                onChange={(e) => setSelectedTime(e.target.value)}
                            />
                        </div>




                    </div>

                    <div className="modal-footer">
                        <button onClick={handleResetForm} type="button" className="btn btn-sm btn-light-danger font-weight-bold" data-bs-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-sm btn-primary font-weight-bold" onClick={handleSaveChanges}>Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    );
};





