import React, { useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {
    useState
} from 'react';
import { KTIcon } from '../../../_metronic/helpers';
import { toAbsoluteUrl } from '../../../_metronic/helpers';
import { TrigToast } from '../../request/Toast';
import { defaultReqGet, defaultReqPost } from '../../request/main';

type DraggableItem = {
    id: string | null;
    index: number,
    theaterGridId: string | null
    name: string | null;
    adult: string,
    child: string
    rows?: RowItem[]
}


type RowItem = {
    id: string | null;
    index: number,
    name: string | null;
    seats: number[]
    locked: number
}

type ColItem = {
    id: string | null;
    index: number,
    name: string | null;
    locked: number
}



export const TheaterWireFrame = () => {

    const theaterId = "2361201f-fa03-40b0-9b7c-40e1df05d270"
    const [theaterGridId, setTheaterGridId] = useState(null)
    const [numCol, setNumCol] = useState("")
    const [verifiedCol, setVerifiedCol] = useState(false)
    const [colNames, setColnames] = useState<ColItem[]>([]);
    const [characters, updateCharacters] = useState<DraggableItem[]>([]);


    const removeGrid = async () => {

        try {
            const response = await defaultReqPost(
                {
                    theaterId: theaterId,
                    theaterGridId: theaterGridId,
                }, "control/delete-theater-grid"
            );
            setNumCol("")
            setVerifiedCol(false)
            setColnames([])
            updateCharacters([])
            console.log("Successfully removed")
        } catch (error: any) {
            console.log(error.response.data.error)
        }

    }

    useEffect(() => {
        getData()
    }, [])



    const getData = async () => {
        try {
            const response = await defaultReqGet(
                "control/get-theater-grid/" + theaterId);
            let data = response.data.data
            // console.log(data)
            if(data){
                setTheaterGridId(data.theaterGridId)
                data.sections.forEach((section: DraggableItem) => {
                    if (section.rows) {
                        section.rows.forEach((row: RowItem) => {
                            if (typeof row.seats === 'string') {
                                row.seats = JSON.parse(row.seats);
                            }
                        });
                    }
    
                });
    
                if (response.data.data.columns.length > 0) {
                    setNumCol(response.data.data.columns.length)
                    setVerifiedCol(true)
                    setColnames(response.data.data.columns)
                    updateCharacters(response.data.data.sections)
                }
    
            }
           

        } catch (error: any) {
            setTheaterGridId(null)
            console.log(error)
        }
    }



    const saveData = async () => {
        try {
            if (verifiedCol && characters.length > 0) {
                const response = await defaultReqPost(
                    {
                        theaterId: theaterId,
                        theaterGridId: theaterGridId,
                        columns: colNames,
                        sections: characters,
                    }, "control/update-theater-grid");
                getData()
                console.log(response.data.message)
            }else{
                console.log("some fields are missing")
            }
           
        } catch (error: any) {
            console.log(error.response.data.error)
        }
    };





    const submitCol = () => {
        if (!numCol) {
            TrigToast("Enter number Of columns ", "error")
            return
        } else if (Number(numCol) < 1) {
            TrigToast("Theater must have at laeat one column", "error")
            return
        } else if (Number(numCol) > 25) {
            TrigToast("Maximum 25 columns allowed", "error")
            return
        }
        setVerifiedCol(true)
        setColnames(Array.from({ length: Number(numCol) }, (_, num) => ({
            id: null,
            index: num,
            name: "",
            locked: 0
        })));

    }

    const handleColName = (index: number, newValue: string) => {
        const updatedValues = [...colNames];

        updatedValues[index] = {
            ...updatedValues[index],
            name: newValue
        };

        setColnames(updatedValues);
    };


    const addSection = () => {
        updateCharacters([...characters, {
            id: null,
            index: characters.length > 0 ? (Math.max(...characters.map(character => character.index)) + 1) : 1,
            theaterGridId: null,
            name: "",
            adult: "",
            child: "",
            rows: []

        }])
    }




    function handleOnDragEnd(result: any) {
        if (!result.destination) return;
        const items = Array.from(characters);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        updateCharacters(items);
    }

    const addRow = (index: number) => {
        updateCharacters(characters.map(item =>
            item.index == index && item.rows
                ? {
                    ...item,
                    rows: [
                        ...item.rows,
                        {
                            id: null,
                            index: item.rows && item.rows.length > 0
                                ? (Math.max(...item.rows.map((rowOld: RowItem) => rowOld.index)) + 1)
                                : 1,
                            name: "",
                            seats: Array.from({ length: Number(numCol) }, (_, index) => index + 1).map((seat) => 0),
                            locked: 0
                        }
                    ]
                }
                : item
        ));
    }


    const updateRowName = (index: number, rowIndex: number, newName: string) => {


        updateCharacters(characters.map(item =>
            item.index === index && item.rows
                ? {
                    ...item,
                    rows: item.rows.map(row =>
                        row.index === rowIndex ? { ...row, name: newName } : row
                    )
                }
                : item
        ));
    };


    const toggleSeat = (index: number, rowIndex: number, seatIndex: number) => {
        const item = characters.find(item => item.index === index);
        let row = null
        if (item && item.rows) {
            row = item.rows.find(row => row.index === rowIndex);
        }
        let rowSum = row?.seats.reduce((accumulator: number, currentValue: number) => accumulator + currentValue, 0) ?? 0;
        if (row?.seats[seatIndex] == 1) {
            rowSum -= 1
        }
        if (row?.seats[seatIndex] == 0) {
            rowSum += 1
        }


        let lockRow = false
        if ((rowSum && rowSum > 0)) {
            lockRow = true
        }


        let colSum = 0

        characters.forEach((item: DraggableItem, index: number) => {
            if (item.rows) {
                item?.rows.forEach((row: RowItem, index2: number) => {
                    if (row.seats) {
                        colSum += row.seats[seatIndex]
                    }
                });
            }
        });

        if (row?.seats[seatIndex] == 1) {
            colSum -= 1
        }
        if (row?.seats[seatIndex] == 0) {
            colSum += 1
        }
        // console.log(colSum)
        let lockCol = false
        if ((colSum > 0)) {
            lockCol = true
        }


        const updatedValues = [...colNames];
        updatedValues[seatIndex] = {
            ...updatedValues[seatIndex],
            locked: lockCol ? 1 : 0
        };
        setColnames(updatedValues);


        updateCharacters(characters.map(item =>
            item.index === index && item.rows
                ? {
                    ...item,
                    rows: item.rows.map(row =>
                        row.index === rowIndex
                            ? {
                                ...row,
                                locked: lockRow ? 1 : 0,
                                seats: row.seats.map((seat, idx) =>
                                    idx === seatIndex ? (seat === 0 ? 1 : 0) : seat
                                )
                            }
                            : row
                    )
                } : item
        ));
    };



    const dropRow = (index: number, rowIndex: number) => {
        updateCharacters(characters.map(item =>
            item.index === index && item.rows
                ? {
                    ...item,
                    rows: item.rows.filter(row => row.index !== rowIndex)
                }
                : item
        ));
    }

    const dropSection = (index: number) => {
        updateCharacters(characters.filter(item => item.index !== index))
    }










    return (
        <>

            <div >
                <div className='mx-5 d-flex justify-content-end align-items-center gap-2'>
                    <button onClick={() => { removeGrid() }}
                        className="btn btn-sm btn-danger fw-bolder">
                        <KTIcon iconName="minus" className='fs-2' />
                        Remove Grid
                    </button>
                    <button onClick={() => { saveData() }}
                        className="btn btn-sm btn-primary fw-bolder">
                        <KTIcon iconName="minus" className='fs-2' />
                        Save Grid
                    </button>
                </div>
                <div className='d-flex my-3 justify-content-center align-items-center gap-3'>
                    <img style={{ objectFit: 'contain', width: '30%' }} src={toAbsoluteUrl('/media/images/3670.jpg')} alt="" />

                </div>
                <div className='d-flex justify-content-center mx-5 my-3 align-items-center '>
                    <label className="fw-bold text-muted">Number of Columns: {verifiedCol ? numCol : ""}</label>
                    {!verifiedCol ?
                        <>
                            <input
                                type='text'
                                className='rounded border-1 m-1 form-control form-control-sm form-control-solid'
                                style={{
                                    width: '130px', height: '33px', padding: '0', borderStyle: 'solid',
                                    borderColor: 'rgb(50 13 149 / 10%)', textAlign: 'center'
                                }}
                                placeholder=''
                                required
                                step='1'
                                value={numCol}
                                onInput={(e: React.FormEvent<HTMLInputElement>) => {
                                    const input = e.target as HTMLInputElement;
                                    input.value = input.value.replace(/[^0-9]/g, '');
                                }}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    const value = e.target.value.replace(/[^0-9]/g, '');
                                    setNumCol(value);
                                }}
                            />

                            <button
                                onClick={submitCol}
                                className="mx-4 btn btn-sm btn-success me-3">Save
                            </button>
                        </>
                        : null}

                </div>
                {verifiedCol ?
                    <>
                        <div className="mx-auto  d-flex justify-content-center mt-3 ">
                            <div
                                className=' rounded border-1  m-1 form-control form-control-sm form-control-solid'
                                style={{
                                    visibility: 'hidden', width: '33px', height: '33px', padding: '0',
                                    borderStyle: 'solid', borderColor: 'rgb(50 13 149 / 10%)', textAlign: 'center'
                                }}
                            ></div>
                            {Array.from({ length: Number(numCol) }, (_, index) => index + 1).map((col: number) => {
                                return (
                                    <input
                                        key={col}
                                        disabled={colNames[col - 1].locked ? true : false}
                                        type='text'
                                        className='rounded border-1 m-1 form-control form-control-sm form-control-solid'
                                        style={{
                                            width: '33px', height: '33px', padding: '0', borderStyle: 'solid',
                                            borderColor: 'rgb(50 13 149 / 10%)', textAlign: 'center'
                                        }}
                                        placeholder=''
                                        required
                                        step='1'
                                        value={colNames[col - 1].name ?? ''}


                                        onInput={(e: React.FormEvent<HTMLInputElement>) => {
                                            const input = e.target as HTMLInputElement;
                                            input.value = input.value.replace(/[^0-9]/g, '');
                                        }}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                            const inputValue = e.target.value.replace(/[^0-9]/g, '');
                                            handleColName(col - 1, inputValue);
                                        }}
                                    />
                                )
                            })}
                            <div

                                className=' rounded border-1  m-1 form-control form-control-sm form-control-solid'
                                style={{
                                    visibility: 'hidden', width: '33px', height: '33px', padding: '0',
                                    borderStyle: 'solid', borderColor: 'rgb(50 13 149 / 10%)', textAlign: 'center'
                                }}


                            ></div>
                        </div>
                        <DragDropContext onDragEnd={handleOnDragEnd}>
                            <Droppable droppableId="characters">
                                {(provided) => (
                                    <ul style={{ listStyleType: 'none' }} className="characters p-0" {...provided.droppableProps} ref={provided.innerRef}>
                                        {characters.map(({ index, id, name, adult, child, theaterGridId }, index2) => {
                                            if (!index) return null;
                                            return (
                                                <Draggable key={index} draggableId={index.toString()} index={index2}>
                                                    {(provided) => (
                                                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>

                                                            <div className='d-flex justify-content-center align-items-center mt-10'>
                                                                <div className='p-4 my-3' style={{ width: '100%', maxWidth: '400px', }} >
                                                                    <input
                                                                        required
                                                                        type='text'
                                                                        value={characters.find(item => item.index == index)?.name ?? ""}
                                                                        className='mb-2 form-control form-control-sm form-control-solid'
                                                                        placeholder='Section name'
                                                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                                            const value = e.target.value
                                                                            updateCharacters(characters.map(item => item.index === Number(index) ?
                                                                                { ...item, name: value } : item));
                                                                        }}
                                                                    />


                                                                    <div className='d-flex justify-content-center gap-2'>
                                                                        <input
                                                                            required
                                                                            type='text'
                                                                            value={characters.find(item => item.index == index)?.adult ?? ""}
                                                                            className='form-control form-control-sm form-control-solid'
                                                                            placeholder='Adult ticket price'
                                                                            onInput={(e: React.FormEvent<HTMLInputElement>) => {
                                                                                const input = e.target as HTMLInputElement;
                                                                                input.value = input.value.replace(/[^0-9]/g, '');
                                                                            }}
                                                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                                                const value = e.target.value
                                                                                updateCharacters(characters.map(item => item.index === Number(index) ?
                                                                                    { ...item, adult: value } : item));
                                                                            }}
                                                                        />
                                                                        <input
                                                                            required
                                                                            type='text'
                                                                            value={characters.find(item => item.index == index)?.child ?? ""}
                                                                            className='form-control form-control-sm form-control-solid'
                                                                            placeholder='Adult ticket price'
                                                                            onInput={(e: React.FormEvent<HTMLInputElement>) => {
                                                                                const input = e.target as HTMLInputElement;
                                                                                input.value = input.value.replace(/[^0-9]/g, '');
                                                                            }}
                                                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                                                const value = e.target.value
                                                                                updateCharacters(characters.map(item => item.index === Number(index) ?
                                                                                    { ...item, child: value } : item));
                                                                            }}
                                                                        />
                                                                    </div>

                                                                </div>
                                                                <div>
                                                                    <div className='mb-2'>
                                                                        <button onClick={() => { dropSection(Number(index)) }}
                                                                            className="btn btn-sm btn-light-danger fw-bolder">
                                                                            <KTIcon iconName="minus" className='fs-2' />
                                                                            Remove
                                                                        </button>
                                                                    </div>
                                                                    <div >
                                                                        <button onClick={() => { addRow(Number(index)) }}
                                                                            className="btn btn-sm btn-light-success fw-bolder">
                                                                            <KTIcon iconName="plus" className='fs-2' />
                                                                            Add Row
                                                                        </button>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                            <div>
                                                                {
                                                                    (() => {
                                                                        const rows = characters.find(item => item.index == index)?.rows
                                                                        return (
                                                                            <>
                                                                                {rows?.map((row, index3) => {
                                                                                    return (
                                                                                        <>
                                                                                            <div className='d-flex justify-content-center mt-3'>
                                                                                                <div
                                                                                                    onClick={() => { dropRow(Number(index), row.index) }}
                                                                                                    className='seat-scale-up btn  p-0 btn-light-danger 
                                                                                                     rounded  mx-1  d-flex justify-content-center align-items-center'
                                                                                                    style={{ width: '33px', height: '33px', textAlign: 'center' }}
                                                                                                >
                                                                                                    <KTIcon iconName="minus" className='fs-2  m-0 p-0' />
                                                                                                </div>
                                                                                                {
                                                                                                    row.seats.map((val: number, indexSeat: number) => {
                                                                                                        const disabledProps: React.CSSProperties = {
                                                                                                            pointerEvents: "none" as "none", // Ensure the value is of the correct type
                                                                                                            opacity: "0.5",
                                                                                                            width: "33px",
                                                                                                            height: "33px",
                                                                                                            backgroundColor: "rgb(234 26 26 / 25%)",
                                                                                                        };

                                                                                                        const enabledProps: React.CSSProperties = {
                                                                                                            cursor: 'pointer', // Ensure the value is of the correct type
                                                                                                            width: "33px",
                                                                                                            height: "33px",

                                                                                                        };

                                                                                                        let disabled = false

                                                                                                        if (row.name == "" || colNames[indexSeat].name == "") {
                                                                                                            disabled = true
                                                                                                        }

                                                                                                        return (
                                                                                                            <>
                                                                                                                {val == 0 ?

                                                                                                                    <div onClick={() => { toggleSeat(index, row.index, indexSeat) }}
                                                                                                                        className='seat-scale-up rounded border-1 border-dotted mx-1 border border-dark'
                                                                                                                        style={disabled ? disabledProps : enabledProps} >

                                                                                                                    </div>
                                                                                                                    :
                                                                                                                    <div onClick={() => { toggleSeat(index, row.index, indexSeat) }}
                                                                                                                        className='rounded  mx-1 d-flex justify-content-center align-items-center '
                                                                                                                        style={{
                                                                                                                            width: '33px', height: '33px',
                                                                                                                            backgroundColor: "#f7821e", cursor: 'pointer'
                                                                                                                        }} >
                                                                                                                        {row.name}{colNames[indexSeat].name}
                                                                                                                    </div>
                                                                                                                }
                                                                                                            </>
                                                                                                        )
                                                                                                    })
                                                                                                }

                                                                                                <input
                                                                                                    disabled={row.locked ? true : false}
                                                                                                    type='text'
                                                                                                    className='mx-1 rounded border-1 form-control form-control-sm form-control-solid'
                                                                                                    style={{
                                                                                                        width: '33px', height: '33px', padding: '0',
                                                                                                        borderStyle: 'solid', borderColor: 'rgb(50 13 149 / 10%)', textAlign: 'center'
                                                                                                    }}
                                                                                                    placeholder=''
                                                                                                    required
                                                                                                    step='1'
                                                                                                    value={row?.name ?? ""}
                                                                                                    onInput={(e: React.FormEvent<HTMLInputElement>) => {
                                                                                                        const input = e.target as HTMLInputElement;
                                                                                                        input.value = input.value.replace(/[^A-Za-z]/g, '');
                                                                                                    }}
                                                                                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                                                                        const inputValue = e.target.value.replace(/[^A-Za-z]/g, '');
                                                                                                        updateRowName(index, row.index, inputValue)
                                                                                                    }}
                                                                                                />
                                                                                            </div>
                                                                                        </>
                                                                                    )
                                                                                })}
                                                                            </>
                                                                        )
                                                                    })()
                                                                }

                                                            </div>
                                                        </li>
                                                    )}
                                                </Draggable>
                                            );
                                        })}
                                        {provided.placeholder}
                                    </ul>
                                )}
                            </Droppable>
                        </DragDropContext>
                        <div className='d-flex justify-content-center mt-10'>
                            <button
                                onClick={addSection}
                                className="btn btn-sm btn-light-primary fw-bolder">
                                <KTIcon iconName="plus" className='fs-2' />
                                Add Section
                            </button>
                        </div>
                    </>
                    : null}
            </div>

        </>

    );
}





























