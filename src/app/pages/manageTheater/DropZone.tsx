import React, { useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { useDrag } from 'react-dnd';
import {
    useState
} from 'react';
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { toAbsoluteUrl } from '../../../_metronic/helpers';
import { CustomMenuPop } from './CustomMenuPop';
import { ContextMenu } from './CustomMenuPop';


type Props = {
    onDrop?: any,
    name?: string,
    row?: number,
    col?: number

}

type DroppedItem = {
    id?: number;
    name: string;
}



export const TheaterWireFrame = () => {
    const [droppedItems, setDroppedItems] = useState<DroppedItem[]>([]);

    const handleDrop = (item: any) => {
        setDroppedItems((prevItems) => [...prevItems, item]);
    };

    const handleRemoveItem = (index: any) => {
        const updatedItems = [...droppedItems];
        updatedItems.splice(index, 1);
        setDroppedItems(updatedItems);
    };

    useEffect(() => {
        //    console.log(droppedItems)
    }, [droppedItems]);
    const gridSize = [15, 20]
    return (
        <>

            <div >
                <div className='d-flex my-3 justify-content-center align-items-center gap-3'>
                    <img style={{ objectFit: 'contain', width: '30%' }} src={toAbsoluteUrl('/media/images/3670.jpg')} alt="" />

                </div>


                <div className="mx-auto  d-flex justify-content-center ">
                    {Array.from({ length: gridSize[1] }, (_, index) => index + 1).map((col: number) => {
                        return (
                            <input
                                type='text'
                                className=' rounded border-1  m-1 form-control form-control-sm form-control-solid'
                                style={{ width: '33px', height: '33px', padding: '0', borderStyle: 'solid', borderColor: 'rgb(50 13 149 / 10%)', textAlign: 'center' }}
                                placeholder=''

                            />
                        )
                    })}
                    <div

                        className=' rounded border-1  m-1 form-control form-control-sm form-control-solid'
                        style={{ visibility: 'hidden', width: '33px', height: '33px', padding: '0', borderStyle: 'solid', borderColor: 'rgb(50 13 149 / 10%)', textAlign: 'center' }}


                    ></div>
                </div>
                {
                    Array.from({ length: gridSize[0] }, (_, index) => index + 1).map((row: number) => {
                        return (
                            <>

                                <div className="mx-auto  d-flex justify-content-center ">
                                    <DropZoneSection row={row} onDrop={handleDrop} />
                                </div>
                                <div className="mx-auto  d-flex justify-content-center ">

                                    {Array.from({ length: gridSize[1] }, (_, index) => index + 1).map((col: number) => {
                                        return (
                                            <DropZoneSeat row={row} col={col} onDrop={handleDrop} />
                                        )
                                    })}
                                    <input
                                        type='text'
                                        className=' rounded border-1  mx-1 my-0 form-control form-control-sm form-control-solid'
                                        style={{ width: '33px', height: '33px', padding: '0', borderStyle: 'solid', borderColor: 'rgb(50 13 149 / 10%)', textAlign: 'center' }}
                                        placeholder=''

                                    />
                                </div>
                            </>

                        );
                    })
                }




            </div>

        </>

    );
}



type DroppedItemType = {
    id: number;
    name: string;
    // Add any other properties that the dropped item should have
};

const DropZoneSeat: React.FC<Props> = ({ onDrop, row, col }) => {
    const [droppedItems, setDroppedItems] = useState<DroppedItem | null>(null);


    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'seat',
        drop: (item: DroppedItem) => { onDrop(item); setDroppedItems(item) },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }));

    const { handleRightClick, handleClickOutside, menuVisible, menuPosition } = CustomMenuPop()
    console.log(menuPosition)
    const menuOptions = [
        { label: 'Option 1', onClick: () => alert('Option 1 clicked') },
        { label: 'Option 2', onClick: () => alert('Option 2 clicked') },
    ];

    
        {/* <div onContextMenu={handleRightClick} onClick={handleClickOutside} className='rounded  mx-1 ' style={{ width: '33px', height: '33px', backgroundColor: "#f7821e" }} >
        {menuVisible && (
            <ContextMenu
                x={menuPosition.x}
                y={menuPosition.y}
                options={menuOptions}
                onClickOutside={handleClickOutside}
            />
        )}
        </div> */}


    return (
        droppedItems ?
            <div className='rounded  mx-1 ' style={{ width: '33px', height: '33px', backgroundColor: "#f7821e" }} >
              
            </div>


            :
            <div ref={drop} className='rounded border-1 border-dotted mx-1 border border-dark' style={{ width: '33px', height: '33px' }} ></div>

    );
};



const DropZoneSection: React.FC<Props> = ({ onDrop, row }) => {
    const [droppedItems, setDroppedItems] = useState<DroppedItem | null>(null);



    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'section',
        drop: (item: DroppedItem) => { onDrop(item); setDroppedItems(item) },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }));



    return (
        droppedItems ?
            <div className='p-4 my-3' style={{ width: '100%', maxWidth: '400px', }} >
                <input
                    type='text'
                    className='mb-2 form-control form-control-sm form-control-solid'
                    placeholder='Section name'

                />
                <div className='d-flex justify-content-center gap-2'>
                    <input
                        type='text'
                        className='form-control form-control-sm form-control-solid'
                        placeholder='Adult ticket price'

                    />
                    <input
                        type='text'
                        className='form-control form-control-sm form-control-solid'
                        placeholder='Child ticket price'

                    />
                </div>

            </div>

            :
            <div ref={drop} className=' ' style={{ width: '100%', height: '10px', margin: 'auto' }} ></div>

    );
};





type Data = {
    [key: string]: { class: string, style: any, name: string };
};



export const DragItem: React.FC<DroppedItem> = ({ name = "seat" }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: name,
        item: { name },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    const data: Data = {
        seat: {
            class: "rounded border-1  m-1 ", style: {
                backgroundColor: "#f7821e", width: '40px', height: '40px', opacity: isDragging ? 0.5 : 1,
                cursor: 'move'
            }, name: "Seat"
        },
        section: {
            class: "rounded border-1  m-1 ", style: {
                backgroundColor: "rgb(97 250 132)", width: '40px', height: '40px', opacity: isDragging ? 0.5 : 1,
                cursor: 'move'
            }, name: "Section"
        }
    }

    return (
        <>
            <div className='d-flex px-2 gap-3 align-items-center mt-3'>
                <div ref={drag}
                    className={data[name].class}
                    style={data[name].style} >

                </div>
                <span className='fw-bold  text-dark'>{data[name].name}</span>
            </div>
        </>

    );
};

