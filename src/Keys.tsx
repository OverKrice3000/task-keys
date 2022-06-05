import { IItem } from './index';
import { useCallback, useState } from 'react';

function Key(props: {
    id: number;
    name: string;
    edit: boolean;
    curCb: any;
    elemCb: any;
}) {
    let [elName, setELName] = useState(props.name);

    if (props.edit) {
        return (
            <input
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        props.elemCb(props.id, elName);
                        props.curCb(-1);
                    } else if (e.key === 'Escape') {
                        props.curCb(-1);
                    }
                }}
                value={elName}
                onChange={(e) => {
                    setELName(e.target.value);
                }}
            />
        );
    }
    return (
        <li
            onClick={(e) => {
                props.curCb(props.id);
            }}
        >
            {props.name}
        </li>
    );
}

export function Keys(props: { initialData: IItem[]; sorting: 'ASC' | 'DESC' }) {
    const [data, setData] = useState(props.initialData);
    const [curEdit, setCurEdit] = useState(-1);
    const changeCurEdit = useCallback((cur: number) => {
        setCurEdit(cur);
    }, []);
    const changeElement = useCallback((id: number, name: string) => {
        let index = data.findIndex((value) => {
            return id === value.id;
        });
        data[index].name = name;
    }, []);
    let sorted: IItem[] = data.sort();
    sorted = props.sorting === 'DESC' ? sorted.reverse() : sorted;
    return (
        <div>
            {sorted.map((item) => {
                return (
                    <Key
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        edit={curEdit === item.id}
                        curCb={changeCurEdit}
                        elemCb={changeElement}
                    />
                );
            })}
        </div>
    );
}
